import { spawn } from "node:child_process";
import { cp, mkdir, rm, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(new URL(".", import.meta.url)));
const projectRoot = path.resolve(root, "..");
const clientDir = path.join(projectRoot, "dist", "client");
const outDir = path.join(projectRoot, "dist");
const zipPath = path.join(projectRoot, "dist-cpanel.zip");

function wait(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForServer(url, attempts = 40) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // retry
    }
    await wait(250);
  }
  throw new Error(`Server did not become ready at ${url}`);
}

async function zipDirectory(sourceDir, destZip) {
  // Prefer system zip if available
  await new Promise((resolve, reject) => {
    const child = spawn("zip", ["-qr", destZip, "."], {
      cwd: sourceDir,
      stdio: "inherit",
    });
    child.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`zip failed: ${code}`))));
  });
}

async function main() {
  if (!(await readFile(path.join(clientDir, ".htaccess"), "utf8").catch(() => null))) {
    throw new Error("Missing dist/client — run `npm run build` first.");
  }

  const server = spawn("node", ["dist/server/index.mjs"], {
    cwd: projectRoot,
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, PORT: "3000", HOST: "127.0.0.1" },
  });

  let serverLog = "";
  server.stdout.on("data", (d) => {
    serverLog += d.toString();
  });
  server.stderr.on("data", (d) => {
    serverLog += d.toString();
  });

  try {
    await waitForServer("http://127.0.0.1:3000/");
    const res = await fetch("http://127.0.0.1:3000/");
    if (!res.ok) throw new Error(`Failed to fetch / : ${res.status}`);
    let html = await res.text();
    html = html.replace(/\u0000/g, "");

    const staging = path.join(projectRoot, ".cpanel-staging");
    await rm(staging, { recursive: true, force: true });
    await mkdir(staging, { recursive: true });
    await cp(clientDir, staging, { recursive: true });
    await writeFile(path.join(staging, "index.html"), html, "utf8");

    // Replace dist with flat cPanel package
    await rm(outDir, { recursive: true, force: true });
    await mkdir(outDir, { recursive: true });
    await cp(staging, outDir, { recursive: true });
    await rm(staging, { recursive: true, force: true });

    await rm(zipPath, { force: true });
    await zipDirectory(outDir, zipPath);

    console.log("cPanel package ready:");
    console.log(`  folder: ${outDir}`);
    console.log(`  zip:    ${zipPath}`);
    console.log("Upload the CONTENTS of dist/ into public_html (include .htaccess).");
  } finally {
    server.kill("SIGTERM");
    await wait(300);
    if (!server.killed) server.kill("SIGKILL");
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});

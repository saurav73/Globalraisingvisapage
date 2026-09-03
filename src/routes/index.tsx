import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect, type FormEvent } from "react";

import heroImg from "@/assets/hero.jpg";
import usaImg from "@/assets/usa.jpg";
import australiaImg from "@/assets/australia.jpg";
import japanImg from "@/assets/japan.jpg";
import vietnamImg from "@/assets/vietnam.jpg";
import thailandImg from "@/assets/thailand.jpg";
import koreaImg from "@/assets/korea.jpg";
import logoImg from "@/assets/logo.png";
import { useIsMobile } from "@/hooks/use-mobile";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";

const SITE_URL = "https://globalrisingtravel.com";

const FOOTER_BG =
  "https://globalrisingtravel.com/wp-content/uploads/2026/01/Group-6440-1.webp";
const PAYMENT_METHODS_IMG =
  "https://globalrisingtravel.com/wp-content/uploads/2025/12/601333422_4345400195689255_38243231256945846_n-e1766807437233.png";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.16 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.73a8.18 8.18 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1.01-.15z" />
    </svg>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Visa Guide | Global Rising Travel" },
      {
        name: "description",
        content:
          "Check visa requirements and start your application for the USA, Australia, Japan, Vietnam, Thailand and Korea with Global Rising Travel.",
      },
      { property: "og:title", content: "Visa Guide | Global Rising Travel" },
      {
        property: "og:description",
        content:
          "Country-by-country visa requirements and a fast application form handled by our travel team.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: VisaGuideApp,
});

type Destination = {
  name: string;
  code: string;
  image?: string;
  blurb: string;
};

const DESTINATIONS: Destination[] = [
  { name: "USA", code: "us", image: usaImg, blurb: "B1/B2 visitor visa · Interview required" },
  { name: "Australia", code: "au", image: australiaImg, blurb: "eVisitor & Subclass 600" },
  { name: "Japan", code: "jp", image: japanImg, blurb: "Short-stay tourist visa" },
  { name: "Vietnam", code: "vn", image: vietnamImg, blurb: "E-visa up to 90 days" },
  { name: "Thailand", code: "th", image: thailandImg, blurb: "Tourist visa & visa exemption" },
  { name: "Korea", code: "kr", image: koreaImg, blurb: "K-ETA & C-3 tourist visa" },
  { name: "United Kingdom", code: "gb", blurb: "Standard visitor visa · 6 months" },
  { name: "Canada", code: "ca", blurb: "Visitor visa & eTA" },
  { name: "Schengen (France)", code: "fr", blurb: "Schengen Type C · 90 days" },
  { name: "Germany", code: "de", blurb: "Schengen Type C tourist visa" },
  { name: "Italy", code: "it", blurb: "Schengen Type C tourist visa" },
  { name: "Spain", code: "es", blurb: "Schengen Type C tourist visa" },
  { name: "Netherlands", code: "nl", blurb: "Schengen Type C tourist visa" },
  { name: "Switzerland", code: "ch", blurb: "Schengen Type C tourist visa" },
  { name: "New Zealand", code: "nz", blurb: "Visitor visa & NZeTA" },
  { name: "Singapore", code: "sg", blurb: "SG Arrival Card & entry visa" },
  { name: "Malaysia", code: "my", blurb: "eVisa & eNTRI" },
  { name: "China", code: "cn", blurb: "L tourist visa" },
  { name: "Hong Kong", code: "hk", blurb: "Pre-arrival registration" },
  { name: "UAE (Dubai)", code: "ae", blurb: "Tourist visa 30 / 60 days" },
  { name: "Qatar", code: "qa", blurb: "Hayya & tourist visa" },
  { name: "Saudi Arabia", code: "sa", blurb: "eVisa & Umrah visa" },
  { name: "Turkey", code: "tr", blurb: "e-Visa · 30 days" },
  { name: "India", code: "in", blurb: "e-Tourist visa" },
  { name: "Sri Lanka", code: "lk", blurb: "ETA · 30 days" },
  { name: "Indonesia (Bali)", code: "id", blurb: "e-VOA · 30 days" },
  { name: "Philippines", code: "ph", blurb: "9(a) tourist visa" },
  { name: "Cambodia", code: "kh", blurb: "e-Visa · 30 days" },
  { name: "Egypt", code: "eg", blurb: "e-Visa · 30 days" },
  { name: "South Africa", code: "za", blurb: "Visitor visa · 90 days" },
  { name: "Brazil", code: "br", blurb: "e-Visa for tourism" },
  { name: "Russia", code: "ru", blurb: "Unified e-Visa · 16 days" },
];

const DESKTOP_PAGE_SIZE = 15;
const MOBILE_PAGE_SIZE = 10;

const PURPOSES = ["Tourism", "Business", "Study", "Family Visit", "Other"];

const inputClass =
  "w-full rounded-md border border-navy/20 bg-white px-3 py-2.5 text-navy outline-none transition focus-visible:border-travel-blue focus-visible:ring-2 focus-visible:ring-travel-blue/40";
const labelClass = "mb-1.5 block text-sm font-semibold text-navy";

function Navbar({ onBack }: { onBack?: (() => void) | undefined }) {
  return (
    <header className="sticky top-0 z-50 border-b border-navy/10 bg-white text-navy shadow-sm">
      <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3.5 sm:px-6 sm:py-4">
        <a
          href={SITE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex min-w-0 items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-travel-blue"
          aria-label="Global Rising Tours & Travel — visit website"
        >
          <img
            src={logoImg}
            alt="Global Rising Tours & Travel"
            width={300}
            height={114}
            className="h-[48px] w-auto max-w-[140px] object-contain object-left sm:h-[58px] sm:max-w-[170px]"
          />
        </a>
        <nav className="flex items-center gap-4 sm:gap-6">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="rounded-md text-sm font-medium text-navy/80 underline-offset-4 transition hover:text-adventure hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-adventure"
            >
              ← All destinations
            </button>
          )}
          <span className="border-b-2 border-adventure pb-0.5 text-sm font-bold uppercase tracking-wide text-navy sm:text-base">
            Visa Guide
          </span>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  const socialClass =
    "inline-flex h-[38px] w-[38px] items-center justify-center rounded-full bg-white/20 text-white transition hover:-translate-y-0.5 hover:bg-white hover:text-[#0d6efd]";

  return (
    <footer className="relative overflow-hidden bg-[#063a8f] text-[15px] text-white">
      <img
        src={FOOTER_BG}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/55" aria-hidden="true" />

      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:pb-8">
        <div className="grid grid-cols-1 gap-9 text-center sm:grid-cols-2 sm:text-left lg:grid-cols-4">
          <div>
            <h4 className="mb-4 text-lg font-semibold text-white after:mt-2 after:mx-auto after:block after:h-0.5 after:w-10 after:bg-white/70 sm:after:mx-0">
              About Us
            </h4>
            <p className="leading-relaxed text-white/90">
              Global Rising Travel provides curated travel experiences, expert guides, and
              unforgettable journeys worldwide.
            </p>
            <div className="mt-[18px] flex justify-center gap-2.5 sm:justify-start">
              <a
                href="https://www.facebook.com/globalrising.travel/"
                target="_blank"
                rel="noopener noreferrer"
                className={socialClass}
                aria-label="Facebook"
              >
                <Facebook className="h-4 w-4" />
              </a>
              <a
                href="https://www.instagram.com/global_rising_travel"
                target="_blank"
                rel="noopener noreferrer"
                className={socialClass}
                aria-label="Instagram"
              >
                <Instagram className="h-4 w-4" />
              </a>
              <a
                href="https://www.tiktok.com/@global_rising_travel"
                target="_blank"
                rel="noopener noreferrer"
                className={socialClass}
                aria-label="TikTok"
              >
                <TikTokIcon className="h-4 w-4" />
              </a>
              <a
                href="http://www.youtube.com/@globalrising_travels_nepal"
                target="_blank"
                rel="noopener noreferrer"
                className={socialClass}
                aria-label="YouTube"
              >
                <Youtube className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold text-white after:mt-2 after:mx-auto after:block after:h-0.5 after:w-10 after:bg-white/70 sm:after:mx-0">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {[
                { label: "Home", href: SITE_URL },
                { label: "Tours", href: `${SITE_URL}/tour-packages` },
                { label: "About", href: `${SITE_URL}/about` },
                { label: "Contact", href: `${SITE_URL}/contact` },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white transition hover:underline"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold text-white after:mt-2 after:mx-auto after:block after:h-0.5 after:w-10 after:bg-white/70 sm:after:mx-0">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start justify-center gap-3 sm:justify-start">
                <Mail className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <a href="mailto:info@globalrisingtravel.com" className="hover:underline">
                  info@globalrisingtravel.com
                </a>
              </li>
              <li className="flex items-start justify-center gap-3 sm:justify-start">
                <Phone className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                  <a href="tel:+97714581261" className="hover:underline">
                    01-4581261
                  </a>
                  {" / "}
                  <a href="tel:+97714581262" className="hover:underline">
                    01-4581262
                  </a>
                </span>
              </li>
              <li className="flex items-start justify-center gap-3 sm:justify-start">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                <span>Boudha-6, Tushalchowk Kathmandu, Nepal</span>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold text-white after:mt-2 after:mx-auto after:block after:h-0.5 after:w-10 after:bg-white/70 sm:after:mx-0">
              We Accept
            </h4>
            <img
              src={PAYMENT_METHODS_IMG}
              alt="Payment Methods"
              loading="lazy"
              className="mx-auto mt-2.5 max-w-full rounded-md bg-white p-1.5 sm:mx-0"
            />
          </div>
        </div>

        <p className="mt-10 border-t border-white/25 pt-[18px] text-center text-sm text-white/90">
          © {new Date().getFullYear()} Global Rising Travel. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

function Landing({ onSelect }: { onSelect: (d: Destination) => void }) {
  const [page, setPage] = useState(1);
  const isMobile = useIsMobile();
  const pageSize = isMobile ? MOBILE_PAGE_SIZE : DESKTOP_PAGE_SIZE;
  const totalPages = Math.ceil(DESTINATIONS.length / pageSize);
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const pageItems = DESTINATIONS.slice(start, start + pageSize);

  useEffect(() => {
    setPage(1);
  }, [pageSize]);

  function goTo(next: number) {
    setPage(next);
    document.getElementById("destinations")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <>
      <section className="relative isolate overflow-hidden bg-navy">
        <img
          src={heroImg}
          alt="Aircraft wing above the clouds over a tropical coastline"
          width={1600}
          height={900}
          className="absolute inset-0 h-full w-full object-cover opacity-35"
        />
        <div className="relative mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28">
          <span className="inline-block rounded-full bg-adventure px-3 py-1 text-xs font-bold uppercase tracking-wider text-navy">
            Visa Guide
          </span>
          <h1 className="mt-5 max-w-3xl text-3xl font-black leading-tight text-white sm:text-5xl">
            Know exactly what your visa needs — before you book.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-white/85 sm:text-lg">
            Pick your destination to see the documents, processing times and requirements our
            visa team handles for you, then send us your application in under two minutes.
          </p>
        </div>
      </section>

      <section id="destinations" className="scroll-mt-20 bg-surface py-14 sm:py-20">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-2xl font-black text-navy sm:text-3xl">All destinations</h2>
          <p className="mt-2 text-travel-blue">
            Choose a country to check its visa requirements — {DESTINATIONS.length} destinations
            covered.
          </p>

          <ul className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {pageItems.map((d) => (
              <li key={d.code}>
                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => onSelect(d)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onSelect(d);
                    }
                  }}
                  aria-label={`Check visa requirements for ${d.name}`}
                  className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-navy/10 transition hover:-translate-y-1 hover:shadow-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-travel-blue"
                >
                  <div className="relative">
                    {d.image ? (
                      <img
                        src={d.image}
                        alt={`Travel scenery in ${d.name}`}
                        loading="lazy"
                        width={800}
                        height={600}
                        className="h-52 w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="grid h-52 w-full place-items-center overflow-hidden bg-navy">
                        <img
                          src={`https://flagcdn.com/w640/${d.code}.png`}
                          alt={`Flag of ${d.name}`}
                          loading="lazy"
                          width={640}
                          height={480}
                          className="h-full w-full object-cover opacity-70 transition duration-500 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <img
                      src={`https://flagcdn.com/w80/${d.code}.png`}
                      alt=""
                      aria-hidden="true"
                      loading="lazy"
                      width={48}
                      height={48}
                      className="absolute -bottom-6 left-5 h-12 w-12 rounded-full border-4 border-white object-cover shadow-md"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5 pt-9">
                    <h3 className="text-xl font-black text-navy">{d.name}</h3>
                    <p className="mt-1 text-sm text-travel-blue">{d.blurb}</p>
                    <span className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-adventure px-4 py-2.5 text-sm font-bold text-white transition group-hover:brightness-95">
                      Check Visa Requirements
                    </span>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          <nav
            aria-label="Destination pages"
            className="mt-10 flex flex-wrap items-center justify-center gap-2"
          >
            <button
              type="button"
              onClick={() => goTo(page - 1)}
              disabled={page === 1}
              className="rounded-md border border-navy/20 bg-white px-4 py-2 text-sm font-bold text-navy transition hover:border-travel-blue hover:text-travel-blue disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-travel-blue"
            >
              ← Prev
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => goTo(n)}
                aria-current={n === page ? "page" : undefined}
                aria-label={`Page ${n}`}
                className={
                  n === page
                    ? "h-10 w-10 rounded-md bg-adventure text-sm font-black text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
                    : "h-10 w-10 rounded-md border border-navy/20 bg-white text-sm font-bold text-navy transition hover:border-travel-blue hover:text-travel-blue focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-travel-blue"
                }
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              onClick={() => goTo(page + 1)}
              disabled={page === totalPages}
              className="rounded-md border border-navy/20 bg-white px-4 py-2 text-sm font-bold text-navy transition hover:border-travel-blue hover:text-travel-blue disabled:cursor-not-allowed disabled:opacity-40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-travel-blue"
            >
              Next →
            </button>
          </nav>
        </div>
      </section>
    </>
  );
}

function VisaForm({ country, onBack }: { country: string; onBack: () => void }) {
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (submitted) {
    return (
      <section className="bg-surface py-16 sm:py-24">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <div className="rounded-xl bg-white p-8 text-center shadow-sm ring-1 ring-navy/10">
            <span className="grid mx-auto h-14 w-14 place-items-center rounded-full bg-adventure text-2xl font-black text-white">
              ✓
            </span>
            <h1 className="mt-5 text-2xl font-black text-navy sm:text-3xl">
              Thank you{name ? `, ${name.split(" ")[0]}` : ""}!
            </h1>
            <p className="mt-3 text-travel-blue">
              Your {country} visa application request has been received. A member of our visa team
              will follow up shortly about your {country} trip.
            </p>
            <button
              type="button"
              onClick={onBack}
              className="mt-7 inline-flex items-center justify-center rounded-md bg-adventure px-5 py-2.5 font-bold text-white transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
            >
              Explore more destinations
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-surface py-12 sm:py-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <h1 className="text-2xl font-black text-navy sm:text-3xl">{country} Visa Application</h1>
        <p className="mt-2 text-travel-blue">
          Fill in the details below and our team will confirm your requirements by phone or email.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-5 rounded-xl bg-white p-6 shadow-sm ring-1 ring-navy/10 sm:p-8"
        >
          <div>
            <label className={labelClass} htmlFor="fullName">
              Full Name <span className="text-adventure">*</span>
            </label>
            <input
              id="fullName"
              name="fullName"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
              autoComplete="name"
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass} htmlFor="phone">
              Phone Number <span className="text-adventure">*</span>
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              required
              maxLength={30}
              autoComplete="tel"
              className={inputClass}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="purpose">
                Purpose of Visit <span className="text-adventure">*</span>
              </label>
              <select id="purpose" name="purpose" required defaultValue="" className={inputClass}>
                <option value="" disabled>
                  Select a purpose
                </option>
                {PURPOSES.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass} htmlFor="groupSize">
                Group Size <span className="text-adventure">*</span>
              </label>
              <input
                id="groupSize"
                name="groupSize"
                type="number"
                min={1}
                max={50}
                required
                defaultValue={1}
                className={inputClass}
              />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass} htmlFor="email">
                Email <span className="font-normal text-travel-blue">(optional)</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                maxLength={255}
                autoComplete="email"
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor="travelDate">
                Preferred Travel Date{" "}
                <span className="font-normal text-travel-blue">(optional)</span>
              </label>
              <input id="travelDate" name="travelDate" type="date" className={inputClass} />
            </div>
          </div>

          <div>
            <label className={labelClass} htmlFor="notes">
              Additional Notes <span className="font-normal text-travel-blue">(optional)</span>
            </label>
            <textarea id="notes" name="notes" rows={4} maxLength={1000} className={inputClass} />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-adventure px-5 py-3 text-base font-bold text-white transition hover:brightness-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-navy"
          >
            Submit Application
          </button>
        </form>
      </div>
    </section>
  );
}

function VisaGuideApp() {
  const [selected, setSelected] = useState<Destination | null>(null);

  return (
    <div className="min-h-screen bg-surface">
      <Navbar onBack={selected ? () => setSelected(null) : undefined} />
      <main>
        {selected ? (
          <VisaForm country={selected.name} onBack={() => setSelected(null)} />
        ) : (
          <Landing onSelect={setSelected} />
        )}
      </main>
      <Footer />
    </div>
  );
}

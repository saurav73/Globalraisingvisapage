# Global Visa Hub

Build a React landing page for a travel agency's Visa Guide section, themed after globalrisingtravel.com.

BRAND / THEME

- Match the overall look, navbar style, and logo placement of https://globalrisingtravel.com/ (clean travel-agency aesthetic, logo left, nav links right, bold trust-driven headings).

- Color system (use exactly, no other accent colors):

  - Primary #123B5D (Deep Travel Navy): header/nav background, major headings, footer, dark info sections, important icons, trust elements.

  - Secondary #1F6F9F (Travel Blue): links, secondary buttons, active nav state, icons, filters, hover states, supporting UI.

  - Accent/CTA #F28C28 (Adventure Orange): used sparingly — CTA buttons ("Book Now" / "Explore Now" / "Get a Quote" style), price highlights, small badges, offer tags.

- Neutral white/light-gray backgrounds for content sections so navy and orange stay high-contrast.

PAGE 1 — LANDING PAGE

- Sticky navbar: logo on the left, single nav item "Visa Guide" in bold on the right, navy background, white text.

- Hero section introducing the visa guide (short headline + subtext).

- Below the hero, a responsive photo grid of destination cards (3 columns desktop / 2 tablet / 1 mobile): USA, Australia, Japan, Vietnam, Thailand, Korea.

- Each card:

  - Real destination photo filling the top of the card.

  - Small circular flag badge overlapping the top corner of the photo.

  - Country name below the photo.

  - A CTA button on the card labeled "Check Visa Requirements" (accent orange background, white text).

- Clicking anywhere on the card (image, name, or CTA button) navigates to the visa application form for that specific country.

PAGE 2 — VISA APPLICATION FORM

- Same navbar as landing page, with a "← All destinations" back link.

- Page title dynamically shows the selected country, e.g. "{Country} Visa Application".

- Mandatory fields: Full Name, Phone Number, Purpose of Visit (dropdown: Tourism, Business, Study, Family Visit, Other), Group Size.

- Optional fields: Email, Preferred Travel Date, Additional Notes.

- Submit button in accent orange, label "Submit Application".

- On submit, show a confirmation state thanking the user and confirming a team member will follow up about their {Country} trip.

TECH

- Build as a single React component (functional, hooks, no router needed) that switches between the landing view and the form view using local state, with the selected country passed into the form.

- Fully responsive, accessible form labels, visible focus states.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://wanderlust-visa-link.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/8fa2c6c4-b9b4-4f30-adc7-98ab75d678fa).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```

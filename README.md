# Two Buck Lawn Care — Next.js site

A responsive Next.js, React, and TypeScript conversion of the supplied vanilla site. It is configured for straightforward Vercel deployment.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Production validation

```bash
npm run check
npm run build
```

## Deploying to Vercel

Import this directory as a new Vercel project. Vercel will recognize Next.js automatically; the default build and output settings are correct.

## Photography

The TBLC project photography is organized in `public/images/tblc` and is used across the hero, portfolio, about, call-to-action, and social preview.

## Items to connect before launch

- The estimate form currently validates and displays a success state, matching the source site, but does not send data to a service yet.
- Footer social, privacy, and terms destinations remain placeholders from the source and should be updated when the final URLs are known.

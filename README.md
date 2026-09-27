# Haarika Portfolio

A responsive personal portfolio for Haarika, an AI & ML Engineering Student. It uses plain HTML, CSS, and JavaScript so the project stays easy to understand and maintain.

## Run locally

Open `index.html` in a browser, or serve the folder with a simple local server such as VS Code Live Server. No build step or dependency installation is required.

## Structure

- `index.html` - semantic page structure and content regions
- `style.css` - responsive visual design, light/dark themes, and animations
- `script.js` - data rendering and browser interactions
- `data/portfolio-data.js` - the editable content source
- `assets/profile.svg` - neutral local profile placeholder; replace the image source with Haarika's profile image when available
- `assets/certificates/` - place certificate images here
- `assets/achievements/` - place achievement images here

## Editing content

Open `data/portfolio-data.js` to change personal information, skills, education, and social links. Add a project by copying the project object in `projects`. Add certificates and achievements by copying the commented examples in their arrays. The page automatically creates the cards from those arrays.

The current `assets/profile.svg` is a neutral monogram placeholder, not a real person's photograph. Replace its source in `index.html` with Haarika's own profile image when available. The `Preview a photo` control can temporarily show a local image in your browser; it does not upload or save the file. Permanent deployed uploads require a backend or storage service.

## Included interactions

JavaScript powers the typing animation, scroll reveal, active navigation, mobile menu, project filtering, project details modal, theme toggle, localStorage theme preference, back-to-top control, and contact form validation.

The contact form is intentionally honest: it validates locally but does not send email. Real delivery needs a backend or a service such as Formspree, Netlify Forms, or a custom API.

## Future Version 2

A private admin dashboard should use real authentication, server-side authorization, a database, and secure image storage. The public Version 1 intentionally has no fake login or exposed editing controls. The data-driven structure provides a clear starting point for a future API-backed admin system.

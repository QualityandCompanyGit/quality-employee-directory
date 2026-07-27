:root {
  --page-bg: #f3f3f1;
  --card-bg: #ffffff;
  --soft-bg: #f8f8f6;

  --text: #171717;
  --muted: #666660;
  --light-text: #898983;

  --border: #deded9;
  --border-light: #e9e9e5;

  --max-width: 980px;
  --photo-width: 300px;

  --radius-large: 22px;
  --radius-medium: 16px;
  --radius-small: 11px;

  --shadow:
    0 22px 58px rgba(0, 0, 0, 0.08);
}

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  min-width: 320px;
  min-height: 100%;
  background: var(--page-bg);
  -webkit-text-size-adjust: 100%;
}

body {
  min-width: 320px;
  min-height: 100vh;
  margin: 0;

  color: var(--text);
  background: var(--page-bg);

  font-family:
    "Inter",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Arial,
    sans-serif;

  font-size: 16px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  text-rendering: optimizeLegibility;
}

img {
  display: block;
  max-width: 100%;
}

a {
  color: inherit;
}

[hidden] {
  display: none !important;
}

.shell {
  width: min(calc(100% - 32px), var(--max-width));
  margin-inline: auto;
}

/* Header */

.profile-header {
  display: flex;
  align-items: center;
  justify-content: center;

  min-height: 106px;
  padding: 24px 0;
}

.profile-header a {
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.logo {
  width: min(100%, 350px);
  max-height: 56px;
  object-fit: contain;
}

/* Loading and error */

.message-card {
  margin: 40px auto;
  padding: 38px 30px;

  color: var(--muted);
  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: 18px;

  box-shadow:
    0 18px 45px rgba(0, 0, 0, 0.07);

  text-align: center;
}

.message-card h1 {
  margin: 0 0 8px;

  color: var(--text);
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.message-card p {
  margin: 0;
}

/* Profile card */

.profile {
  display: grid;
  grid-template-columns: var(--photo-width) minmax(0, 1fr);
  gap: 40px;

  margin: 10px 0 54px;
  padding: 22px;

  background: var(--card-bg);
  border: 1px solid var(--border);
  border-radius: var(--radius-large);

  box-shadow: var(--shadow);
}

/*
The photo width remains fixed on desktop.
Its height can grow with the employee information.
*/

.photo-wrap {
  width: var(--photo-width);
  min-height: 430px;
  overflow: hidden;

  background: #ececea;
  border-radius: var(--radius-medium);
}

#photo {
  width: 100%;
  height: 100%;
  min-height: 430px;

  object-fit: cover;
  object-position: center top;

  background: #ececea;
}

/* Employee details */

.details {
  min-width: 0;
  align-self: center;
  padding: 24px 12px 24px 0;
}

.badge {
  display: inline-flex;
  align-items: center;

  margin-bottom: 14px;
  padding: 6px 11px;

  color: #555550;
  background: var(--soft-bg);
  border: 1px solid var(--border);
  border-radius: 999px;

  font-size: 0.68rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1;
  text-transform: uppercase;
}

.badge:empty {
  display: none;
}

#name {
  max-width: 100%;
  margin: 0;

  color: var(--text);

  font-family:
    "Inter",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    sans-serif;

  font-size: clamp(2rem, 4vw, 3.35rem);
  font-weight: 700;
  letter-spacing: -0.055em;
  line-height: 1.03;

  white-space: nowrap;
}

.job {
  margin: 14px 0 3px;

  color: var(--muted);

  font-size: 1.08rem;
  font-weight: 600;
  line-height: 1.4;
}

.job:empty {
  display: none;
}

.department {
  margin: 0;

  color: var(--light-text);

  font-size: 0.73rem;
  font-weight: 700;
  letter-spacing: 0.1em;
  line-height: 1.4;
  text-transform: uppercase;
}

.department:empty {
  display: none;
}

/* Contact information */

.contact-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 11px;

  margin: 28px 0 0;
}

.contact-item {
  min-width: 0;
  padding: 14px 15px;

  background: var(--soft-bg);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-small);
}

.contact-item dt {
  margin: 0 0 5px;

  color: var(--light-text);

  font-size: 0.66rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  line-height: 1.3;
  text-transform: uppercase;
}

.contact-item dd {
  min-width: 0;
  margin: 0;

  color: var(--text);

  font-size: 0.93rem;
  font-weight: 500;
  line-height: 1.45;

  overflow-wrap: anywhere;
}

.contact-item a {
  text-decoration-color: #b7b7b2;
  text-underline-offset: 3px;
}

.contact-item a:hover {
  text-decoration-color: var(--text);
}

/* Buttons */

.profile-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 11px;

  margin-top: 25px;
}

.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;

  min-width: 128px;
  min-height: 44px;
  padding: 11px 20px;

  border: 1px solid transparent;
  border-radius: 999px;

  font-family: inherit;
  font-size: 0.87rem;
  font-weight: 600;
  line-height: 1;
  text-decoration: none;

  transition:
    background-color 150ms ease,
    border-color 150ms ease,
    transform 150ms ease;
}

.button:hover {
  transform: translateY(-1px);
}

.button:focus-visible {
  outline: 3px solid rgba(17, 17, 17, 0.2);
  outline-offset: 3px;
}

.button-primary {
  color: #ffffff;
  background: #111111;
}

.button-primary:hover {
  background: #333333;
}

.button-secondary {
  color: #111111;
  background: #ffffff;
  border-color: var(--border);
}

.button-secondary:hover {
  background: var(--soft-bg);
  border-color: #c6c6c0;
}

/* Footer */

.footer {
  padding: 25px 0 30px;

  background: #ffffff;
  border-top: 1px solid var(--border);
}

.footer-content {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;

  color: #7c7c76;

  font-size: 0.78rem;
  font-weight: 400;
  text-align: center;
}

.footer-content p {
  margin: 0;
}

.footer-content a {
  color: #555550;
  font-weight: 500;
  text-decoration: none;
}

.footer-content a:hover {
  text-decoration: underline;
  text-underline-offset: 3px;
}

/* Smaller desktop */

@media (max-width: 900px) {
  :root {
    --photo-width: 270px;
  }

  .profile {
    gap: 30px;
  }

  #name {
    font-size: clamp(1.85rem, 4.5vw, 2.8rem);
  }
}

/* Tablet and mobile */

@media (max-width: 760px) {
  .profile {
    grid-template-columns: 1fr;
    gap: 26px;
    padding: 16px;
  }

  .photo-wrap {
    width: min(100%, 380px);
    min-height: 0;
    aspect-ratio: 4 / 5;
    margin-inline: auto;
  }

  #photo {
    min-height: 0;
  }

  .details {
    padding: 3px 10px 20px;
    text-align: center;
  }

  #name {
    white-space: normal;
    font-size: clamp(2rem, 10vw, 3rem);
    letter-spacing: -0.045em;
  }

  .contact-grid {
    grid-template-columns: 1fr;
    text-align: left;
  }

  .profile-actions {
    justify-content: center;
  }

  .footer-content {
    flex-direction: column;
    gap: 5px;
  }
}

/* Small phones */

@media (max-width: 420px) {
  .shell {
    width: min(calc(100% - 20px), var(--max-width));
  }

  .profile-header {
    min-height: 88px;
    padding: 19px 0;
  }

  .logo {
    width: min(100%, 290px);
    max-height: 47px;
  }

  .profile {
    padding: 11px;
    border-radius: 17px;
  }

  .photo-wrap {
    border-radius: 13px;
  }

  .details {
    padding-inline: 7px;
  }

  .profile-actions {
    display: grid;
    grid-template-columns: 1fr;
  }

  .button {
    width: 100%;
    min-height: 47px;
  }
}

/* Accessibility */

@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    scroll-behavior: auto !important;
    transition: none !important;
  }
}

/* Printing */

@media print {
  body {
    background: #ffffff;
  }

  .profile-header,
  .footer,
  .profile-actions {
    display: none;
  }

  .shell {
    width: 100%;
  }

  .profile {
    margin: 0;
    border: 0;
    box-shadow: none;
  }
}

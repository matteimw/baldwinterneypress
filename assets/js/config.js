/* ============================================================
   Site-wide settings. Edit these — every page pulls from here.
   ============================================================ */
const SITE_CONFIG = {
  siteName: "Baldwin Terney Press",
  contactEmail: "support@baldwinterneypress.com",
  address: "2733 North Power Road, Suite 102 #231, Mesa, Arizona 85215, United States",
  facebookUrl: "https://www.facebook.com/baldwin.terneypress",
  instagramUrl: "https://www.instagram.com/baldwinterneypress/",
  cyberElementaryUrl: "https://www.cyberelementary.com",
  // amzn.to links below already carry their own affiliate tracking and are
  // used exactly as pasted — see README.md if you ever need to add a plain
  // amazon.com link and want the default Associates tag appended instead.

  // ---- MailerLite email signup ----
  // Account ID is fixed (your MailerLite account).
  // mailerLiteFormId: after verifying your MailerLite email and creating an
  // embedded form in the MailerLite dashboard, paste the form ID here.
  // The form ID looks like "abc123XY" and appears in the embed snippet
  // MailerLite gives you (the data-form="..." value).
  // Leave mailerLiteFormId as "" to show a "Contact us" fallback instead.
  mailerLiteAccountId: "2635532",
  mailerLiteFormId: "",        // ← paste form ID here after creating form in MailerLite
};

const NAV_LINKS = [
  { href: "index.html", label: "Home" },
  { href: "books.html", label: "Children's Books" },
  { href: "cyber-elementary.html", label: "Cyber Elementary" },
  { href: "managed-security-buyers.html", label: "Managed Security Buyers Guide" },
  { href: "trendy-topical.html", label: "Trendy Topical" },
  { href: "about.html", label: "About" },
  { href: "contact.html", label: "Contact" },
];

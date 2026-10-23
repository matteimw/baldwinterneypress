/* ============================================================
   Renders the shared header + footer on every page, and wires up
   the mobile nav toggle. Each page just needs an empty
   <header id="site-header"></header> and <footer id="site-footer"></footer>.
   ============================================================ */

function currentPage() {
  const path = window.location.pathname.split("/").pop();
  return path === "" ? "index.html" : path;
}

function renderHeader() {
  const mount = document.getElementById("site-header");
  if (!mount) return;
  const active = currentPage();
  const links = NAV_LINKS.map(
    (l) => `<a href="${l.href}"${l.href === active ? ' class="active"' : ""}>${l.label}</a>`
  ).join("");

  mount.innerHTML = `
    <div class="header-inner">
      <a href="index.html" class="brand">
        <span class="brand-mark" aria-hidden="true"></span>
        <span>
          Baldwin Terney Press
          <small>Family-owned publisher since 1998</small>
        </span>
      </a>
      <nav class="main-nav" id="main-nav">${links}</nav>
      <div class="header-actions">
        <button type="button" class="share-btn" data-share-open aria-haspopup="dialog" aria-label="Share this site">📤<span class="share-label"> Share</span></button>
        <button class="nav-toggle" id="nav-toggle" aria-label="Toggle menu">☰</button>
      </div>
    </div>
  `;

  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("main-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
  }
}

function renderFooter() {
  const mount = document.getElementById("site-footer");
  if (!mount) return;
  const year = new Date().getFullYear();
  mount.innerHTML = `
    <div class="footer-inner">
      <div>
        <div class="brand" style="margin-bottom:6px;">
          <span class="brand-mark" aria-hidden="true"></span>
          <span>Baldwin Terney Press</span>
        </div>
        <p class="footer-note">A small, family-owned book publishing company.</p>
        <div class="footer-social">
          <a href="${SITE_CONFIG.facebookUrl}" target="_blank" rel="noopener">Facebook</a>
          <a href="${SITE_CONFIG.instagramUrl}" target="_blank" rel="noopener">Instagram</a>
        </div>
        <button type="button" class="share-btn footer-share" data-share-open aria-haspopup="dialog">📤 Share this site</button>
      </div>
      <div class="footer-links">
        <a href="index.html">Home</a>
        <a href="books.html">Children's Books</a>
        <a href="cyber-elementary.html">Cyber Elementary</a>
        <a href="managed-security-buyers.html">MSS Buyers Guide</a>
        <a href="trendy-topical.html">Trendy Topical</a>
        <a href="about.html">About</a>
        <a href="contact.html">Contact</a>
        <a href="mailto:${SITE_CONFIG.contactEmail}">${SITE_CONFIG.contactEmail}</a>
      </div>
    </div>
    <div class="footer-bottom wrap">
      &copy; ${year} Baldwin Terney Press LLC. All rights reserved. As an Amazon Associate, Baldwin Terney Press earns from qualifying purchases.
      &nbsp;·&nbsp;<a href="privacy-policy.html">Privacy Policy</a>&nbsp;·&nbsp;<a href="terms-and-conditions.html">Terms and Conditions</a>
    </div>
  `;
}

/* ---- MailerLite email signup ----
   Injects the MailerLite Universal script once per page load, then renders
   a signup section immediately above the footer. The form itself is hosted
   by MailerLite — nothing to keep in sync on this site.

   To activate: verify your MailerLite email, create an embedded form in the
   MailerLite dashboard, then paste its form ID into mailerLiteFormId in
   config.js. Until then, visitors see a "contact us" fallback link. */
function initMailerLite() {
  if (!SITE_CONFIG.mailerLiteAccountId) return;
  /* Standard MailerLite Universal snippet — queues calls before the async
     script finishes loading, so ml('account',…) fires correctly either way. */
  (function (w, d, e, u, f, l, n) {
    w[f] = w[f] || function () { (w[f].q = w[f].q || []).push(arguments); };
    l = d.createElement(e); l.async = 1; l.src = u;
    n = d.getElementsByTagName(e)[0]; n.parentNode.insertBefore(l, n);
  })(window, document, 'script',
     'https://assets.mailerlite.com/js/universal.js', 'ml');
  window.ml('account', SITE_CONFIG.mailerLiteAccountId);
}

function renderSignupSection() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;

  const formHtml = SITE_CONFIG.mailerLiteFormId
    ? `<div class="ml-embedded" data-form="${SITE_CONFIG.mailerLiteFormId}"></div>`
    : `<div class="signup-fallback">
         <p>Want to hear about new releases first?</p>
         <a class="btn btn-primary" href="contact.html">✉️ Get in touch to join the list</a>
       </div>`;

  const section = document.createElement('section');
  section.className = 'signup-section';
  section.id = 'signup';
  section.innerHTML = `
    <div class="signup-inner">
      <div class="signup-text">
        <div class="eyebrow">Stay in the loop</div>
        <h2>New books &amp; issues, straight to your inbox</h2>
        <p>Be the first to know when new children's books, curriculum resources,
           and Managed Security Buyers Guide issues are released.
           No spam — just new releases.</p>
      </div>
      <div class="signup-form-wrap">
        ${formHtml}
      </div>
    </div>
  `;
  footer.parentNode.insertBefore(section, footer);
}

document.addEventListener("DOMContentLoaded", () => {
  renderHeader();
  renderFooter();
  renderPromoBar();
  initMailerLite();
  renderSignupSection();
  initShare();
  document.querySelectorAll("[data-contact-email]").forEach((el) => {
    el.href = `mailto:${SITE_CONFIG.contactEmail}`;
    if (el.dataset.contactEmail === "text") el.textContent = SITE_CONFIG.contactEmail;
  });
  // Render any book grids present on the page from the shared data files.
  if (typeof BOOKS !== "undefined" && document.getElementById("books-grid")) {
    renderBooks();
    renderPendingPaypalButtons();
  }
  if (typeof MSSP_ISSUES !== "undefined" && document.getElementById("mssp-issue-list")) {
    renderMsspIssues();
  }
});

/* ---- Bottom scrolling promo bar (Amazon Kindle free trial) ----
   Appears on every page (it's injected here in main.js rather than added
   to each HTML file, so there's only one place to edit it). Dismissing it
   sticks for the rest of the browser session via sessionStorage — it comes
   back on the next visit, same as most promo bars. */
function renderPromoBar() {
  let dismissed = false;
  try {
    dismissed = sessionStorage.getItem("btpPromoDismissed") === "1";
  } catch (e) {
    /* private-browsing/storage-blocked — just show the bar every time */
  }
  if (dismissed || document.getElementById("promo-bar")) return;

  const msg =
    "🛒 New here? No Kindle app or Amazon account yet? Grab a free Kindle Unlimited trial, then dive in.";
  const bar = document.createElement("div");
  bar.id = "promo-bar";
  bar.innerHTML = `
    <div class="promo-track">
      <div class="promo-scroll">${msg}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;${msg}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>
    </div>
    <div class="promo-actions">
      <a class="promo-btn trial" href="https://amzn.to/4vL8lcF" target="_blank" rel="nofollow sponsored noopener">🎟️ Free Kindle Trial</a>
      <a class="promo-btn shop" href="books.html">🛍️ Shop the Books</a>
      <button class="promo-close" type="button" aria-label="Dismiss">✕</button>
    </div>
  `;
  document.body.appendChild(bar);
  document.body.classList.add("has-promo-bar");

  bar.querySelector(".promo-close").addEventListener("click", () => {
    bar.remove();
    document.body.classList.remove("has-promo-bar");
    try {
      sessionStorage.setItem("btpPromoDismissed", "1");
    } catch (e) {
      /* ignore */
    }
  });
}

/* ---- PayPal hosted "Buy Now" buttons ----
   A book with a `paypal` field gets a real PayPal button rendered into a
   placeholder <div>. This only works on a page that also loads the PayPal
   SDK <script> tag (see books.html <head>) — without it, window.paypal is
   undefined and the placeholder is simply left empty (no broken button,
   the Amazon button still works fine on its own). */
function renderPendingPaypalButtons() {
  if (!window.paypal || !window.paypal.HostedButtons) return;
  document.querySelectorAll("[data-paypal-button-id]").forEach((el) => {
    const id = el.getAttribute("data-paypal-button-id");
    window.paypal.HostedButtons({ hostedButtonId: id }).render("#" + el.id);
  });
}

/* ---- Book cards (books.html + home page teasers) ---- */
function bookCoverBlock(b) {
  if (b.cover) {
    return `<img class="book-thumb" src="${b.cover}" alt="Cover: ${b.title}" onerror="this.outerHTML='<div class=&quot;book-thumb placeholder&quot;>${b.icon || "📖"}</div>'" />`;
  }
  return `<div class="book-thumb placeholder">${b.icon || "📖"}</div>`;
}

/* Renders IngramSpark direct-purchase buttons when a book has ingramLinks.
   Each entry: { label, price, url } → one green "📦 Paperback — $12.99 + shipping" button. */
function ingramSection(b) {
  if (!b.ingramLinks || !b.ingramLinks.length) return "";
  const btns = b.ingramLinks
    .map(
      (il) =>
        `<a class="btn btn-ingram btn-sm" href="${il.url}" target="_blank" rel="noopener">📦 ${il.label} — ${il.price}</a>`
    )
    .join("");
  return `
    <div class="ingram-section">
      <div class="ingram-label">Buy direct from IngramSpark</div>
      <div class="ingram-btns">${btns}</div>
    </div>`;
}

function renderBooks(limit) {
  const mount = document.getElementById("books-grid");
  if (!mount) return;
  const list = limit ? BOOKS.slice(0, limit) : BOOKS;
  mount.innerHTML = list.map((b) => `
    <article class="book-card">
      <div class="book-main">
        ${bookCoverBlock(b)}
        <div class="book-info">
          <h3>${b.title}</h3>
          <div class="book-meta">${b.author ? `By ${b.author}` : ""}${b.formats ? " · " + b.formats : ""}</div>
          ${b.description ? `<p>${b.description}</p>` : ""}
          <div class="card-actions">
            <a class="btn btn-amazon btn-sm" href="${b.amazon}" target="_blank" rel="nofollow sponsored noopener">🛒 Buy on Amazon</a>
            ${b.spotify ? `<a class="btn btn-spotify btn-sm" href="${b.spotify}" target="_blank" rel="noopener">🎧 Listen on Spotify</a>` : ""}
            ${b.otherLink ? `<a class="btn btn-outline btn-sm" href="${b.otherLink}" target="_blank" rel="noopener">${b.otherLinkLabel || "Also available"}</a>` : ""}
          </div>
          ${ingramSection(b)}
        </div>
      </div>
      ${b.paypal ? `
      <div class="paypal-col">
        <div class="paypal-buy-label">Buy direct:</div>
        <div id="paypal-container-${b.paypal.hostedButtonId}" data-paypal-button-id="${b.paypal.hostedButtonId}"></div>
      </div>` : ""}
    </article>
  `).join("");
}

/* ---- Managed Security Buyers Guide News issue list ---- */
function renderMsspIssues(limit) {
  const mount = document.getElementById("mssp-issue-list");
  if (!mount) return;
  const list = limit ? MSSP_ISSUES.slice(0, limit) : MSSP_ISSUES;
  mount.innerHTML = list.map((issue, i) => `
    <article class="book-card news-issue">
      <img class="book-thumb" src="${issue.cover}" alt="Cover: Managed Security Buyers Guide News, Volume 1, Issue ${issue.issue}" onerror="this.outerHTML='<div class=&quot;book-thumb placeholder&quot;>🛡️</div>'" />
      <div>
        <div class="issue-tag">Vol. 1 · Issue ${issue.issue}${issue.dateRange ? " — " + issue.dateRange : ""}${i === 0 ? '<span class="latest-pill">Latest</span>' : ""}</div>
        <h4>${issue.title}</h4>
        <p>${issue.summary}</p>
        <div class="card-actions">
          <a class="btn btn-biz btn-sm" href="${issue.amazon}" target="_blank" rel="nofollow sponsored noopener">🛒 Get it on Amazon</a>
        </div>
      </div>
    </article>
  `).join("");
}

/* ---- Share button + popup ----
   The "Share" button in the header (and the "Share this site" button in the
   footer) opens a popup with Facebook, X, LinkedIn, Instagram, TikTok,
   WhatsApp, Email and Copy Link. Wording and the site address come from
   SITE_CONFIG.share in config.js — edit them there.

   Instagram and TikTok don't offer a web "share this link" page like
   Facebook/X/LinkedIn do. So on phones, those buttons open the phone's own
   share sheet (where the Instagram/TikTok apps appear); on computers, they
   copy the link and open Instagram/TikTok in a new tab so the visitor can
   paste it into a post, story, bio or message.

   Every shared link gets UTM tags (utm_source=facebook, etc.) so analytics
   can show which platform each visitor came from, and if Google Analytics
   is ever added, every click also fires a GA4 "share" event. */

const SHARE_PLATFORMS = [
  { key: "facebook",  label: "Facebook",  icon: "📘", url: (u) => `https://www.facebook.com/sharer/sharer.php?u=${u}` },
  { key: "x",         label: "X",         icon: "✖️", url: (u, t) => `https://x.com/intent/post?url=${u}&text=${t}` },
  { key: "linkedin",  label: "LinkedIn",  icon: "💼", url: (u) => `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
  { key: "instagram", label: "Instagram", icon: "📸", app: "https://www.instagram.com/" },
  { key: "tiktok",    label: "TikTok",    icon: "🎵", app: "https://www.tiktok.com/" },
  { key: "whatsapp",  label: "WhatsApp",  icon: "💬", url: (u, t) => `https://wa.me/?text=${t}%20${u}` },
  { key: "email",     label: "Email",     icon: "✉️", url: (u, t, s) => `mailto:?subject=${s}&body=${t}%0A%0A${u}` },
  { key: "copy",      label: "Copy link", icon: "🔗" },
];

function shareConfig() {
  const c = SITE_CONFIG.share || {};
  return {
    siteUrl: (c.siteUrl || "https://baldwinterneypress.com").replace(/\/$/, ""),
    siteText: c.siteText || "Books from Baldwin Terney Press, a family-owned publisher",
    hashtags: c.hashtags || "",
  };
}

function isHomePage() {
  const page = currentPage();
  return !page || page === "index.html";
}

// Address being shared: the whole site, or the page the visitor is on.
function shareTarget(scope) {
  const c = shareConfig();
  if (scope === "site" || isHomePage()) return { url: c.siteUrl + "/", text: c.siteText };
  const title = (document.title || "").replace(/\s+[—|-]\s+Baldwin Terney Press.*$/i, "").trim();
  return { url: c.siteUrl + "/" + currentPage(), text: (title ? title + " — " : "") + "Baldwin Terney Press" };
}

function withUtm(url, source) {
  try {
    const u = new URL(url);
    u.searchParams.set("utm_source", source);
    u.searchParams.set("utm_medium", "social");
    u.searchParams.set("utm_campaign", "share_button");
    return u.toString();
  } catch (e) {
    return url;
  }
}

function copyText(text) {
  // Synchronous copy first (works everywhere, keeps the click "user gesture"
  // intact so the Instagram/TikTok tab can still open right after).
  let ok = false;
  try {
    const ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    ok = document.execCommand("copy");
    document.body.removeChild(ta);
  } catch (e) { ok = false; }
  if (!ok && navigator.clipboard) {
    navigator.clipboard.writeText(text).catch(() => {});
    ok = true;
  }
  return ok;
}

function isPhone() {
  return !!(navigator.share && window.matchMedia && window.matchMedia("(pointer: coarse)").matches);
}

function trackShare(method, url) {
  if (window.gtag) window.gtag("event", "share", { method, content_type: "page", item_id: url, page_path: window.location.pathname });
}

function buildShareModal() {
  const onHome = isHomePage();
  const wrap = document.createElement("div");
  wrap.id = "share-modal";
  wrap.className = "share-modal";
  wrap.hidden = true;
  wrap.innerHTML = `
    <div class="share-backdrop" data-share-close></div>
    <div class="share-dialog" role="dialog" aria-modal="true" aria-labelledby="share-title">
      <button class="share-close" type="button" aria-label="Close" data-share-close>✕</button>
      <h3 id="share-title">Share Baldwin Terney Press</h3>
      <p class="share-sub">Know a reader, parent, teacher or security buyer who'd like our books? Pass it along.</p>
      ${onHome ? "" : `
      <div class="share-scope" role="radiogroup" aria-label="What to share">
        <label><input type="radio" name="share-scope" value="page" checked> This page</label>
        <label><input type="radio" name="share-scope" value="site"> Whole site</label>
      </div>`}
      <div class="share-grid">
        ${SHARE_PLATFORMS.map((p) => `
          <button type="button" class="share-opt share-${p.key}" data-share="${p.key}">
            <span class="share-ico" aria-hidden="true">${p.icon}</span>${p.label}
          </button>`).join("")}
      </div>
      <div class="share-url-row">
        <input type="text" class="share-url" readonly aria-label="Link to share">
      </div>
      <p class="share-msg" role="status" aria-live="polite"></p>
    </div>`;
  document.body.appendChild(wrap);

  const urlBox = wrap.querySelector(".share-url");
  const msg = wrap.querySelector(".share-msg");
  const scope = () => (wrap.querySelector('input[name="share-scope"]:checked') || {}).value || "page";
  const refresh = () => { urlBox.value = shareTarget(scope()).url; msg.textContent = ""; };
  wrap.addEventListener("change", refresh);
  urlBox.addEventListener("focus", () => urlBox.select());

  wrap.addEventListener("click", (e) => {
    if (e.target.closest("[data-share-close]")) { closeShareModal(); return; }
    const btn = e.target.closest("[data-share]");
    if (!btn) return;
    const p = SHARE_PLATFORMS.find((x) => x.key === btn.dataset.share);
    const t = shareTarget(scope());
    const link = withUtm(t.url, p.key);
    const tags = shareConfig().hashtags;
    const text = t.text + (tags && p.key === "x" ? " " + tags.split(",").map((h) => "#" + h.trim()).join(" ") : "");
    trackShare(p.key, t.url);

    if (p.key === "copy") {
      copyText(link);
      msg.textContent = "✅ Link copied — paste it anywhere.";
      return;
    }
    if (p.app) {
      if (isPhone()) {
        navigator.share({ title: "Baldwin Terney Press", text: t.text, url: link }).catch(() => {});
        return;
      }
      copyText(link);
      msg.textContent = `✅ Link copied! Paste it into your ${p.label} post, story, bio or message.`;
      window.open(p.app, "_blank", "noopener");
      return;
    }
    const href = p.url(encodeURIComponent(link), encodeURIComponent(text), encodeURIComponent(t.text));
    if (p.key === "email") { window.location.href = href; return; }
    window.open(href, "_blank", "noopener,width=640,height=600");
  });

  wrap._refresh = refresh;
  return wrap;
}

let shareReturnFocus = null;
function openShareModal() {
  const m = document.getElementById("share-modal") || buildShareModal();
  m._refresh();
  shareReturnFocus = document.activeElement;
  m.hidden = false;
  document.body.classList.add("share-open");
  const first = m.querySelector(".share-opt");
  if (first) first.focus();
}

function closeShareModal() {
  const m = document.getElementById("share-modal");
  if (!m || m.hidden) return;
  m.hidden = true;
  document.body.classList.remove("share-open");
  if (shareReturnFocus && shareReturnFocus.focus) shareReturnFocus.focus();
}

function initShare() {
  document.addEventListener("click", (e) => {
    if (e.target.closest && e.target.closest("[data-share-open]")) { e.preventDefault(); openShareModal(); }
  });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeShareModal(); });
}

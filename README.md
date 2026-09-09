# Baldwin Terney Press — Website

A plain HTML/CSS/JavaScript site for **baldwinterneypress.com**, built to run on
GitHub Pages (no build tools, no server, no frameworks — just files). It follows
the same pattern as your other family-of-sites builds (Cyber Elementary, Baldwin
Terney Consulting), so if you've updated one of those before, this will look
familiar.

## What's in here

```
index.html                     Home page — both lines of business, MSS Buyers Guide teaser, About, Cyber Elementary cross-link, Contact
books.html                     General catalog: the milk books + The "COMP"rehensive Guide
managed-security-buyers.html   All 8 issues of Managed Security Buyers Guide News + author bio
about.html                     Full About Us + founder note + Cyber Elementary
contact.html                   Contact info (mailto — this is a static site, no server-side form)
privacy-policy.html            Basic privacy policy + affiliate disclosure
terms-and-conditions.html      Basic terms
CNAME                          Tells GitHub Pages this site should answer to baldwinterneypress.com
robots.txt / sitemap.xml       Basic SEO plumbing
assets/css/style.css           All site styling — colors/fonts are CSS variables at the top
assets/js/config.js            Contact email, address, social links, nav links
assets/js/main.js              Renders the header/footer and the book/issue cards
assets/js/data/
  books.js                     <- Add/edit general catalog books here (not the MSS Buyers Guide)
  mssp.js                      <- Add/edit Managed Security Buyers Guide News issues here
assets/images/books/           Book cover images
assets/images/site/            Author/founder photos
assets/images/mascot/          Cyber Elementary's Choco mascot (used on the cross-promo strip)
```

## Adding a new Managed Security Buyers Guide News issue

Edit `assets/js/data/mssp.js`. Copy the block for Issue 8, paste it **above** it
(newest issue goes first — that's also what puts the "Latest" pill on it), and
fill in:

- `issue` — the issue number
- `dateRange` — e.g. "Week of Sep 5–11, 2026"
- `title` — the issue's headline
- `summary` — a 2–4 sentence description (see existing issues for the tone —
  specific news event, then the buyer question it raises)
- `cover` — path to the cover image (drop the file in `assets/images/books/`
  first, e.g. `msbg-news-issue-9-cover.jpg`)
- `amazon` — your amzn.to link for that issue, used exactly as pasted

No HTML editing required — the page renders the full list from this file
automatically.

## Adding a general catalog book

Edit `assets/js/data/books.js` the same way — copy an existing entry, change
the fields. `cover` can be left as `""` and the card will show a colorful emoji
placeholder instead of breaking.

## Selling directly with PayPal (Buy Now buttons)

Any book in `assets/js/data/books.js` can get a real PayPal "Buy Now" button
next to its Amazon button — add a `paypal` field:

```js
paypal: { hostedButtonId: "XXXXXXXXXXXXX" }
```

**I Need Chocolate Milk! already has one** — it reuses the same PayPal hosted
button that's already live on rachelmattei.com for this exact title, so
payments for either site land in the same PayPal account. If that's not what
you want (e.g. you'd rather Baldwin Terney Press collect its own book sales
separately), set up a second button — it takes about five minutes:

1. Log into **paypal.com** with the business account that should receive the
   money.
2. Go to **Pay & Get Paid → Buttons** (sometimes listed as "PayPal Buttons"
   under Tools).
3. Click **Create a button**, choose **Buy Now**, and fill in the item name
   and price.
4. Save it — PayPal gives you a **hosted button ID** (a short code like
   `V2AUPSMVB37TJ`). That's the value that goes in `hostedButtonId` above.
5. Also confirm the **client-id** in the `<script src="https://www.paypal.com/sdk/js?client-id=...">`
   tag at the top of `books.html` matches the PayPal account the button
   belongs to. A client-id comes from **developer.paypal.com → Apps &
   Credentials** (use the Live app's Client ID, not the Sandbox one, once
   you're ready to take real payments). It's safe to have in the page's
   source — it's a public identifier, not a secret key.

That's the whole setup — no backend, no server, no monthly fee beyond
PayPal's normal per-transaction rate. The button only renders on a page that
also has that `<script>` tag in its `<head>` (currently just `books.html`);
copy that same tag into any other page you add a `paypal` button to.

If the PayPal SDK script fails to load (offline preview, ad blocker, etc.)
the button area is simply left blank — the Amazon button next to it still
works normally, nothing breaks.

## Images you'll want to add (see the delivery message for the full list)

Covers for **I Need Strawberry Milk!** and **The "COMP"rehensive Guide** aren't
in your local folders yet, so those two cards currently fall back to an emoji
placeholder. Everything else (the chocolate milk cover, all 8 Buyers Guide News
covers, the founder headshot, the Cyber Elementary mascot) was pulled from your
existing site folders and is already wired in.

## Local preview

Since this is a static site, open `index.html` directly in a browser, or for
the most accurate preview (matches how GitHub Pages serves it), run a tiny
local server from this folder:

```
python3 -m http.server 8000
```

then visit `http://localhost:8000`.

## Publishing to GitHub Pages

1. Create a new GitHub repository (e.g. `baldwinterneypress-site`).
2. Push everything in this folder to it.
3. In the repo's Settings → Pages, set the source to the `main` branch, root
   folder.
4. GitHub will serve it at `https://<username>.github.io/<repo>/` first — the
   `CNAME` file is already set to `baldwinterneypress.com`, so once you point
   your domain's DNS at GitHub Pages (an `A` record set to GitHub's IPs, or a
   `CNAME` record if using a `www` subdomain — GitHub's docs walk through the
   exact records), the custom domain will take over.
5. Until DNS is switched over, the site is safe to preview at the `github.io`
   URL without affecting the live GoDaddy site.

/* ============================================================
   Baldwin Terney Press — general book catalog (everything except
   the Managed Security Buyers Guide News series, which has its own
   file: mssp.js).

   Each entry:
     title        Full title
     author       Author/illustrator credit
     formats      Short format string shown under the title
     description  1-3 sentence description
     cover        Path to a cover image under assets/images/books/
                  Leave blank ("") to show a colorful icon placeholder
                  instead — nothing breaks if the file is missing.
     icon         Emoji shown when there's no cover image
     amazon       Amazon (amzn.to is fine, already tagged) purchase link
     ingramLinks  Optional array of IngramSpark direct-purchase options.
                  Each entry: { label, price, url }
                  e.g. [
                    { label: "Paperback", price: "$12.99 + shipping", url: "https://shop.ingramspark.com/..." },
                    { label: "Hard Cover", price: "$15.99 + shipping", url: "https://shop.ingramspark.com/..." },
                  ]
     otherLink    Optional second purchase link (e.g. author site, B&N)
     otherLinkLabel  Label for that second link's button
     paypal       Optional — adds a real PayPal "Buy Now" button next to the
                  Amazon button. Set to { hostedButtonId: "XXXXXXXXXXXXX" }.
                  Get a hostedButtonId by logging into paypal.com -> Pay &
                  Get Paid -> Buttons -> create a "Buy Now"/Hosted Button for
                  that item. Also requires the PayPal SDK <script> tag in the
                  page's <head> (see books.html) — one tag per page, shared
                  by every book with a `paypal` field on that page.
   ============================================================ */

const BOOKS = [
  {
    title: "I Need Chocolate Milk!",
    author: "Rachel Mattei",
    formats: "Paperback & hardcover",
    description:
      "How do you ask for something you want? “I need chocolate milk!” is heard by James’s mother all day. He doesn’t just want chocolate milk, he demands it and provides many imaginative reasons why he needs it. By the end of the book, James realizes all he has to do is simply say “please.”",
    cover: "assets/images/books/i-need-chocolate-milk-cover.jpg",
    icon: "🍫",
    amazon: "https://amzn.to/4xeLbfA",
    // IngramSpark direct-purchase links (paperback + hardcover)
    ingramLinks: [
      {
        label: "Paperback",
        price: "$12.99 + shipping",
        url: "https://shop.ingramspark.com/b/084?params=Hh6Kp3ot8y4SAk7F5v1qxmZtwYQGA6mnNereRyYaK6m",
      },
      {
        label: "Hard Cover",
        price: "$15.99 + shipping",
        url: "https://shop.ingramspark.com/b/084?params=nZcv1AP81xyWYJsLsmXMbPkaN1Wd8cgU8hKw8M2o8Pj",
      },
    ],
    otherLink: "https://rachelmattei.com",
    otherLinkLabel: "Visit rachelmattei.com ↗",
    // Dedicated PayPal "Buy Now" hosted button for this site (same PayPal
    // account as rachelmattei.com, per Mark — just its own button ID).
    paypal: { hostedButtonId: "7HQREYB9HLA6C" },
  },
  {
    title: "I Need Strawberry Milk!",
    author: "Rachel Mattei",
    formats: "Paperback & hardcover",
    description:
      "How do you ask for something you want? “I need strawberry milk!” is heard by Miriam’s father all day. She doesn’t just want strawberry milk, she demands it and provides many imaginative reasons why she needs it. By the end of the book, Miriam realizes all she has to do is simply say “please.”",
    cover: "assets/images/books/i-need-strawberry-milk-cover.jpg",
    icon: "🍓",
    amazon: "https://amzn.to/4dmDTz8",
    ingramLinks: [
      {
        label: "Paperback",
        price: "$12.99 + shipping",
        url: "https://shop.ingramspark.com/b/084?params=ry2MW1xFPiZGfjAwQlsc539a6XCyURaubX8gdXQRtmU",
      },
      {
        label: "Hard Cover",
        price: "$15.99 + shipping",
        url: "https://shop.ingramspark.com/b/084?params=Mg8jYb03rYaGqNDQeZ4gPH7SQ56LYQ6ni0UJ4KnPtCp",
      },
    ],
    otherLink: "https://rachelmattei.com",
    otherLinkLabel: "Visit rachelmattei.com ↗",
  },
];

/* ============================================================
   Trendy Topical — this page's own catalog. Fast-turnaround books
   on whatever's dominating the cultural conversation right now.
   Uses the same `BOOKS` array name and card renderer as books.js
   (assets/js/main.js renderBooks()) — safe because trendy-topical.html
   only loads this file, never books.js, so there's no name clash.
   See books.js for the full field reference (title, author, description,
   cover, icon, amazon, otherLink, otherLinkLabel, paypal).

   Ordered newest release first (per Mark's "put latest on top"), using
   the "Prepared:" / event dates on each book's own KDP metadata sheet:
     Manufactured Monsters          — prepared 2026-09-08
     The Machines That Let Themselves In — published within days of the
                                      Jul 22 / Jul 30-31 2026 AI-hacking
                                      stories it covers (~early Aug 2026)
     The Last Final                 — prepared 2026-07-21
     The Wedding That Broke the Internet — published within days of the
                                      Jul 3 2026 wedding it covers
   ============================================================ */

const BOOKS = [
  {
    title: "Manufactured Monsters",
    author: "Mark Mattei",
    description:
      "In late 2026, AI-generated hoaxes went viral across the world — a menacing “sighting” of a beloved children's-book character prowling city streets, a fabricated hospital photo of a sitting U.S. senator, police in New Jersey hunting monkeys that were never there. <i>Manufactured Monsters</i> is an independent analysis of five separately documented AI-hoax incidents and why our brains are so poorly equipped to catch them.",
    cover: "assets/images/books/manufactured-monsters-cover.jpg",
    icon: "👾",
    amazon: "https://amzn.to/4iSv3Nh",
  },
  {
    title: "The Machines That Let Themselves In",
    author: "Mark Mattei",
    description:
      "How autonomous AI systems started hacking corporate networks on their own — and what comes next. In one ten-day stretch in the summer of 2026, two of the world's leading AI companies admitted their own models broke into other companies' computer systems without being told to. A fast, clear-eyed analysis of what actually happened, and what it means for AI safety.",
    icon: "🚪",
    amazon: "https://amzn.to/4g10br4",
  },
  {
    title: "The Last Final",
    author: "Mark Mattei",
    description:
      "How a 48-team World Cup, a weeping legend, and 20 billion views rewrote soccer forever. An analysis of the record-shattering 2026 FIFA World Cup — the format gamble, the underdogs, Lionel Messi's history-making final tournament, and the numbers that made it a true global cultural moment.",
    cover: "assets/images/books/the-last-final-cover.jpg",
    icon: "⚽",
    amazon: "https://amzn.to/4bvC2aw",
  },
  {
    title: "The Wedding That Broke the Internet",
    author: "Mark Mattei",
    description:
      "Inside Taylor Swift and Travis Kelce's big day — and what it reveals about fame in the algorithm age. On July 3, 2026, the couple married at Madison Square Garden with no press and NDAs for every guest — and still became the most-talked-about story on the internet that week. A sharp look at how engineered secrecy outperformed a press release.",
    icon: "💍",
    amazon: "https://amzn.to/4pXDXdX",
  },
  {
    // Evergreen guide, not tied to a 2026 news event like the four above —
    // no publish-date signal, so it sits at the bottom rather than being
    // guessed into the "latest on top" ordering.
    title: 'The "COMP"rehensive Guide to Atlantic City',
    author: "James Mattei",
    description:
      "How to vacation for free in AC. The “COMP”rehensive Guides instruct on getting the most out of your gambling experience on the Gulf Coast and Atlantic City. It shows the in's and out's of the COMP world and gives the novice player an advantage when going to the casinos. It contains easy-to-follow charts on Blackjack, video poker, and roulette.",
    icon: "🎲",
    amazon: "https://amzn.to/3xs8rJB",
  },
];

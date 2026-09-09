/* ============================================================
   Cyber Elementary School Curriculum — this page's own catalog.
   Uses the same `BOOKS` array name and card renderer as books.js
   (assets/js/main.js renderBooks()) — safe because cyber-elementary.html
   only loads this file, never books.js, so there's no name clash.
   See books.js for the full field reference (title, author, description,
   cover, icon, amazon, otherLink, otherLinkLabel, paypal).
   ============================================================ */

const BOOKS = [
  {
    title: "Cyber Elementary School Curriculum (9 book series) - 36 Cyber & AI Security and Safety Lessons, Workbooks and Quizzes",
    author: "Mark W. Mattei",
    description:
      'Cyber Elementary School Curriculum is a complete, ready-to-teach curriculum of 36 lessons built specifically for 3rd, 4th, 5th and 6th Grade elementary classrooms, Micro Schools and homeschools, covering everything from strong passwords and phishing awareness to understanding AI chatbots and spotting AI-generated content. Accompanying YouTube series: <a href="https://www.youtube.com/@cyberelementary" target="_blank" rel="noopener">www.youtube.com/@cyberelementary</a> for every Lesson. Every lesson follows the same reliable 30–40 minute lesson plan format: learning objectives, a warm-up hook, direct instruction with grade-differentiated talking points for 3rd through 6th grade, guided workbook practice activities, independent practice & homework assignments, a closing discussion, and a full assessment with teacher answer keys for every grade level. Organized into four units — Cyber Security Basics, Online Safety, Digital Citizenship & Communication, and AI Security & AI Safety — this series gives teachers everything they need to run a full-year cyber safety program without hunting down separate resources or writing lesson plans from scratch.',
    cover: "assets/images/books/cyber-elementary-lesson-book-cover.jpg",
    icon: "🧒",
    amazon: "https://amzn.to/4gGONSK",
    otherLink: "https://www.cyberelementary.com",
    otherLinkLabel: "Visit Cyber Elementary ↗",
  },
];

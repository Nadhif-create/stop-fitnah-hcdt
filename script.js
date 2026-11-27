"use strict";

// =========================
// 01. TABAYYUN CHECKLIST
// =========================

const checkboxes = document.querySelectorAll(".tabayyun-check");

const checklistProgress = document.getElementById("checklist-progress");
const checklistStatus = document.getElementById("checklist-status");
const resetChecklist = document.getElementById("reset-checklist");

function updateChecklist() {
    const completed = document.querySelectorAll(
        ".tabayyun-check:checked"
    ).length;

    const total = checkboxes.length;
    const percentage = (completed / total) * 100;

    checklistProgress.style.width = `${percentage}%`;

    checklistStatus.textContent =
        `${completed} dari ${total} pemeriksaan selesai.`;

    if (completed === total) {
        checklistStatus.textContent =
            "Pemeriksaan selesai! Tetap pertimbangkan apakah informasi perlu disebarkan.";

        checklistStatus.style.color = "#164b35";
    } else {
        checklistStatus.style.color = "";
    }
}

checkboxes.forEach(function (checkbox) {
    checkbox.addEventListener("change", updateChecklist);
});

resetChecklist.addEventListener("click", function () {
    checkboxes.forEach(function (checkbox) {
        checkbox.checked = false;
    });

    updateChecklist();
});

updateChecklist();

// =========================
// 02. QUIZ DATABASE
// =========================

const questions = [
    {
        question:
            "Temanmu menyebarkan rumor tentang mahasiswa lain tanpa bukti. Apa yang sebaiknya kamu lakukan?",

        options: [
            "Langsung meneruskannya ke grup lain.",
            "Memeriksa kebenaran informasi terlebih dahulu.",
            "Langsung menghakimi mahasiswa tersebut."
        ],

        answer: 1,

        explanation:
            "Tabayyun mengajarkan kita untuk memeriksa kebenaran informasi sebelum bertindak."
    },

    {
        question:
            "Apa salah satu dampak penyebaran fitnah?",

        options: [
            "Merusak nama baik dan hubungan pertemanan.",
            "Meningkatkan kepercayaan antarmahasiswa.",
            "Mempererat hubungan sosial."
        ],

        answer: 0,

        explanation:
            "Fitnah dapat merusak reputasi, menimbulkan konflik, dan memberikan tekanan emosional."
    },

    {
        question:
            "Ayat Al-Qur'an manakah yang menjadi landasan tabayyun dalam kampanye ini?",

        options: [
            "QS. Al-Ikhlas ayat 1.",
            "QS. Al-Fatihah ayat 1.",
            "QS. Al-Hujurat ayat 6."
        ],

        answer: 2,

        explanation:
            "QS. Al-Hujurat ayat 6 mengajarkan pentingnya meneliti kebenaran berita sebelum bertindak."
    },

    {
        question:
            "Bagaimana cara melakukan klarifikasi yang tepat?",

        options: [
            "Mempermalukan orang yang bersangkutan.",
            "Bertanya secara santun kepada pihak terkait apabila diperlukan.",
            "Menyebarkan tuduhan agar semakin banyak yang mengetahui."
        ],

        answer: 1,

        explanation:
            "Klarifikasi harus dilakukan secara santun dengan tetap menjaga kehormatan orang lain."
    },

    {
        question:
            "Apa makna slogan Saring Sebelum Sharing?",

        options: [
            "Memeriksa informasi dan mempertimbangkan dampaknya sebelum menyebarkan.",
            "Menyebarkan semua informasi yang sedang viral.",
            "Mengutamakan kecepatan daripada kebenaran informasi."
        ],

        answer: 0,

        explanation:
            "Informasi perlu diperiksa kebenaran, manfaat, dan dampaknya sebelum disebarkan."
    }
];

// =========================
// 03. QUIZ STATE
// =========================

let currentQuestion = 0;
let score = 0;
let answered = false;

// =========================
// 04. QUIZ ELEMENTS
// =========================

const quizQuestion = document.getElementById("quiz-question");
const quizOptions = document.getElementById("quiz-options");
const quizCounter = document.getElementById("quiz-counter");
const quizFeedback = document.getElementById("quiz-feedback");
const quizProgress = document.getElementById("quiz-progress");

const nextButton = document.getElementById("next-question");
const restartButton = document.getElementById("restart-quiz");

const quizResult = document.getElementById("quiz-result");
const finalScore = document.getElementById("final-score");
const resultMessage = document.getElementById("result-message");

// =========================
// 05. DISPLAY QUESTION
// =========================

function showQuestion() {
    answered = false;

    const question = questions[currentQuestion];

    quizQuestion.hidden = false;
    quizCounter.hidden = false;
    quizOptions.hidden = false;
    quizFeedback.hidden = true;

    quizCounter.textContent =
        `Pertanyaan ${currentQuestion + 1} dari ${questions.length}`;

    quizQuestion.textContent = question.question;

    quizOptions.innerHTML = "";
    quizFeedback.textContent = "";

    nextButton.hidden = true;
    quizResult.hidden = true;

    quizProgress.style.width =
        `${(currentQuestion / questions.length) * 100}%`;

    question.options.forEach(function (option, index) {
        const button = document.createElement("button");

        button.type = "button";
        button.classList.add("quiz-option");

        button.textContent =
            `${String.fromCharCode(65 + index)}. ${option}`;

        button.addEventListener("click", function () {
            selectAnswer(index);
        });

        quizOptions.appendChild(button);
    });
}

// =========================
// 06. CHECK ANSWER
// =========================

function selectAnswer(selectedIndex) {
    if (answered) {
        return;
    }

    answered = true;

    const question = questions[currentQuestion];
    const buttons = quizOptions.querySelectorAll("button");

    buttons.forEach(function (button, index) {
        button.disabled = true;

        if (index === question.answer) {
            button.classList.add("correct");
        }
    });

    quizFeedback.hidden = false;

    if (selectedIndex === question.answer) {
        score++;

        quizFeedback.textContent =
            "Benar! " + question.explanation;

        quizFeedback.style.color = "#166534";
    } else {
        buttons[selectedIndex].classList.add("wrong");

        quizFeedback.textContent =
            "Kurang tepat. " + question.explanation;

        quizFeedback.style.color = "#991b1b";
    }

    quizProgress.style.width =
        `${((currentQuestion + 1) / questions.length) * 100}%`;

    nextButton.hidden = false;

    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "Lihat Hasil"
            : "Pertanyaan Berikutnya";
}

// =========================
// 07. NEXT QUESTION
// =========================

nextButton.addEventListener("click", function () {
    if (!answered) {
        return;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        showQuestion();
    } else {
        showResult();
    }
});

// =========================
// 08. FINAL QUIZ RESULT
// =========================

function showResult() {
    quizQuestion.hidden = true;
    quizCounter.hidden = true;
    quizFeedback.hidden = true;
    quizOptions.hidden = true;

    quizOptions.innerHTML = "";

    nextButton.hidden = true;
    quizResult.hidden = false;

    quizProgress.style.width = "100%";

    finalScore.textContent =
        `${score}/${questions.length}`;

    if (score === questions.length) {
        resultMessage.textContent =
            "Luar biasa! Kamu memahami prinsip dasar tabayyun dan pencegahan fitnah.";
    } else if (score >= 3) {
        resultMessage.textContent =
            "Bagus! Terus pelajari dan terapkan prinsip tabayyun dalam kehidupan sehari-hari.";
    } else {
        resultMessage.textContent =
            "Tetap semangat! Baca kembali materi edukasi dan coba ulangi kuis.";
    }
}

// =========================
// 09. RESTART QUIZ
// =========================

restartButton.addEventListener("click", function () {
    currentQuestion = 0;
    score = 0;
    answered = false;

    showQuestion();
});

showQuestion();

// =========================
// 10. SCROLL REVEAL ANIMATION
// =========================

const revealElements = document.querySelectorAll(".reveal");

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver(
        function (entries, observer) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");

                    observer.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1
        }
    );

    revealElements.forEach(function (element) {
        revealObserver.observe(element);
    });
}

// =========================
// 11. ACTIVE NAVIGATION
// =========================

const sections = document.querySelectorAll("main > section[id]");
const navLinks = document.querySelectorAll("nav ul a");

function updateActiveNavigation() {
    const header = document.querySelector("header");
    const offset = header.offsetHeight + 50;

    let activeSection = "home";

    sections.forEach(function (section) {
        if (section.getBoundingClientRect().top <= offset) {
            activeSection = section.id;
        }
    });

    navLinks.forEach(function (link) {
        const isActive =
            link.getAttribute("href") === "#" + activeSection;

        link.style.color = isActive ? "#86d5ad" : "";

        if (isActive) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }
    });
}

window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);

window.addEventListener("resize", updateActiveNavigation);

updateActiveNavigation();

// =========================
// 12. INITIALIZATION
// =========================

console.log("Stop Fitnah! — HCDT Website Ready.");

// =========================
// 13. MOBILE HAMBURGER MENU
// =========================

const mobileNav = document.querySelector("nav");
const mobileNavList = mobileNav.querySelector("ul");

mobileNavList.id = "mobile-navigation";

const menuToggle = document.createElement("button");

menuToggle.type = "button";
menuToggle.className = "menu-toggle";
menuToggle.textContent = "☰";

menuToggle.setAttribute("aria-label", "Buka navigasi");
menuToggle.setAttribute("aria-expanded", "false");
menuToggle.setAttribute("aria-controls", "mobile-navigation");

mobileNav.insertBefore(menuToggle, mobileNavList);

function setMobileMenu(isOpen) {
    mobileNavList.classList.toggle("menu-open", isOpen);

    menuToggle.textContent = isOpen ? "✕" : "☰";

    menuToggle.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

    menuToggle.setAttribute(
        "aria-label",
        isOpen ? "Tutup navigasi" : "Buka navigasi"
    );
}

menuToggle.addEventListener("click", function () {
    const isOpen =
        mobileNavList.classList.contains("menu-open");

    setMobileMenu(!isOpen);
});

mobileNavList.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        setMobileMenu(false);
    });
});

document.addEventListener("keydown", function (event) {
    if (
        event.key === "Escape" &&
        mobileNavList.classList.contains("menu-open")
    ) {
        setMobileMenu(false);
        menuToggle.focus();
    }
});

document.addEventListener("click", function (event) {
    if (!mobileNav.contains(event.target)) {
        setMobileMenu(false);
    }
});

window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
        setMobileMenu(false);
    }
});

// =========================
// 14. READING PROGRESS BAR
// =========================

const readingProgress = document.createElement("div");

readingProgress.className = "reading-progress";
readingProgress.setAttribute("aria-hidden", "true");

document.querySelector("header").appendChild(readingProgress);

function updateReadingProgress() {
    const scrollTop = window.scrollY;

    const pageHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;

    const percentage = pageHeight > 0
        ? Math.min(100, Math.max(0, scrollTop / pageHeight * 100))
        : 0;

    readingProgress.style.width = `${percentage}%`;
}

// =========================
// 15. BACK TO TOP
// =========================

const backToTop = document.createElement("button");

backToTop.type = "button";
backToTop.className = "back-to-top";
backToTop.textContent = "↑";
backToTop.hidden = true;

backToTop.setAttribute(
    "aria-label",
    "Kembali ke bagian atas halaman"
);

document.body.appendChild(backToTop);

function updateBackToTop() {
    backToTop.hidden = window.scrollY < 500;
}

backToTop.addEventListener("click", function () {
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    document.querySelector(".logo").focus({
        preventScroll: true
    });

    window.scrollTo({
        top: 0,
        behavior: prefersReducedMotion ? "instant" : "smooth"
    });
});

function updateScrollFeatures() {
    updateReadingProgress();
    updateBackToTop();
}

window.addEventListener(
    "scroll",
    updateScrollFeatures,
    { passive: true }
);

window.addEventListener("resize", updateScrollFeatures);

window.addEventListener("load", updateScrollFeatures);

updateScrollFeatures();

// =========================
// 16. POSTER LIGHTBOX
// =========================

const posterLightbox = document.createElement("dialog");

posterLightbox.className = "poster-lightbox";

posterLightbox.setAttribute(
    "aria-labelledby",
    "lightbox-title"
);

posterLightbox.innerHTML = `
    <div class="lightbox-header">

        <h3 id="lightbox-title">
            Poster Edukasi
        </h3>

        <button
            type="button"
            class="lightbox-close"
            aria-label="Tutup poster">
            ×
        </button>

    </div>

    <img class="lightbox-image" alt="">

    <p class="lightbox-note">
        Tekan ESC atau tombol silang untuk menutup.
    </p>
`;

document.body.appendChild(posterLightbox);

const lightboxImage =
    posterLightbox.querySelector(".lightbox-image");

const lightboxTitle =
    posterLightbox.querySelector("#lightbox-title");

const lightboxClose =
    posterLightbox.querySelector(".lightbox-close");

let lastPosterTrigger = null;

const posterLinks =
    document.querySelectorAll(".poster-card a");

posterLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {

        if (
            typeof posterLightbox.showModal !== "function" ||
            event.ctrlKey ||
            event.metaKey ||
            event.shiftKey ||
            event.altKey
        ) {
            return;
        }

        event.preventDefault();

        const poster = link.querySelector("img");

        lastPosterTrigger = link;

        lightboxImage.src = link.href;
        lightboxImage.alt = poster.alt;
        lightboxTitle.textContent = poster.alt;

        posterLightbox.showModal();

        document.body.classList.add("lightbox-open");

        lightboxClose.focus();
    });
});

lightboxClose.addEventListener("click", function () {
    posterLightbox.close();
});

posterLightbox.addEventListener("click", function (event) {
    const bounds = posterLightbox.getBoundingClientRect();

    const outside =
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom;

    if (outside) {
        posterLightbox.close();
    }
});

posterLightbox.addEventListener("close", function () {
    document.body.classList.remove("lightbox-open");

    if (lastPosterTrigger) {
        lastPosterTrigger.focus({
            preventScroll: true
        });
    }
});

// =========================
// 17. WEBSITE FAVICON
// =========================

const faviconSVG = `
    <svg xmlns="http://www.w3.org/2000/svg"
         viewBox="0 0 64 64">

        <rect width="64" height="64" rx="14"
              fill="#14243c"/>

        <circle cx="32" cy="32" r="22"
                fill="#c9232d"/>

        <text x="32" y="46"
              text-anchor="middle"
              font-family="Arial, sans-serif"
              font-weight="bold"
              font-size="40"
              fill="white">!</text>

    </svg>
`;

const faviconLink = document.createElement("link");

faviconLink.rel = "icon";
faviconLink.type = "image/svg+xml";

faviconLink.href =
    "data:image/svg+xml," +
    encodeURIComponent(faviconSVG);

document.head.appendChild(faviconLink);

// =========================
// 18. FINAL INITIALIZATION
// =========================

console.log("Phase 6 — Final UI Features Ready.");


const menuBtn = document.getElementById("menuBtn");
const navLinks = document.querySelector(".nav-links");

menuBtn.addEventListener("click", function () {
    navLinks.classList.toggle("show");

    const isOpen = navLinks.classList.contains("show");

    menuBtn.setAttribute("aria-expanded", isOpen);

    menuBtn.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});

// إغلاق القائمة بعد اختيار رابط
document.querySelectorAll(".nav-links a").forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.classList.remove("show");

        menuBtn.setAttribute("aria-expanded", "false");
        menuBtn.innerHTML = '<i class="fa-solid fa-bars"></i>';

        document.querySelectorAll(".nav-links a").forEach(function (item) {
            item.classList.remove("active");
        });

        this.classList.add("active");
    });
});

const musicBtn = document.getElementById("musicBtn");
const loveMusic = document.getElementById("loveMusic");
const musicIcon = document.getElementById("musicIcon");
const musicText = document.getElementById("musicText");

musicBtn.addEventListener("click", async function () {
    if (loveMusic.paused) {
        try {
            await loveMusic.play();

            musicIcon.className = "fa-solid fa-pause";
            musicText.textContent = "إيقاف الموسيقى";
            musicBtn.classList.add("playing");
        } catch (error) {
            musicText.textContent = "تعذر تشغيل الأغنية";
            console.error("Music error:", error);
        }
    } else {
        loveMusic.pause();

        musicIcon.className = "fa-solid fa-play";
        musicText.textContent = "شغّل موسيقاي";
        musicBtn.classList.remove("playing");
    }
});

// تحديث الزر لو الأغنية انتهت أو اتوقفت
loveMusic.addEventListener("ended", function () {
    musicIcon.className = "fa-solid fa-play";
    musicText.textContent = "شغّل موسيقاي";
    musicBtn.classList.remove("playing");
});

const letterBtn = document.getElementById("letterBtn");
const letterResponse = document.getElementById("letterResponse");

letterBtn.addEventListener("click", function () {
    letterResponse.classList.toggle("show");

    if (letterResponse.classList.contains("show")) {
        letterBtn.textContent = "بحب أشوفك مبسوطة 💗";
    } else {
        letterBtn.textContent = "ابعتيلي قلب ❤️";
    }
});

const photoCards = document.querySelectorAll(".photo-card");
const photoModal = document.getElementById("photoModal");
const modalImage = document.getElementById("modalImage");
const modalClose = document.getElementById("modalClose");

function closePhotoModal() {
    photoModal.classList.remove("show");
    photoModal.setAttribute("aria-hidden", "true");
    modalImage.src = "";
}

photoCards.forEach(function (card) {
    card.addEventListener("click", function () {
        const imagePath = card.dataset.image;

        modalImage.src = imagePath;
        modalImage.alt = card.querySelector("img").alt;

        photoModal.classList.add("show");
        photoModal.setAttribute("aria-hidden", "false");
        modalClose.focus();
    });
});

modalClose.addEventListener("click", closePhotoModal);

photoModal.addEventListener("click", function (event) {
    if (event.target === photoModal) {
        closePhotoModal();
    }
});

document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && photoModal.classList.contains("show")) {
        closePhotoModal();
    }
});

const giftBoxes = document.querySelectorAll(".gift-box");

function openGift(giftBox) {
    const card = giftBox.closest(".surprise-card");
    const message = card.querySelector(".gift-message");
    const isOpen = message.classList.contains("show");

    message.classList.toggle("show");
    giftBox.classList.toggle("opened", !isOpen);

    giftBox.setAttribute("aria-expanded", String(!isOpen));

    const label = giftBox.querySelector("small");

    if (!isOpen) {
        label.textContent = "هدية مفتوحة 💗";
    } else {
        label.textContent = "اضغطي لفتحها 🎁";
    }
}

giftBoxes.forEach(function (giftBox) {
    giftBox.setAttribute("aria-expanded", "false");

    giftBox.addEventListener("click", function () {
        openGift(giftBox);
    });

    giftBox.addEventListener("keydown", function (event) {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openGift(giftBox);
        }
    });
});

const secretSection = document.getElementById("secret-letter");
const envelopeButton = document.getElementById("envelopeButton");
const secretMessage = document.getElementById("secretMessage");
const typedMessage = document.getElementById("typedMessage");
const replayLetter = document.getElementById("replayLetter");

const loveLetterText = `عاوز أقولك إن وجودك في حياتي حاجة جميلة جدًا.

يمكن مش بعرف أعبّر عن كل اللي جوايا،
بس إنتِ ليكي مكانة مميزة في قلبي.

أتمنى دايمًا أشوفك مبسوطة،
وأكون سبب في ضحكتك،
ونفضل نصنع ذكريات حلوة نفتكرها بكل حب.

إنتِ تستاهلي كل حاجة جميلة يا مي. ❤️`;

let typingTimer;

function openSecretLetter() {
    clearInterval(typingTimer);

    secretSection.classList.add("is-open");
    secretMessage.hidden = false;
    replayLetter.hidden = false;
    envelopeButton.disabled = true;
    typedMessage.textContent = "";

    let index = 0;

    typingTimer = setInterval(() => {
        typedMessage.textContent += loveLetterText[index];
        index++;

        if (index >= loveLetterText.length) {
            clearInterval(typingTimer);
        }
    }, 45);
}

function replaySecretLetter() {
    clearInterval(typingTimer);

    secretSection.classList.remove("is-open");
    secretMessage.hidden = true;
    replayLetter.hidden = true;
    envelopeButton.disabled = false;
    typedMessage.textContent = "";
}

envelopeButton.addEventListener("click", openSecretLetter);
replayLetter.addEventListener("click", replaySecretLetter);

/* Love Counter */

// غيّر التاريخ ده لتاريخ بداية حكايتكم الحقيقي
// الترتيب: السنة، الشهر من 0 إلى 11، اليوم، الساعة، الدقيقة
const loveStartDate = new Date(2026, 4, 13, 0, 0, 0);
function updateLoveCounter() {
    const now = new Date();
    const difference = now.getTime() - loveStartDate.getTime();

    const daysElement = document.getElementById("counterDays");
    const hoursElement = document.getElementById("counterHours");
    const minutesElement = document.getElementById("counterMinutes");
    const secondsElement = document.getElementById("counterSeconds");

    if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
        return;
    }

    if (difference < 0) {
        daysElement.textContent = "0";
        hoursElement.textContent = "00";
        minutesElement.textContent = "00";
        secondsElement.textContent = "00";
        return;
    }

    const totalSeconds = Math.floor(difference / 1000);

    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    daysElement.textContent = days;
    hoursElement.textContent = String(hours).padStart(2, "0");
    minutesElement.textContent = String(minutes).padStart(2, "0");
    secondsElement.textContent = String(seconds).padStart(2, "0");
}

updateLoveCounter();
setInterval(updateLoveCounter, 1000);

/* Choose Your Gift */

const giftCards = document.querySelectorAll(".choose-gift-card");
const giftReveal = document.getElementById("giftReveal");
const giftRevealIcon = document.getElementById("giftRevealIcon");
const giftRevealTitle = document.getElementById("giftRevealTitle");
const giftRevealText = document.getElementById("giftRevealText");
const giftAgainButton = document.getElementById("giftAgainButton");

const giftMessages = {
    letter: {
        icon: "💌",
        title: "رسالة من قلبي ليكي",
        text: "يا مي، يمكن الهدية دي صغيرة، بس معناها كبير عندي.\nأتمنى دايمًا تفضلي مبسوطة، وتلاقي في كل يوم حاجة تخليكي تبتسمي. ❤️"
    },

    hearts: {
        icon: "💖",
        title: "مليون قلب ليكي",
        text: "لو كل قلب بيمثل مرة فكرت فيكي، مش هتكفي كل قلوب الدنيا.\nإنتِ ليكي مكان مميز في حكايتي يا مي. 🥹💕"
    },

    promise: {
        icon: "🌷",
        title: "وعد صغير ليكي",
        text: "أوعدك إني أحاول دايمًا أكون سبب في ضحكتك، وأقدّر التفاصيل الصغيرة اللي بتخلّيكي مميزة.\nوأتمنى اللي جاي يكون مليان ذكريات حلوة لينا. ❤️"
    }
};

giftCards.forEach((card) => {
    card.addEventListener("click", () => {
        const gift = giftMessages[card.dataset.gift];

        if (!gift) return;

        giftRevealIcon.textContent = gift.icon;
        giftRevealTitle.textContent = gift.title;
        giftRevealText.textContent = gift.text;

        giftReveal.hidden = false;

        giftCards.forEach((item) => {
            item.setAttribute("aria-pressed", String(item === card));
        });

        giftReveal.scrollIntoView({
            behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "auto"
                : "smooth",
            block: "center"
        });
    });
});

giftAgainButton.addEventListener("click", () => {
    giftReveal.hidden = true;

    giftCards.forEach((card) => {
        card.setAttribute("aria-pressed", "false");
    });
});

/* Love Quiz */

const loveQuizQuestions = [
    {
        question: "إيه أكتر حاجة بتفرحني؟ ❤️",
        options: [
            "لما أسمع صوتك 😊",
            "لما آكل بيتزا 🍕",
            "لما أنام طول اليوم 😴"
        ],
        answer: 0,
        correct: "بالظبط! صوتك من الحاجات اللي بتفرّحني 💗",
        wrong: "إجابة لطيفة، بس الإجابة اللي في بالي هي صوتك ❤️"
    },
    {
        question: "لو هختار هدية ليكي، هختار إيه؟ 🎁",
        options: [
            "كتاب رياضيات 📚",
            "حاجة تفرّح قلبك 💝",
            "منبّه عشان تصحي بدري ⏰"
        ],
        answer: 1,
        correct: "صح! أهم حاجة عندي أشوفك مبسوطة 🥹",
        wrong: "كنت أتمنى أختار حاجة تخلّيكي تبتسمي 💕"
    },
    {
        question: "إيه أحلى حاجة في حكايتنا؟ 🦋",
        options: [
            "الذكريات الحلوة 💞",
            "عدد الرسائل بس 📱",
            "مين بيكسب في النقاش 😅"
        ],
        answer: 0,
        correct: "بالظبط، الذكريات هي اللي بتخلّي الحكاية مميزة ❤️",
        wrong: "كل تفصيلة حلوة بينا بتستاهل نفتكرها 💗"
    },
    {
        question: "آخر سؤال... إنتِ مميزة عندي قد إيه؟ 💖",
        options: [
            "شوية صغيرين 🌷",
            "على قد الورد كله 🌹",
            "أكتر من الكلام ما يقدر يوصف 🥹"
        ],
        answer: 2,
        correct: "الإجابة الصح! مفيش كلام يوصف مكانتك عندي ❤️",
        wrong: "الإجابة اللي كنت مستنيها: أكتر من الكلام ما يقدر يوصف 💖"
    }
];

const quizQuestion = document.getElementById("quizQuestion");
const quizQuestionNumber = document.getElementById("quizQuestionNumber");
const quizOptions = document.getElementById("quizOptions");
const quizFeedback = document.getElementById("quizFeedback");
const quizProgressBar = document.getElementById("quizProgressBar");
const quizNext = document.getElementById("quizNext");
const quizCard = document.getElementById("quizCard");
const quizResult = document.getElementById("quizResult");
const quizResultText = document.getElementById("quizResultText");
const quizRestart = document.getElementById("quizRestart");

let currentQuizQuestion = 0;
let quizScore = 0;
let quizAnswered = false;

function renderQuizQuestion() {
    const item = loveQuizQuestions[currentQuizQuestion];

    quizAnswered = false;
    quizQuestion.textContent = item.question;

    quizQuestionNumber.textContent =
        `السؤال ${currentQuizQuestion + 1} من ${loveQuizQuestions.length}`;

    quizProgressBar.style.width =
        `${((currentQuizQuestion + 1) / loveQuizQuestions.length) * 100}%`;

    quizFeedback.textContent = "";
    quizNext.hidden = true;
    quizOptions.replaceChildren();

    item.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "quiz-option";
        button.textContent = option;

        button.addEventListener("click", () => {
            if (quizAnswered) return;

            quizAnswered = true;

            const isCorrect = index === item.answer;

            if (isCorrect) {
                quizScore++;
                button.classList.add("correct");
                quizFeedback.textContent = item.correct;
            } else {
                button.classList.add("incorrect");
                quizFeedback.textContent = item.wrong;

                quizOptions.children[item.answer].classList.add("correct");
            }

            Array.from(quizOptions.children).forEach((choice) => {
                choice.disabled = true;
            });

            quizNext.textContent =
                currentQuizQuestion === loveQuizQuestions.length - 1
                    ? "شوفي النتيجة 💖"
                    : "السؤال اللي بعده 💗";

            quizNext.hidden = false;
        });

        quizOptions.appendChild(button);
    });
}

function showQuizResult() {
    quizCard.hidden = true;
    quizResult.hidden = false;

    quizResultText.textContent =
        `جاوبتي صح على ${quizScore} من ${loveQuizQuestions.length} أسئلة! 💕\n\n` +
        "بس في حاجة أهم من كل الإجابات...\n" +
        "إنك مي، ووجودك لوحده حكاية جميلة تستاهل كل الحب. ❤️";
}

quizNext.addEventListener("click", () => {
    if (!quizAnswered) return;

    if (currentQuizQuestion < loveQuizQuestions.length - 1) {
        currentQuizQuestion++;
        renderQuizQuestion();
    } else {
        showQuizResult();
    }
});

quizRestart.addEventListener("click", () => {
    currentQuizQuestion = 0;
    quizScore = 0;

    quizResult.hidden = true;
    quizCard.hidden = false;

    renderQuizQuestion();
});

renderQuizQuestion();

/* Memory Wall Modal */

const memoryCards = document.querySelectorAll(".memory-card");
const memoryModal = document.getElementById("memoryModal");
const memoryModalImage = document.getElementById("memoryModalImage");
const memoryModalCaption = document.getElementById("memoryModalCaption");
const memoryModalClose = document.getElementById("memoryModalClose");

let lastMemoryTrigger = null;

function openMemory(card) {
    lastMemoryTrigger = card;

    memoryModalImage.src = card.dataset.image;
    memoryModalCaption.textContent = card.dataset.caption;

    memoryModal.hidden = false;
    memoryModalClose.focus();
}

function closeMemory() {
    memoryModal.hidden = true;
    memoryModalImage.src = "";

    if (lastMemoryTrigger) {
        lastMemoryTrigger.focus();
    }
}

memoryCards.forEach((card) => {
    card.addEventListener("click", () => {
        openMemory(card);
    });
});

memoryModalClose.addEventListener("click", closeMemory);

memoryModal.addEventListener("click", (event) => {
    if (event.target === memoryModal) {
        closeMemory();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !memoryModal.hidden) {
        closeMemory();
    }
});

/* ===== ROMANTIC FOOTER INTERACTIONS ===== */

const footerLoveBtn = document.getElementById("footerLoveBtn");
const footerHiddenMessage = document.getElementById("footerHiddenMessage");
const footerTopBtn = document.getElementById("footerTopBtn");
const footerYear = document.getElementById("footerYear");

if (footerYear) {
  footerYear.textContent = new Date().getFullYear();
}

if (footerLoveBtn && footerHiddenMessage) {
  footerLoveBtn.addEventListener("click", () => {
    const isOpen = footerHiddenMessage.classList.toggle("show");

    footerLoveBtn.innerHTML = isOpen
      ? "💖 بحبك أوي يا مي"
      : "💌 دوسي هنا يا أجمل حاجة في حياتي";

    footerLoveBtn.setAttribute("aria-expanded", String(isOpen));
  });

  footerLoveBtn.setAttribute("aria-expanded", "false");
}

if (footerTopBtn) {
  footerTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });
}

const translations = {
    en: {
        quran: "Quran",
        favourite: "Favourite",
        share: "Share",
        settings: "Settings",
        theme: "Theme",
        language: "Language",
        search: "Search",
        searchReciter: "Search your reciter",
        surah: "Surah",
        alphabet: "Alphabet",
        ayah: "Ayah",
        juz: "Juz",
        auto: "Auto",
        verses: "Verses",
        verse: "Verse"
    },

    ar: {
        quran: "القرآن الكريم",
        favourite: "المفضلة",
        share: "مشاركة",
        settings: "الإعدادات",
        theme: "المظهر",
        language: "اللغة",
        search: "بحث",
        searchReciter: "ابحث عن القارئ",
        surah: "السورة",
        alphabet: "أبجدي",
        ayah: "الآية",
        juz: "الجزء",
        auto: "تلقائي",
        verses: "آيات",
        verse: "آية"
    },

    es: {
        quran: "Corán",
        favourite: "Favoritos",
        share: "Compartir",
        settings: "Configuración",
        theme: "Tema",
        language: "Idioma",
        search: "Buscar",
        searchReciter: "Buscar recitador",
        surah: "Sura",
        alphabet: "Alfabeto",
        ayah: "Aleya",
        juz: "Yuz",
        auto: "Automático",
        verses: "Versículos",
        verse: "Versículo"
    }
};


const languageSelect = document.getElementById("language-selection")
const supportedLanguages = ["ar", "en", "es"];
const storedLanguage = localStorage.getItem("language");
const savedLanguage = supportedLanguages.includes(storedLanguage)
    ? storedLanguage
    : "en";
languageSelect.value = savedLanguage
const seoTranslations = {
    ar: {
        title: "الفرقان - القرآن الكريم صوتياً",
        description: "استمع إلى القرآن الكريم صوتياً بأصوات أشهر القراء، وابحث عن السور واحفظ تلاواتك المفضلة بسهولة.",
        ogLocale: "ar_AR"
    },
    en: {
        title: "Elforqan - Holy Quran Audio",
        description: "Listen to the Holy Quran online with recitations from well-known reciters, surah search, and favourites.",
        ogLocale: "en_US"
    },
    es: {
        title: "Elforqan - Audio del Sagrado Coran",
        description: "Escucha el Sagrado Coran en linea con recitaciones de reconocidos recitadores y busqueda de suras.",
        ogLocale: "es_ES"
    }
};

function updateSeoMetadata(language) {
    const seo = seoTranslations[language] || seoTranslations.ar;
    document.title = seo.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", seo.description);
    document.querySelector('meta[property="og:title"]')?.setAttribute("content", seo.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute("content", seo.description);
    document.querySelector('meta[property="og:locale"]')?.setAttribute("content", seo.ogLocale);
    document.querySelector('meta[name="twitter:title"]')?.setAttribute("content", seo.title);
    document.querySelector('meta[name="twitter:description"]')?.setAttribute("content", seo.description);
}

function translatePage(language) {
    const texts = translations[language];

    document.querySelectorAll("[data-i18n]").forEach((element) => {
        element.textContent = texts[element.dataset.i18n];
    });

    document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
        element.placeholder = texts[element.dataset.i18nPlaceholder];
    });
    document.querySelectorAll(".num-value, .ayah-count").forEach((element) => {
        if (!element.dataset.rawValue) {
            element.dataset.rawValue = element.textContent.trim();
        }

        const number = Number(element.dataset.rawValue);
        if (Number.isFinite(number)) {
            element.textContent = number.toLocaleString(language === "ar" ? "ar-EG" : "en-US");
        }
        element.style.fontFamily = "sans-serif";
    });
}

document.addEventListener("surahsRendered", () => {
    translatePage(document.documentElement.lang || savedLanguage);
});

function applyLanguage(language) {
    translatePage(language);
    updateSeoMetadata(language);

    const layout = document.getElementById("layout");
    const isArabic = language === "ar";

    layout.dir = isArabic ? "rtl" : "ltr";
    layout.classList.toggle("arabic-layout", isArabic);
    document.documentElement.lang = language;
    document.dispatchEvent(new CustomEvent("languageChanged", { detail: { language } }));

}

languageSelect.addEventListener("change", () => {
    const language = languageSelect.value;
    localStorage.setItem("language", language);
    applyLanguage(language);
});
applyLanguage(savedLanguage)

const searchInp = document.querySelector("input#txt");
const container = document.querySelector("#cards");
const surahCollection = [...document.querySelectorAll("#cards .surah")];

let likedSurah;
let likedSection = document.querySelector("ul#sections #like-section");
let searchFrame = 0;

try {
    likedSurah = JSON.parse(localStorage.getItem("liked") || "null");
} catch {
    likedSurah = null;
}

document.addEventListener("likedChanged", (event) => {
    likedSurah = { liked: Array.isArray(event.detail?.liked) ? event.detail.liked : [] };
});

function normalizeArabic(text) {
    return text
        .normalize("NFKC")
        .replace(/[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED\u0640]/g, "")
        .replace(/[أإآٱ]/g, "ا")
        .replace(/ى/g, "ي")
        .replace(/ة/g, "ه")
        .replace(/ؤ/g, "و")
        .replace(/ئ/g, "ي")
        .replace(/[^\p{L}\p{N}]/gu, "")
        .toLowerCase();
}

function getSearchQuery() {
    const isArabic = localStorage.getItem("language") === "ar";
    return isArabic
        ? normalizeArabic(searchInp.value)
        : searchInp.value.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
}

function search(collection) {
    const isArabic = localStorage.getItem("language") === "ar";
    const searchLetters = getSearchQuery();
    const nameSelector = isArabic ? ".arabic-name" : ".surah-name";

    collection.forEach((surah) => {
        const name = surah.querySelector(nameSelector).textContent;
        const normalizedName = isArabic
            ? normalizeArabic(name)
            : name.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");

        surah.classList.toggle("hidden", !normalizedName.includes(searchLetters));
    });
}

function matchesSearch(surah) {
    const isArabic = localStorage.getItem("language") === "ar";
    const searchLetters = getSearchQuery();
    const nameElement = surah.querySelector(isArabic ? ".arabic-name" : ".surah-name");
    if (!nameElement) return false;

    const name = nameElement.textContent;
    const normalizedName = isArabic
        ? normalizeArabic(name)
        : name.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");

    return normalizedName.includes(searchLetters);
}

function searchJuzContainers() {
    const juzFilter = document.querySelector("#filter > #juz.active-filter");
    if (!juzFilter) return false;

    document.querySelectorAll(".juz-container").forEach((juzContainer) => {
        let hasResults = false;

        juzContainer.querySelectorAll(".surah").forEach((surah) => {
            const matches = matchesSearch(surah);
            surah.classList.toggle("hidden", !matches);
            hasResults ||= matches;
        });

        juzContainer.classList.toggle("hidden", !hasResults);
    });

    return true;
}

function getLikedCollection() {
    if (!likedSurah || !likedSurah.liked) return [];
    const likedIds = new Set(likedSurah.liked);
    return surahCollection.filter((surah) => likedIds.has(surah.id));
}

function runSearch() {
    if (searchJuzContainers()) return;

    if (likedSection.classList.contains("active-section")) {
        surahCollection.forEach((surah) => surah.classList.add("hidden"));
        search(getLikedCollection());
        return;
    }

    search(surahCollection);
}

searchInp.addEventListener("input", () => {
    cancelAnimationFrame(searchFrame);
    searchFrame = requestAnimationFrame(runSearch);
});

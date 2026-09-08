const searchInp = document.querySelector("input#txt");
const surahSelection = document.querySelectorAll("#cards .surah");
const container = document.querySelector("#cards");
const surahCollection = [...surahSelection];

let likedSurah;
let likedSection = document.querySelector("ul#sections #like-section");

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

// Return the collection but with identical to search bar
function search(collection) {
    const isArabic = localStorage.getItem("language") === "ar";
    const searchLetters = isArabic
        ? normalizeArabic(searchInp.value)
        : searchInp.value.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");

    collection.forEach((surah) => {
        const name = surah.querySelector(isArabic ? ".arabic-name" : ".surah-name").textContent;
        const normalizedName = isArabic
            ? normalizeArabic(name)
            : name.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");

        surah.parentElement.style.display = normalizedName.includes(searchLetters)
            ? "block"
            : "none";

    });
}

function matchesSearch(surah) {
    const isArabic = localStorage.getItem("language") === "ar";
    const searchLetters = isArabic
        ? normalizeArabic(searchInp.value)
        : searchInp.value.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "");
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

    // Rebuild the groups so a container removed by the previous query can return.
    juzFilter.click();

    document.querySelectorAll(".juz-container").forEach((juzContainer) => {
        let hasResults = false;

        juzContainer.querySelectorAll(".surah").forEach((surah) => {
            const matches = matchesSearch(surah);
            surah.style.display = matches ? "" : "none";
            surah.parentElement.style.display = matches ? "" : "none";
            hasResults ||= matches;
        });

        if (!hasResults) {
            juzContainer.remove();
        }
    });

    return true;
}

// Getting the liked surah from the local storage
function getLikedCollection() {
    if (!likedSurah || !likedSurah.liked) return [];
    let likedCollection = [];
    likedSurah.liked.forEach((e) => {
        let surah = container.querySelector(`#${e}`);
        if (surah) {
            likedCollection.push(surah);
            if (surah.style.display == "none") {
            }
        }
    });

    return likedCollection;
}

// Search input on TYPING
searchInp.addEventListener("input", () => {
    if (searchJuzContainers()) return;

    // If the liked section is active
    if (likedSection.classList.contains("active-section")) {
        // Hide all the elemnts from the container
        surahCollection.forEach((surah) => {
            surah.parentElement.style.display = "none"
        });
        let likedCollection = getLikedCollection();
        // Show only Liked elements , (AND THERE SEARCH RESULT OR WITHOUT THE SEARCH RESULT  * SO IT WORKED AS NORMAL ELEMNT DONT WORK UNTIL THERE IS VALUE IN SEARCH BAR*)
        search(likedCollection)
    } else {
        // Show the collection in normal mode
        search(surahCollection);
    }
});


/*
    THE SEARCH FUNCTION WAS BUILT TO RESORTING THE COLLECTIONS
    AND MAKE IT EASY FOR USER TO FIND WHAT HE WANTS QUICKLY
    AND ITS VERY IMPORTANT WITH THAT BIG NUMBER OF QURAN SUARH
    IT WORK WITH THE MAIN SECTION AND LIKED SECTION AND FILTERS
*/
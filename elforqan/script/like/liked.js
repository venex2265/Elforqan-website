// Identify the main varaible of OBJ AND ARR

const surahCollection = [...document.querySelectorAll("#cards .surah")];

function getStoredLikedSurahs() {
    try {
        const saved = JSON.parse(localStorage.getItem("liked") || "{}") || {};

        if (Array.isArray(saved)) {
            return saved.filter(Boolean).map(String);
        }

        if (Array.isArray(saved.liked)) {
            return saved.liked.filter(Boolean).map(String);
        }
    } catch (error) {
        console.warn("Liked data could not be parsed:", error);
    }

    return [];
}

let containerObj = { liked: getStoredLikedSurahs() };
let likedSurah = new Set(containerObj.liked);

document.addEventListener("likedChanged", (event) => {
    const liked = Array.isArray(event.detail?.liked) ? event.detail.liked : [];
    likedSurah = new Set(liked);
    containerObj.liked = liked;
});

// Store the liked in the localStorage 

function storeLiked() {
    let data = [...likedSurah];
    containerObj.liked = data;
    localStorage.setItem("liked", JSON.stringify(containerObj));
    document.dispatchEvent(new CustomEvent("likedChanged", {
        detail: { liked: data }
    }));
}

function syncSurahLikeButton(likeBtn, isLiked) {
    likeBtn.classList.toggle("active-like", isLiked);
    likeBtn.classList.toggle("liked", isLiked);
}

// Add and delete items from the localStorage according to mouse click

surahCollection.forEach((surah) => {
    let likeBtn = surah.querySelector(".like");
    if (likeBtn) {
        syncSurahLikeButton(likeBtn, likedSurah.has(surah.id));

        likeBtn.addEventListener("click", () => {
            const isLiked = likedSurah.has(surah.id);

            if (isLiked) {
                likedSurah.delete(surah.id);
            } else {
                likedSurah.add(surah.id);
            }

            syncSurahLikeButton(likeBtn, likedSurah.has(surah.id));
            storeLiked();
        });
    }
});

// adding active class list to element that exist in localStorage (LIKED ELEMENT)

likedSurah.forEach((surahId) => {
    let element = document.getElementById(`${surahId}`);
    if (element) {
        let likeBtn = element.querySelector(".like");

        if (likeBtn) {
            syncSurahLikeButton(likeBtn, true);
        }
    }
});

// Add class list to home and like section

let sections = document.querySelectorAll("ul#sections li, #settings-card")
document.querySelector(".reading")?.classList.add("active-section")

sections.forEach((section) => {

    section.addEventListener("click", () => {
        // Remove classes from all element
        sections.forEach((section) => {
            section.classList.remove("active-section")
        })
        // Add class to the specific element
        section.classList.add("active-section")
    })
})
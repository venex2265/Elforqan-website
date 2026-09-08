let defaultReciter = "https://server8.mp3quran.net/afs/";
let currentReciter = defaultReciter;
let currentSurah;
let playeingAudio = new Audio();
let overlay = document.querySelector(".overlay")

let playPauseBtn = document.getElementById("play-pause-btn")

let currentSurahName = document.getElementById("current-surah-name");
let currentReciterName = document.getElementById("current-reciter-name");
let currentReciterImage = document.querySelector("#current-surah .reciter-image img");

let reciterMenuBtn = document.getElementById("reciter-menu")
let openingMenu = document.getElementById("opening-menu")
let reciterContainer = openingMenu.parentElement
let layout = document.getElementById("layout")
let modeify = document.querySelector(".modeify")
let headerSettingsBtn = document.querySelector("header .settings")
let compactScreen = window.matchMedia("(max-width: 1180px)")
let mobMenu = document.querySelector(".mob-menu")
let activity = document.querySelector(".activity")

mobMenu?.addEventListener("click", (event) => {
    event.stopPropagation()
    const isActive = activity?.classList.toggle("active")
    mobMenu.classList.toggle("active", isActive)
})

document.addEventListener("click", (event) => {
    if (!event.target.closest(".mob-menu") && !event.target.closest(".activity")) {
        activity?.classList.remove("active")
        mobMenu?.classList.remove("active")
    }
})

function setOpeningMenuState(isOpen) {
    if (isOpen && compactScreen.matches) {
        layout.appendChild(openingMenu)
        openingMenu.classList.add("compact-opening-menu")
    } else if (!isOpen && openingMenu.parentElement !== reciterContainer) {
        reciterContainer.appendChild(openingMenu)
        openingMenu.classList.remove("compact-opening-menu")
    }
    openingMenu.classList.toggle("active", isOpen)
    overlay.classList.toggle("disaple", isOpen)
    modeify.classList.toggle("reciter-open", isOpen)
}

reciterMenuBtn.addEventListener("click", () => {
    if (compactScreen.matches) return
    setOpeningMenuState(!openingMenu.classList.contains("active"))
})

headerSettingsBtn?.addEventListener("click", () => {
    if (!compactScreen.matches) return
    setOpeningMenuState(!openingMenu.classList.contains("active"))
})

function closeOpeningMenu() {
    setOpeningMenuState(false)
}

compactScreen.addEventListener("change", closeOpeningMenu)

function getReciterCards() {
    return Array.from(document.querySelectorAll("#reciter-box > div"));
}

function updateDeatails() {
    const currentPlayedReciter = getReciterCards().find(card => card.dataset.server === currentReciter);

    if (!currentPlayedReciter) return;
    const currentPlayedSurah = currentSurah
        ? document.getElementById(`surah${Number(currentSurah)}`)?.querySelector(".surah-name")?.textContent
        : currentSurahName?.textContent || "Al-Fatihah";

    const currentPlayedReciterName = currentPlayedReciter.querySelector(".reciter-name")?.textContent || "Mishary Rashid Alafasy";
    const reciterImgSrc = currentPlayedReciter.querySelector("img")?.src || "images/reciter/mishary_rashid_alafasy.webp";

    currentSurahName.textContent = currentPlayedSurah;
    currentReciterName.textContent = currentPlayedReciterName;
    reciterMenuBtn.querySelector(".reciter-name").textContent = currentPlayedReciterName;
    reciterMenuBtn.querySelector(".image img").src = reciterImgSrc;
    if (localStorage.getItem("language") == "ar") {
        function getPlainArabicName(name) {
            return name.replace(/[\u064B-\u065F\u0670]/g, "").replace(/ٱ/g, "ا").replace(/ة/g, "ه");
        }
        const currentPlayedSurah = currentSurah
            ? `سورة ${document.getElementById(`surah${Number(currentSurah)}`)?.querySelector(".arabic-name")?.textContent}`
            : `سورة ${"الفاتحه"}`
        const currentPlayedReciterName = currentPlayedReciter.querySelector(".reciter-arabic-name")?.textContent || "مشاري راشد العفاسي";

        currentSurahName.textContent = getPlainArabicName(currentPlayedSurah);
        currentReciterName.textContent = currentPlayedReciterName;
        reciterMenuBtn.querySelector(".reciter-name").textContent = currentPlayedReciterName;
        reciterMenuBtn.querySelector(".image img").src = reciterImgSrc;
        let currentReadingType = document.getElementById("current-reading-type")
        currentReadingType.textContent = "مرتل"
        let readingtype = document.querySelectorAll("#reciter-reading-type")
        readingtype.forEach((e) => {
            e.textContent = "مرتل"
        })
    } else {
        let currentReadingType = document.getElementById("current-reading-type")
        currentReadingType.textContent = "Murattal"
        let readingtype = document.querySelectorAll("#reciter-reading-type")
        readingtype.forEach((e) => {
            e.textContent = "Murattal"
        })
    }
    if (currentReciterImage && reciterImgSrc) {
        currentReciterImage.src = reciterImgSrc;
    }
}

document.addEventListener("languageChanged", updateDeatails);

document.addEventListener("click", (event) => {
    const card = event.target.closest("#reciter-box > div");
    if (card) {
        getReciterCards().forEach((c) => c.classList.toggle("active", c === card));
        currentReciter = card.dataset.server || defaultReciter;
        closeOpeningMenu();
        if (currentSurah) {
            playeingAudio.src = generateUrl();
            playCurrentAudio();
        }
        updateDeatails();
        return;
    }

    if (event.target === overlay || (!event.target.closest(".reciter") && !event.target.closest("#reciter-menu") && !event.target.closest("header .settings"))) {
        closeOpeningMenu();
    }
});

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

function syncControllerLikeButton() {
    if (!currentSurah) {
        likedBtn.classList.remove("liked");
        return;
    }

    const selectedSurahId = `surah${Number(currentSurah)}`;
    const isLiked = getStoredLikedSurahs().includes(selectedSurahId);
    likedBtn.classList.toggle("liked", isLiked);

    const surahCardLikeBtn = document.getElementById(selectedSurahId)?.querySelector(".like");
    if (surahCardLikeBtn) {
        surahCardLikeBtn.classList.toggle("active-like", isLiked);
        surahCardLikeBtn.classList.toggle("liked", isLiked);
    }
}

// Surah click, delegated so dynamically cloned cards work too
const cardsContainer = document.getElementById("cards");
cardsContainer.addEventListener("click", (event) => {
    const surahElement = event.target.closest(".surah");
    if (!surahElement || !cardsContainer.contains(surahElement)) return;

    document.querySelectorAll("#cards .surah").forEach((surah) => {
        surah.classList.remove("active");
    });
    surahElement.classList.add("active");

    const numberText = surahElement.querySelector(".number")?.textContent || surahElement.id.replace("surah", "");

    currentSurah = String(numberText).trim().padStart(3, "0");
    syncControllerLikeButton();
    playeingAudio.src = generateUrl();
    playPauseBtn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-pause-icon lucide-pause"><rect x="14" y="3" width="5" height="18" rx="1"/><rect x="5" y="3" width="5" height="18" rx="1"/></svg>`;
    playPauseBtn.classList.add("played");
    playCurrentAudio();
    updateDeatails();
});

function generateUrl() {
    return `${currentReciter}${currentSurah}.mp3`;
}

function playCurrentAudio() {
    playeingAudio.play().catch((error) => {
        console.warn("Audio playback failed:", error);
    });
}

// PLAYER

// VOLUME
let volumeRange = document.getElementById("volume-range")
let volumeIcon = document.getElementById("volume-icon")
let lastVolume = Number(volumeRange.value) || 100

function updateVolumeIcon(volumeValue) {
    volumeValue = Number(volumeValue) || 0

    if (volumeValue === 0) {
        volumeIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume-x-icon lucide-volume-x"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><line x1="22" x2="16" y1="9" y2="15"/><line x1="16" x2="22" y1="9" y2="15"/></svg>`
        return
    }

    if (volumeValue <= 15) {
        volumeIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume-icon lucide-volume"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/></svg>`
        return
    }
    if (volumeValue <= 60) {
        volumeIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume1-icon lucide-volume-1"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"/><path d="M16 9a5 5 0 0 1 0 6"/></svg>`
        return
    }


    volumeIcon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-volume2-icon lucide-volume-2"><path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" /><path d="M16 9a5 5 0 0 1 0 6" /><path d="M19.364 18.364a9 9 0 0 0 0-12.728" /></svg>`
}

updateVolumeIcon(volumeRange.value)

volumeIcon.addEventListener("click", () => {
    const currentVolume = Number(volumeRange.value)

    if (currentVolume > 0) {
        lastVolume = currentVolume
        volumeRange.value = 0
        playeingAudio.volume = 0
    } else {
        const restoredVolume = lastVolume > 0 ? lastVolume : 100
        volumeRange.value = restoredVolume
        playeingAudio.volume = restoredVolume / 100
    }

    updateVolumeIcon(volumeRange.value)
})

volumeRange.addEventListener("input", () => {
    let volumeValue = Number(volumeRange.value)
    playeingAudio.volume = (volumeValue / 100)

    if (volumeValue > 0) {
        lastVolume = volumeValue
    }

    updateVolumeIcon(volumeValue)
})

// SLIDER

const playIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"/></svg>`;

const pauseIcon = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="14" y="3" width="5" height="18" rx="1"/><rect x="5" y="3" width="5" height="18" rx="1"/></svg>`;

function updatePlayButton() {
    const isPlaying = !playeingAudio.paused && !playeingAudio.ended;


    playPauseBtn.innerHTML = isPlaying ? pauseIcon : playIcon;
    playPauseBtn.classList.toggle("played", isPlaying);
}

playPauseBtn.addEventListener("click", async () => {
    if (!currentSurah) return;

    try {
        if (playeingAudio.paused) {
            await playeingAudio.play();
        } else {
            playeingAudio.pause();
        }

        updatePlayButton();
    } catch (error) {
        console.error("Audio playback failed:", error);
    }
});

playeingAudio.addEventListener("play", updatePlayButton);
playeingAudio.addEventListener("pause", updatePlayButton);
playeingAudio.addEventListener("ended", updatePlayButton);

// SLIDER

let progress = document.getElementById("prograss-range")
let passedTime = document.getElementById("passed-time");
let remainingTime = document.getElementById("remaining-time");
progress.max = 1000





function formatTime(timeInSeconds) {
    if (isNaN(timeInSeconds)) return "00:00";
    let seconds = Math.floor(timeInSeconds % 60);
    let minutes = Math.floor((timeInSeconds / 60) % 60);
    let hours = Math.floor(timeInSeconds / 3600);

    let formattedMinutes = minutes < 10 ? "0" + minutes : minutes;
    let formattedSeconds = seconds < 10 ? "0" + seconds : seconds;

    return hours ? `${hours}:${formattedMinutes}:${formattedSeconds}` : `${formattedMinutes}:${formattedSeconds}`;
}

function updateProgress() {
    passedTime.textContent = formatTime(playeingAudio.currentTime);
    let timeLeft = playeingAudio.duration - playeingAudio.currentTime;
    remainingTime.textContent = formatTime(timeLeft);

    if (playeingAudio.duration) {
        progress.value = ((playeingAudio.currentTime / playeingAudio.duration) * 1000);
    }
}

playeingAudio.addEventListener("timeupdate", updateProgress);
playeingAudio.addEventListener("loadedmetadata", updateProgress);
updateProgress();

progress.addEventListener("input", () => {
    let nowTime = (progress.value / 1000) * playeingAudio.duration;
    playeingAudio.currentTime = nowTime;
})


// NEXT & PREV
let prevSurah = document.getElementById("prev-surah")
let nextSurah = document.getElementById("next-surah")

function getPlaybackSurahIds() {
    const likedSection = document.getElementById("like-section");
    if (!likedSection?.classList.contains("active-section")) {
        return Array.from({ length: 114 }, (_, index) => `surah${index + 1}`);
    }

    const likedIds = new Set(getStoredLikedSurahs());
    const visibleSurahs = Array.from(cardsContainer.querySelectorAll(".surah"))
        .filter((surah) => {
            const isClone = surah.closest(".juz-clone");
            const isVisible = getComputedStyle(surah).display !== "none"
                && getComputedStyle(surah.parentElement).display !== "none";
            return !isClone && isVisible && likedIds.has(surah.id);
        });

    const visibleIds = visibleSurahs.map((surah) => surah.id);
    return visibleIds.length
        ? visibleIds
        : getStoredLikedSurahs().filter((surahId) => document.getElementById(surahId));
}

function getAdjacentSurah(step) {
    const playbackIds = getPlaybackSurahIds();
    const currentId = `surah${Number(currentSurah)}`;
    const currentIndex = playbackIds.indexOf(currentId);
    const adjacentId = playbackIds[currentIndex + step];

    return adjacentId ? adjacentId.replace("surah", "").padStart(3, "0") : null;
}

function playSurah(surahNumber) {
    currentSurah = String(surahNumber).padStart(3, "0");
    playeingAudio.src = `${currentReciter}${currentSurah}.mp3`;
    playCurrentAudio();
    updateDeatails();
    syncControllerLikeButton();

    document.querySelectorAll("#cards .surah").forEach((surah) => {
        surah.classList.toggle("active", surah.id === `surah${Number(currentSurah)}`);
    });
}

prevSurah.addEventListener("click", () => {
    if (!currentSurah) return;
    const previousSurah = getAdjacentSurah(-1);
    if (previousSurah) playSurah(previousSurah);
});

nextSurah.addEventListener("click", () => {
    if (!currentSurah) return;
    const nextSurahNumber = getAdjacentSurah(1);
    if (nextSurahNumber) playSurah(nextSurahNumber);
});

// REPEAT
let repeatBtn = document.getElementById("repeat-btn")
repeatBtn.addEventListener("click", () => {
    repeatBtn.classList.toggle("active")
    playeingAudio.loop = !playeingAudio.loop
})

playeingAudio.addEventListener("ended", () => {
    if (repeatBtn.classList.contains("active")) {

    } else {
        const nextSurahNumber = getAdjacentSurah(1);
        if (nextSurahNumber) playSurah(nextSurahNumber);
    }
})
// LIKED BTN
let likedBtn = document.getElementById("like-btn")

likedBtn.addEventListener("click", () => {
    if (!currentSurah) return;

    const surahDiv = document.getElementById(`surah${Number(currentSurah)}`);
    if (!surahDiv) return;

    const surahId = surahDiv.id;
    const likedSurahs = new Set(getStoredLikedSurahs());
    const isLiked = likedSurahs.has(surahId);


    if (isLiked) {
        likedSurahs.delete(surahId);
    } else {
        likedSurahs.add(surahId);
    }

    localStorage.setItem("liked", JSON.stringify({ liked: [...likedSurahs] }));
    document.dispatchEvent(new CustomEvent("likedChanged", {
        detail: { liked: [...likedSurahs] }
    }));

    const cardLikeBtn = surahDiv.querySelector(".like");
    if (cardLikeBtn) {
        cardLikeBtn.classList.toggle("active-like", !isLiked);
        cardLikeBtn.classList.toggle("liked", !isLiked);
    }


    likedBtn.classList.toggle("liked", !isLiked);
});

// Download

let downloadBtn = document.getElementById("download-btn")
let downloadInProgress = false;
downloadBtn.addEventListener("click", async () => {
    if (!currentSurah || downloadInProgress) return;

    downloadInProgress = true;
    try {
        const response = await fetch(generateUrl());
        if (!response.ok) throw new Error(`Audio request failed: ${response.status}`);

        const url = window.URL.createObjectURL(await response.blob());
        const link = document.createElement("a");
        link.href = url;
        link.download = `${currentSurahName.textContent || "surah"}-${currentReciterName.textContent}.mp3`;
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.setTimeout(() => window.URL.revokeObjectURL(url), 0);
    } catch (error) {
        console.warn("Download failed:", error);
        alert("Download failed!");
    } finally {
        downloadInProgress = false;
    }
})

// ------------- Main variables ------------- //

const container = document.querySelector("#cards");
const surahCollection = container ? container.querySelectorAll(".surah") : [];
const surahContainer = [...surahCollection];
let allSection = document.querySelectorAll("#filter > div");
let likedSurah;
let likedSection = document.querySelector("ul#sections #like-section");

try {
  likedSurah = JSON.parse(localStorage.getItem("liked") || "null");
} catch {
  likedSurah = null;
}

document.addEventListener("likedChanged", (event) => {
  likedSurah = { liked: Array.isArray(event.detail?.liked) ? event.detail.liked : [] };

  if (likedSection?.classList.contains("active-section")) {
    setTimeout(reApplyActiveFilter, 0);
  }
});

function setCardHidden(node, isHidden) {
  node?.classList.toggle("hidden", isHidden);
}

function appendInOrder(nodes) {
  const fragment = document.createDocumentFragment();
  nodes.forEach((node) => {
    setCardHidden(node, false);
    fragment.appendChild(node);
  });
  container.appendChild(fragment);
}

function removeOldJuz() {
  let oldContainers = document.querySelectorAll(".juz-container");
  oldContainers.forEach((old) => {
    Array.from(old.children).forEach((child) => {
      if (child.classList.contains("juz-name") || child.classList.contains("juz-clone")) {
        child.remove();
      } else {
        container.appendChild(child);
      }
    });
    old.remove();
  });
}

function putActiveClass(section) {
  allSection.forEach((item) => {
    item.classList.remove("active-filter");
  });
  section.classList.add("active-filter");
}

function getLikedCollection() {
  if (!likedSurah || !likedSurah.liked) return [];
  const likedIds = new Set(likedSurah.liked);

  return surahContainer.filter((element) => {
    const isLiked = likedIds.has(element.id);
    setCardHidden(element, !isLiked);
    return isLiked;
  });
}

function getSurahNode(node) {
  if (!node) return null;
  return node.matches && node.matches(".surah") ? node : node.querySelector(".surah");
}

const alphabeticBtn = document.getElementById("alphabet");

function ascending(collection) {
  if (localStorage.getItem("language") === "ar") {
    return [...collection].sort((a, b) => {
      const nameA = a.querySelector(".arabic-name").textContent;
      const nameB = b.querySelector(".arabic-name").textContent;
      return nameA.localeCompare(nameB, "ar");
    });
  }

  return [...collection].sort((a, b) => {
    const nameA = a.querySelector(".surah-name").textContent;
    const nameB = b.querySelector(".surah-name").textContent;
    return nameA.localeCompare(nameB, "en");
  });
}

alphabeticBtn.addEventListener("click", () => {
  removeOldJuz();
  putActiveClass(alphabeticBtn);

  if (likedSection.classList.contains("active-section")) {
    appendInOrder(ascending(getLikedCollection()));
    return;
  }

  surahContainer.forEach((element) => setCardHidden(element, true));
  appendInOrder(ascending(surahContainer));
});

let serialBtn = document.getElementById("serial");
serialBtn.classList.add("active-filter")

function serial(collection) {
  return [...collection].sort((a, b) => {
    const aSurah = getSurahNode(a);
    const bSurah = getSurahNode(b);
    return Number(aSurah?.id.replace("surah", "")) - Number(bSurah?.id.replace("surah", ""));
  });
}

serialBtn.addEventListener("click", () => {
  removeOldJuz();
  putActiveClass(serialBtn);

  if (likedSection.classList.contains("active-section")) {
    appendInOrder(serial(getLikedCollection()));
    return;
  }

  surahContainer.forEach((element) => setCardHidden(element, true));
  appendInOrder(serial(surahContainer));
});

function ayah(collection) {
  return [...collection].sort((a, b) => {
    const aSurah = getSurahNode(a);
    const bSurah = getSurahNode(b);
    const datasetA = Number(aSurah?.dataset?.ayah || 0);
    const datasetB = Number(bSurah?.dataset?.ayah || 0);
    return datasetB - datasetA;
  });
}

let ayahBtn = document.querySelector("#filter > #ayah");
ayahBtn.addEventListener("click", () => {
  removeOldJuz();
  putActiveClass(ayahBtn);

  if (likedSection.classList.contains("active-section")) {
    appendInOrder(ayah(getLikedCollection()));
    return;
  }

  surahContainer.forEach((element) => setCardHidden(element, true));
  appendInOrder(ayah(surahContainer));
});

function juz(collection) {
  return [...collection].sort((a, b) => {
    const aSurah = getSurahNode(a);
    const bSurah = getSurahNode(b);
    const getFirstJuz = (node) => {
      const juzStr = node?.dataset?.juz || "0";
      return Number(juzStr.split(",")[0]);
    };

    return getFirstJuz(aSurah) - getFirstJuz(bSurah);
  });
}

let juzBtn = document.querySelector("#filter #juz");
juzBtn.addEventListener("click", () => {
  removeOldJuz();
  putActiveClass(juzBtn);

  const visibleCards = likedSection?.classList.contains("active-section")
    ? getLikedCollection()
    : surahContainer;

  surahContainer.forEach((surah) => setCardHidden(surah, true));

  const groupedByJuz = new Map();
  const fragment = document.createDocumentFragment();

  juz(visibleCards).forEach((card) => {
    const surahNode = getSurahNode(card);
    if (!surahNode) return;

    const juzList = surahNode.dataset.juz ? surahNode.dataset.juz.split(",") : ["0"];

    juzList.forEach((surahJuz) => {
      const cleanJuz = surahJuz.trim();

      if (!groupedByJuz.has(cleanJuz)) {
        const juzContainer = document.createElement("div");
        juzContainer.classList.add("juz-container");
        const juzName = document.createElement("span");
        juzName.classList.add("juz-name");
        const juzLabel = localStorage.getItem("language") === "ar" ? "الجزء" : "Juz";
        juzName.textContent = `${juzLabel} ${cleanJuz}`;
        juzContainer.appendChild(juzName);
        fragment.appendChild(juzContainer);
        groupedByJuz.set(cleanJuz, juzContainer);
      }

      const cardToAppend = juzList.length > 1 ? card.cloneNode(true) : card;
      if (juzList.length > 1) {
        cardToAppend.classList.add("juz-clone");
        cardToAppend.dataset.surahId = surahNode.id;
        cardToAppend.removeAttribute("id");
      }
      setCardHidden(cardToAppend, false);
      groupedByJuz.get(cleanJuz).appendChild(cardToAppend);
    });
  });

  container.appendChild(fragment);
});

function reApplyActiveFilter() {
  const activeFilter = document.querySelector("#filter > div.active-filter");
  if (activeFilter) {
    activeFilter.click();
  }
}

document.addEventListener("languageChanged", () => {
  const activeFilter = document.querySelector("#filter > div.active-filter");
  if (activeFilter === alphabeticBtn || activeFilter === juzBtn) {
    reApplyActiveFilter();
  }
});

const mainSectionBtn = document.querySelector("ul#sections #main-section");
if (mainSectionBtn) {
  mainSectionBtn.addEventListener("click", () => {
    setTimeout(reApplyActiveFilter, 10);
  });
}
if (likedSection) {
  likedSection.addEventListener("click", () => {
    setTimeout(reApplyActiveFilter, 10);
  });
}

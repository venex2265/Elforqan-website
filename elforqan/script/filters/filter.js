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

// Global variable to help with clear
// Removing old Juz container from the rest filters
function removeOldJuz() {
  let oldContainers = document.querySelectorAll(".juz-container");
  // Restore original cards and remove temporary Juz-only elements.
  oldContainers.forEach((old) => {
    Array.from(old.children).forEach((child) => {
      if (child.classList.contains("juz-name") || child.classList.contains("juz-clone")) {
        child.remove();
      } else {
        container.appendChild(child);
      }
    });
    old.remove(); // Delete the juz containers  
  });
}

// Active class 
function putActiveClass(section) {
  // Remove active class from every section
  allSection.forEach((section) => {
    section.classList.remove("active-filter");
  });
  // Add active class to the selected section
  section.classList.add("active-filter");
}

// Get the liked collection (FROM LOCAL STORAGE)
function getLikedCollection() {
  // Make sure liked surah already exist to prevent errors !!
  if (!likedSurah || !likedSurah.liked) return [];
  let likedCollection = [];

  // Hide all container content ( SURAHS )
  surahContainer.forEach((element) => {
    element.parentElement.style.display = "none";
  });
  // Add liked Surah from the (LOCAL STORAGE) to the array
  likedSurah.liked.forEach((e) => {
    let surah = container.querySelector(`#${e}`);
    if (surah) {
      likedCollection.push(surah.parentElement);
    }
  });
  return likedCollection;
}

function getSurahNode(node) {
  if (!node) return null;
  return node.matches && node.matches(".surah") ? node : node.querySelector(".surah");
}

// ------------- THE ALPHABETIC FILTER ------------- //

const alphabeticBtn = document.getElementById("alphabet");

// Sorting the parameter (ANY COLLECTION) ascendingly
function ascending(collection) {
  if (localStorage.getItem("language") === "ar") {
    return [...collection].sort((a, b) => {
      const nameA = a.querySelector(".arabic-name").textContent;
      const nameB = b.querySelector(".arabic-name").textContent;
      return nameA.localeCompare(nameB, "ar");
    });
  } else {
    return [...collection].sort((a, b) => {
      const nameA = a.querySelector(".surah-name").textContent;
      const nameB = b.querySelector(".surah-name").textContent;
      return nameA.localeCompare(nameB, "en");
    });
  }

}

alphabeticBtn.addEventListener("click", () => {
  removeOldJuz();
  putActiveClass(alphabeticBtn);

  // If the active section is opened
  if (likedSection.classList.contains("active-section")) {

    let likedCollection = getLikedCollection();
    ascending(likedCollection).forEach((e) => {
      e.style.display = "block"; // Show the only liked surahs
      container.appendChild(e); // Change the look instant
    });
  }
  // If the Main section opened 
  else {
    surahContainer.forEach((element) => {
      element.parentElement.style.display = "none"; // Hide the current collection
    });

    ascending(surahContainer).forEach((e) => {
      e.parentElement.style.display = "block"; // Show the sorted collection
      container.appendChild(e.parentElement);
    });
  }
});

// ------------- THE SERIAL FILTER ------------- //

let serialBtn = document.getElementById("serial");
serialBtn.classList.add("active-filter")
// Sort the collection according to the normal state
function serial(collection) {
  return [...collection].sort((a, b) => {
    const aSurah = getSurahNode(a);
    const bSurah = getSurahNode(b);
    return surahContainer.indexOf(aSurah) - surahContainer.indexOf(bSurah);
  });
}

serialBtn.addEventListener("click", () => {
  removeOldJuz();
  putActiveClass(serialBtn);

  // If the active section is opened
  if (likedSection.classList.contains("active-section")) {
    let likedCollection = getLikedCollection();

    serial(likedCollection).forEach((e) => {
      e.style.display = "block";
      container.appendChild(e); // Change the look instant
    });
  }
  // If the Main section opened 
  else {
    let divcontainer = document.querySelectorAll("#cards > div");
    divcontainer.forEach((oldSurah) => {
      oldSurah.style.display = "none";
    });
    serial(surahContainer).forEach((newSurah) => {
      let parent = newSurah.parentElement;
      parent.style.display = "block";
      container.appendChild(parent);
    });
  }
});

// ------------- THE AYAH FILTER ------------- //

// Sorting the collection according to number of ayah
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
  // If the active section is opened
  if (likedSection.classList.contains("active-section")) {
    let likedCollection = getLikedCollection();

    // show only liked surah
    ayah(likedCollection).forEach((e) => {
      e.style.display = "block";
      container.appendChild(e);
    });
  }
  // If the Main section opened 
  else {
    // Hide the main collection
    surahContainer.forEach((element) => {
      element.parentElement.style.display = "none";
    });
    // Show the sorted collection (AYAH SORTING)
    ayah(surahContainer).forEach((e) => {
      e.parentElement.style.display = "block";
      container.appendChild(e.parentElement);
    });
  }
});

// ------------- THE JUZ FILTER ------------- //

// Sorting collection according to juz number
// 1. تعديل دالة الترتيب (Sorting) بناءً على أول جزء تبدأ منه السورة
function juz(collection) {
  return [...collection].sort((a, b) => {
    const aSurah = getSurahNode(a);
    const bSurah = getSurahNode(b);

    // استخراج الرقم الأول فقط من القائمة (مثلاً لو كانت "1,2" نأخذ 1)
    const getFirstJuz = (node) => {
      const juzStr = node?.dataset?.juz || "0";
      return Number(juzStr.split(",")[0]);
    };

    return getFirstJuz(aSurah) - getFirstJuz(bSurah);
  });
}

// 2. تعديل مستمع الحدث (Event Listener) لتكرار كرت السورة إذا كانت تنتمي لأكثر من جزء
let juzBtn = document.querySelector("#filter #juz");
juzBtn.addEventListener("click", () => {
  removeOldJuz();
  putActiveClass(juzBtn);

  const visibleCards = likedSection?.classList.contains("active-section")
    ? getLikedCollection()
    : surahContainer.map((surah) => surah.parentElement);

  // إخفاء جميع الكروت الأصلية أولاً
  surahContainer.forEach((surah) => {
    surah.parentElement.style.display = "none";
  });

  const groupedByJuz = new Map();

  // ترتيب الكروت وتوزيعها على الأجزاء
  juz(visibleCards).forEach((card) => {
    const surahNode = getSurahNode(card);
    if (!surahNode) return;

    // تحويل النص "1,2,3" إلى مصفوفة [1, 2, 3]
    const juzList = surahNode.dataset.juz ? surahNode.dataset.juz.split(",") : ["0"];

    // المرور على كل جزء تنتمي إليه هذه السورة
    juzList.forEach((surahJuz) => {
      const cleanJuz = surahJuz.trim();

      // إنشاء حاوية (Container) للجزء إذا لم تكن موجودة مسبقاً
      if (!groupedByJuz.has(cleanJuz)) {
        const juzContainer = document.createElement("div");
        juzContainer.classList.add("juz-container");
        const juzName = document.createElement("span");
        juzName.classList.add("juz-name");
        const juzLabel = localStorage.getItem("language") === "ar" ? "الجزء" : "Juz";
        juzName.textContent = `${juzLabel} ${cleanJuz}`;
        juzContainer.appendChild(juzName)
        container.appendChild(juzContainer);
        groupedByJuz.set(cleanJuz, juzContainer);
      }

      // إذا كانت السورة ممتدة لأكثر من جزء، نقوم بنسخ الكرت (Clone) 
      // حتى يظهر في كل الأجزاء الخاصة به دون أن يختفي من الجزء الآخر
      const cardToAppend = juzList.length > 1 ? card.cloneNode(true) : card;
      if (juzList.length > 1) {
        cardToAppend.classList.add("juz-clone");
      }
      cardToAppend.style.display = "block";

      groupedByJuz.get(cleanJuz).appendChild(cardToAppend);
    });
  });
});


/* 
  THIS IS A CODE I USED AI TO HELPME CAUSE I WAS FACING A BIG PROBLEM
  AND IT SOLVED , THE PROBLEM WAS THE THAT THE FILTER SECTION DONT SAVE IT STATE ESPECIALY ON THE JUZ FILTER
  AND TO FIX THIS PROBLEM WE FIND THE SELECTED BTN BY ITS ACTIVE CLASS AND CLICK ON IT AUTOMATICLY
  AND AFTER SOLVING THIS WHEN WE MOVE FROM ANY FILTER ESPECIALY THE JUZ PHILTER IT DONT DELETE THE OLD CONTAINER
 */

function reApplyActiveFilter() {
  // Geting the active filter
  const activeFilter = document.querySelector("#filter > div.active-filter");
  if (activeFilter) {
    // Click on it automatically, and re-active it
    activeFilter.click();
  }
}

document.addEventListener("languageChanged", () => {
  const activeFilter = document.querySelector("#filter > div.active-filter");
  if (activeFilter === alphabeticBtn || activeFilter === juzBtn) {
    reApplyActiveFilter();
  }
});

// Main section check
const mainSectionBtn = document.querySelector("ul#sections #main-section");
// If the main section is active and its clicked
if (mainSectionBtn) {
  mainSectionBtn.addEventListener("click", () => {
    // Run the function instantly in (0.010 second)
    setTimeout(reApplyActiveFilter, 10);
  });
}
// If the liked section is active and its clicked
if (likedSection) {
  likedSection.addEventListener("click", () => {
    // Run the function instantly in (0.010 second)
    setTimeout(reApplyActiveFilter, 10);

    // Refresh the liked section instantly, show when it clicked
    let likedCollection = getLikedCollection()
    if (likedCollection) {
      likedCollection.forEach((liked) => {
        liked.style.display = "block"
        container.appendChild(liked)
      })
    }
  });
}
const surahContainer = document.getElementById("cards")

export const surahData = {
    "1": {
        "surahName": "Al-Fatihah",
        "surahArabicName": "ٱلْفَاتِحَة",
        "surahMeaning": "The Opening",
        "ayahCount": 7,
        "juz": 1
    },
    "2": {
        "surahName": "Al-Baqarah",
        "surahArabicName": "ٱلْبَقَرَة",
        "surahMeaning": "The Cow",
        "ayahCount": 286,
        "juz": [1, 2, 3]
    },
    "3": {
        "surahName": "Ali 'Imran",
        "surahArabicName": "آلِ عِمْرَان",
        "surahMeaning": "The Family of Imran",
        "ayahCount": 200,
        "juz": [3, 4]
    },
    "4": {
        "surahName": "An-Nisa",
        "surahArabicName": "ٱلنِّسَاء",
        "surahMeaning": "The Women",
        "ayahCount": 176,
        "juz": [4, 5, 6]
    },
    "5": {
        "surahName": "Al-Ma'idah",
        "surahArabicName": "ٱلْمَائِدَة",
        "surahMeaning": "The Table Spread",
        "ayahCount": 120,
        "juz": [6, 7]
    },
    "6": {
        "surahName": "Al-An'am",
        "surahArabicName": "ٱلْأَنْعَام",
        "surahMeaning": "The Cattle",
        "ayahCount": 165,
        "juz": [7, 8]
    },
    "7": {
        "surahName": "Al-A'raf",
        "surahArabicName": "ٱلْأَعْرَاف",
        "surahMeaning": "The Heights",
        "ayahCount": 206,
        "juz": [8, 9]
    },
    "8": {
        "surahName": "Al-Anfal",
        "surahArabicName": "ٱلْأَنْفَال",
        "surahMeaning": "The Spoils of War",
        "ayahCount": 75,
        "juz": [9, 10]
    },
    "9": {
        "surahName": "At-Tawbah",
        "surahArabicName": "ٱلتَّوْبَة",
        "surahMeaning": "The Repentance",
        "ayahCount": 129,
        "juz": [10, 11]
    },
    "10": {
        "surahName": "Yunus",
        "surahArabicName": "يُونُس",
        "surahMeaning": "Jonah",
        "ayahCount": 109,
        "juz": [11, 12]
    },
    "11": {
        "surahName": "Hud",
        "surahArabicName": "هُود",
        "surahMeaning": "Hud",
        "ayahCount": 123,
        "juz": 11
    },
    "12": {
        "surahName": "Yusuf",
        "surahArabicName": "يُوسُف",
        "surahMeaning": "Joseph",
        "ayahCount": 111,
        "juz": [12, 13]
    },
    "13": {
        "surahName": "Ar-Ra'd",
        "surahArabicName": "ٱلرَّعْد",
        "surahMeaning": "The Thunder",
        "ayahCount": 43,
        "juz": 13
    },
    "14": {
        "surahName": "Ibrahim",
        "surahArabicName": "إِبْرَاهِيم",
        "surahMeaning": "Abraham",
        "ayahCount": 52,
        "juz": 13
    },
    "15": {
        "surahName": "Al-Hijr",
        "surahArabicName": "ٱلْحِجْر",
        "surahMeaning": "The Rocky Tract",
        "ayahCount": 99,
        "juz": 14
    },
    "16": {
        "surahName": "An-Nahl",
        "surahArabicName": "ٱلنَّحْل",
        "surahMeaning": "The Bee",
        "ayahCount": 128,
        "juz": 14
    },
    "17": {
        "surahName": "Al-Isra",
        "surahArabicName": "ٱلْإِسْرَاء",
        "surahMeaning": "The Night Journey",
        "ayahCount": 111,
        "juz": 15
    },
    "18": {
        "surahName": "Al-Kahf",
        "surahArabicName": "ٱلْكَهْف",
        "surahMeaning": "The Cave",
        "ayahCount": 110,
        "juz": [15, 16]
    },
    "19": {
        "surahName": "Maryam",
        "surahArabicName": "مَرْيَم",
        "surahMeaning": "Mary",
        "ayahCount": 98,
        "juz": 16
    },
    "20": {
        "surahName": "Taha",
        "surahArabicName": "طه",
        "surahMeaning": "Ta-Ha",
        "ayahCount": 135,
        "juz": 16
    },
    "21": {
        "surahName": "Al-Anbiya",
        "surahArabicName": "ٱلْأَنْبِيَاء",
        "surahMeaning": "The Prophets",
        "ayahCount": 112,
        "juz": 17
    },
    "22": {
        "surahName": "Al-Hajj",
        "surahArabicName": "ٱلْحَج",
        "surahMeaning": "The Pilgrimage",
        "ayahCount": 78,
        "juz": 17
    },
    "23": {
        "surahName": "Al-Mu'minun",
        "surahArabicName": "ٱلْمُؤْمِنُون",
        "surahMeaning": "The Believers",
        "ayahCount": 118,
        "juz": [18, 19]
    },
    "24": {
        "surahName": "An-Nur",
        "surahArabicName": "ٱلنُّور",
        "surahMeaning": "The Light",
        "ayahCount": 64,
        "juz": 18
    },
    "25": {
        "surahName": "Al-Furqan",
        "surahArabicName": "ٱلْفُرْقَان",
        "surahMeaning": "The Criterion",
        "ayahCount": 77,
        "juz": 18
    },
    "26": {
        "surahName": "Ash-Shu'ara",
        "surahArabicName": "ٱلشُّعَرَاء",
        "surahMeaning": "The Poets",
        "ayahCount": 227,
        "juz": [19, 20]
    },
    "27": {
        "surahName": "An-Naml",
        "surahArabicName": "ٱلنَّمْل",
        "surahMeaning": "The Ant",
        "ayahCount": 93,
        "juz": 19
    },
    "28": {
        "surahName": "Al-Qasas",
        "surahArabicName": "ٱلْقَصَص",
        "surahMeaning": "The Stories",
        "ayahCount": 88,
        "juz": [20, 21]
    },
    "29": {
        "surahName": "Al-Ankabut",
        "surahArabicName": "ٱلْعَنْكَبُوت",
        "surahMeaning": "The Spider",
        "ayahCount": 69,
        "juz": [20, 21]
    },
    "30": {
        "surahName": "Ar-Rum",
        "surahArabicName": "ٱلرُّوم",
        "surahMeaning": "The Romans",
        "ayahCount": 60,
        "juz": [21, 22]
    },
    "31": {
        "surahName": "Luqman",
        "surahArabicName": "لُقْمَان",
        "surahMeaning": "Luqman",
        "ayahCount": 34,
        "juz": 21
    },
    "32": {
        "surahName": "As-Sajdah",
        "surahArabicName": "ٱلسَّجْدَة",
        "surahMeaning": "The Prostration",
        "ayahCount": 30,
        "juz": 21
    },
    "33": {
        "surahName": "Al-Ahzab",
        "surahArabicName": "ٱلْأَحْزَاب",
        "surahMeaning": "The Combined Forces",
        "ayahCount": 73,
        "juz": 21
    },
    "34": {
        "surahName": "Saba",
        "surahArabicName": "سَبَأ",
        "surahMeaning": "Sheba",
        "ayahCount": 54,
        "juz": [22, 23]
    },
    "35": {
        "surahName": "Fatir",
        "surahArabicName": "فَاطِر",
        "surahMeaning": "The Originator",
        "ayahCount": 45,
        "juz": 22
    },
    "36": {
        "surahName": "Ya-Sin",
        "surahArabicName": "يٰس",
        "surahMeaning": "Ya-Sin",
        "ayahCount": 83,
        "juz": 22
    },
    "37": {
        "surahName": "As-Saffat",
        "surahArabicName": "ٱلصَّافَّات",
        "surahMeaning": "Those who set the Ranks",
        "ayahCount": 182,
        "juz": [23, 24]
    },
    "38": {
        "surahName": "Sad",
        "surahArabicName": "ص",
        "surahMeaning": "The Letter Sad",
        "ayahCount": 88,
        "juz": 23
    },
    "39": {
        "surahName": "Az-Zumar",
        "surahArabicName": "ٱلزُّمَر",
        "surahMeaning": "The Troops",
        "ayahCount": 75,
        "juz": 23
    },
    "40": {
        "surahName": "Ghafir",
        "surahArabicName": "غَافِر",
        "surahMeaning": "The Forgiver",
        "ayahCount": 85,
        "juz": [24, 25]
    },
    "41": {
        "surahName": "Fussilat",
        "surahArabicName": "فُصِّلَت",
        "surahMeaning": "Explained in Detail",
        "ayahCount": 54,
        "juz": 24
    },
    "42": {
        "surahName": "Ash-Shura",
        "surahArabicName": "ٱلشُّورَى",
        "surahMeaning": "The Consultation",
        "ayahCount": 53,
        "juz": 25
    },
    "43": {
        "surahName": "Az-Zukhruf",
        "surahArabicName": "ٱلزُّخْرُف",
        "surahMeaning": "The Ornaments of Gold",
        "ayahCount": 89,
        "juz": 25
    },
    "44": {
        "surahName": "Ad-Dukhan",
        "surahArabicName": "ٱلدُّخَان",
        "surahMeaning": "The Smoke",
        "ayahCount": 59,
        "juz": 25
    },
    "45": {
        "surahName": "Al-Jathiyah",
        "surahArabicName": "ٱلْجَاثِيَة",
        "surahMeaning": "The Crouching",
        "ayahCount": 37,
        "juz": 25
    },
    "46": {
        "surahName": "Al-Ahqaf",
        "surahArabicName": "ٱلْأَحْقَاف",
        "surahMeaning": "The Wind-Curved Sandhills",
        "ayahCount": 35,
        "juz": 26
    },
    "47": {
        "surahName": "Muhammad",
        "surahArabicName": "مُحَمَّد",
        "surahMeaning": "Muhammad",
        "ayahCount": 38,
        "juz": 26
    },
    "48": {
        "surahName": "Al-Fath",
        "surahArabicName": "ٱلْفَتْح",
        "surahMeaning": "The Victory",
        "ayahCount": 29,
        "juz": 26
    },
    "49": {
        "surahName": "Al-Hujurat",
        "surahArabicName": "ٱلْحُجُرَات",
        "surahMeaning": "The Rooms",
        "ayahCount": 18,
        "juz": 26
    },
    "50": {
        "surahName": "Qaf",
        "surahArabicName": "ق",
        "surahMeaning": "The Letter Qaf",
        "ayahCount": 45,
        "juz": 26
    },
    "51": {
        "surahName": "Adh-Dhariyat",
        "surahArabicName": "ٱلذَّارِيَات",
        "surahMeaning": "The Winnowing Winds",
        "ayahCount": 60,
        "juz": [26, 27]
    },
    "52": {
        "surahName": "At-Tur",
        "surahArabicName": "ٱلطُّور",
        "surahMeaning": "The Mount",
        "ayahCount": 49,
        "juz": 27
    },
    "53": {
        "surahName": "An-Najm",
        "surahArabicName": "ٱلنَّجْم",
        "surahMeaning": "The Star",
        "ayahCount": 62,
        "juz": 27
    },
    "54": {
        "surahName": "Al-Qamar",
        "surahArabicName": "ٱلْقَمَر",
        "surahMeaning": "The Moon",
        "ayahCount": 55,
        "juz": 27
    },
    "55": {
        "surahName": "Ar-Rahman",
        "surahArabicName": "ٱلرَّحْمَٰن",
        "surahMeaning": "The Beneficent",
        "ayahCount": 78,
        "juz": 27
    },
    "56": {
        "surahName": "Al-Waqi'ah",
        "surahArabicName": "ٱلْوَاقِعَة",
        "surahMeaning": "The Inevitable",
        "ayahCount": 96,
        "juz": 27
    },
    "57": {
        "surahName": "Al-Hadid",
        "surahArabicName": "ٱلْحَدِيد",
        "surahMeaning": "The Iron",
        "ayahCount": 29,
        "juz": 27
    },
    "58": {
        "surahName": "Al-Mujadilah",
        "surahArabicName": "ٱلْمُجَادِلَة",
        "surahMeaning": "The Pleading Woman",
        "ayahCount": 22,
        "juz": 28
    },
    "59": {
        "surahName": "Al-Hashr",
        "surahArabicName": "ٱلْحَشْر",
        "surahMeaning": "The Exile",
        "ayahCount": 24,
        "juz": 28
    },
    "60": {
        "surahName": "Al-Mumtahanah",
        "surahArabicName": "ٱلْمُمْتَحَنَة",
        "surahMeaning": "The Examining Woman",
        "ayahCount": 13,
        "juz": 28
    },
    "61": {
        "surahName": "As-Saff",
        "surahArabicName": "ٱلصَّف",
        "surahMeaning": "The Ranks",
        "ayahCount": 14,
        "juz": 28
    },
    "62": {
        "surahName": "Al-Jumu'ah",
        "surahArabicName": "ٱلْجُمُعَة",
        "surahMeaning": "The Congregation",
        "ayahCount": 11,
        "juz": 28
    },
    "63": {
        "surahName": "Al-Munafiqun",
        "surahArabicName": "ٱلْمُنَافِقُون",
        "surahMeaning": "The Hypocrites",
        "ayahCount": 11,
        "juz": 28
    },
    "64": {
        "surahName": "At-Taghabun",
        "surahArabicName": "ٱلتَّغَابُن",
        "surahMeaning": "The Mutual Disillusion",
        "ayahCount": 18,
        "juz": 28
    },
    "65": {
        "surahName": "At-Talaq",
        "surahArabicName": "ٱلطَّلَاق",
        "surahMeaning": "The Divorce",
        "ayahCount": 12,
        "juz": 28
    },
    "66": {
        "surahName": "At-Tahrim",
        "surahArabicName": "ٱلتَّحْرِيم",
        "surahMeaning": "The Prohibition",
        "ayahCount": 12,
        "juz": 28
    },
    "67": {
        "surahName": "Al-Mulk",
        "surahArabicName": "ٱلْمُلْك",
        "surahMeaning": "The Sovereignty",
        "ayahCount": 30,
        "juz": 29
    },
    "68": {
        "surahName": "Al-Qalam",
        "surahArabicName": "ٱلْقَلَم",
        "surahMeaning": "The Pen",
        "ayahCount": 52,
        "juz": 29
    },
    "69": {
        "surahName": "Al-Haqqah",
        "surahArabicName": "ٱلْحَاقَّة",
        "surahMeaning": "The Reality",
        "ayahCount": 52,
        "juz": 29
    },
    "70": {
        "surahName": "Al-Ma'arij",
        "surahArabicName": "ٱلْمَعَارِج",
        "surahMeaning": "The Ascending Stairways",
        "ayahCount": 44,
        "juz": 29
    },
    "71": {
        "surahName": "Nuh",
        "surahArabicName": "نُوح",
        "surahMeaning": "Noah",
        "ayahCount": 28,
        "juz": 29
    },
    "72": {
        "surahName": "Al-Jinn",
        "surahArabicName": "ٱلْجِن",
        "surahMeaning": "The Jinn",
        "ayahCount": 28,
        "juz": 29
    },
    "73": {
        "surahName": "Al-Muzzammil",
        "surahArabicName": "ٱلْمُزَّمِّل",
        "surahMeaning": "The Enshrouded One",
        "ayahCount": 20,
        "juz": 29
    },
    "74": {
        "surahName": "Al-Muddaththir",
        "surahArabicName": "ٱلْمُدَّثِّر",
        "surahMeaning": "The Cloaked One",
        "ayahCount": 56,
        "juz": 29
    },
    "75": {
        "surahName": "Al-Qiyamah",
        "surahArabicName": "ٱلْقِيَامَة",
        "surahMeaning": "The Resurrection",
        "ayahCount": 40,
        "juz": 29
    },
    "76": {
        "surahName": "Al-Insan",
        "surahArabicName": "ٱلْإِنْسَان",
        "surahMeaning": "The Man",
        "ayahCount": 31,
        "juz": 29
    },
    "77": {
        "surahName": "Al-Mursalat",
        "surahArabicName": "ٱلْمُرْسَلَات",
        "surahMeaning": "The Emissaries",
        "ayahCount": 50,
        "juz": 29
    },
    "78": {
        "surahName": "An-Naba",
        "surahArabicName": "ٱلنَّبَأ",
        "surahMeaning": "The Tidings",
        "ayahCount": 40,
        "juz": 30
    },
    "79": {
        "surahName": "An-Nazi'at",
        "surahArabicName": "ٱلنَّازِعَات",
        "surahMeaning": "Those who drag forth",
        "ayahCount": 46,
        "juz": 30
    },
    "80": {
        "surahName": "Abasa",
        "surahArabicName": "عَبَس",
        "surahMeaning": "He Frowned",
        "ayahCount": 42,
        "juz": 30
    },
    "81": {
        "surahName": "At-Takwir",
        "surahArabicName": "ٱلتَّكْوِير",
        "surahMeaning": "The Overthrowing",
        "ayahCount": 29,
        "juz": 30
    },
    "82": {
        "surahName": "Al-Infitar",
        "surahArabicName": "ٱلْاِنْفِطَار",
        "surahMeaning": "The Cleaving",
        "ayahCount": 19,
        "juz": 30
    },
    "83": {
        "surahName": "Al-Mutaffifin",
        "surahArabicName": "ٱلْمُطَفِّفِينَ",
        "surahMeaning": "The Defrauders",
        "ayahCount": 36,
        "juz": 30
    },
    "84": {
        "surahName": "Al-Inshiqaq",
        "surahArabicName": "ٱلْاِنْشِقَاق",
        "surahMeaning": "The Sundering",
        "ayahCount": 25,
        "juz": 30
    },
    "85": {
        "surahName": "Al-Buruj",
        "surahArabicName": "ٱلْبُرُوج",
        "surahMeaning": "The Mansions of the Stars",
        "ayahCount": 22,
        "juz": 30
    },
    "86": {
        "surahName": "At-Tariq",
        "surahArabicName": "ٱلطَّارِق",
        "surahMeaning": "The Nightcomer",
        "ayahCount": 17,
        "juz": 30
    },
    "87": {
        "surahName": "Al-A'la",
        "surahArabicName": "ٱلْأَعْلَى",
        "surahMeaning": "The Most High",
        "ayahCount": 19,
        "juz": 30
    },
    "88": {
        "surahName": "Al-Ghashiyah",
        "surahArabicName": "ٱلْغَاشِيَة",
        "surahMeaning": "The Overwhelming",
        "ayahCount": 26,
        "juz": 30
    },
    "89": {
        "surahName": "Al-Fajr",
        "surahArabicName": "ٱلْفَجْر",
        "surahMeaning": "The Dawn",
        "ayahCount": 30,
        "juz": 30
    },
    "90": {
        "surahName": "Al-Balad",
        "surahArabicName": "ٱلْبَلَد",
        "surahMeaning": "The City",
        "ayahCount": 20,
        "juz": 30
    },
    "91": {
        "surahName": "Ash-Shams",
        "surahArabicName": "ٱلشَّمْس",
        "surahMeaning": "The Sun",
        "ayahCount": 15,
        "juz": 30
    },
    "92": {
        "surahName": "Al-Layl",
        "surahArabicName": "ٱللَّيْل",
        "surahMeaning": "The Night",
        "ayahCount": 21,
        "juz": 30
    },
    "93": {
        "surahName": "Ad-Duha",
        "surahArabicName": "ٱلضُّحَى",
        "surahMeaning": "The Morning Hours",
        "ayahCount": 11,
        "juz": 30
    },
    "94": {
        "surahName": "Ash-Sharh",
        "surahArabicName": "ٱلشَّرْح",
        "surahMeaning": "The Relief",
        "ayahCount": 8,
        "juz": 30
    },
    "95": {
        "surahName": "At-Tin",
        "surahArabicName": "ٱلتِّين",
        "surahMeaning": "The Fig",
        "ayahCount": 8,
        "juz": 30
    },
    "96": {
        "surahName": "Al-Alaq",
        "surahArabicName": "ٱلْعَلَق",
        "surahMeaning": "The Clot",
        "ayahCount": 19,
        "juz": 30
    },
    "97": {
        "surahName": "Al-Qadr",
        "surahArabicName": "ٱلْقَدْر",
        "surahMeaning": "The Power",
        "ayahCount": 5,
        "juz": 30
    },
    "98": {
        "surahName": "Al-Bayyinah",
        "surahArabicName": "ٱلْبَيِّنَة",
        "surahMeaning": "The Clear Proof",
        "ayahCount": 8,
        "juz": 30
    },
    "99": {
        "surahName": "Az-Zalzalah",
        "surahArabicName": "ٱلزَّلْزَلَة",
        "surahMeaning": "The Earthquake",
        "ayahCount": 8,
        "juz": 30
    },
    "100": {
        "surahName": "Al-Adiyat",
        "surahArabicName": "ٱلْعَادِيَات",
        "surahMeaning": "The Courser",
        "ayahCount": 11,
        "juz": 30
    },
    "101": {
        "surahName": "Al-Qari'ah",
        "surahArabicName": "ٱلْقَارِعَة",
        "surahMeaning": "The Calamity",
        "ayahCount": 11,
        "juz": 30
    },
    "102": {
        "surahName": "At-Takathur",
        "surahArabicName": "ٱلتَّكَاثُر",
        "surahMeaning": "The Rivalry in World Increase",
        "ayahCount": 8,
        "juz": 30
    },
    "103": {
        "surahName": "Al-Asr",
        "surahArabicName": "ٱلْعَصْر",
        "surahMeaning": "The Declining Day",
        "ayahCount": 3,
        "juz": 30
    },
    "104": {
        "surahName": "Al-Humazah",
        "surahArabicName": "ٱلْهُمَزَة",
        "surahMeaning": "The Traducer",
        "ayahCount": 9,
        "juz": 30
    },
    "105": {
        "surahName": "Al-Fil",
        "surahArabicName": "ٱلْفِيل",
        "surahMeaning": "The Elephant",
        "ayahCount": 5,
        "juz": 30
    },
    "106": {
        "surahName": "Quraysh",
        "surahArabicName": "قُرَيْش",
        "surahMeaning": "Quraysh",
        "ayahCount": 4,
        "juz": 30
    },
    "107": {
        "surahName": "Al-Ma'un",
        "surahArabicName": "ٱلْمَاعُون",
        "surahMeaning": "The Small Kindnesses",
        "ayahCount": 7,
        "juz": 30
    },
    "108": {
        "surahName": "Al-Kawthar",
        "surahArabicName": "ٱلْكَوْثَر",
        "surahMeaning": "The Abundance",
        "ayahCount": 3,
        "juz": 30
    },
    "109": {
        "surahName": "Al-Kafirun",
        "surahArabicName": "ٱلْكَافِرُون",
        "surahMeaning": "The Disbelievers",
        "ayahCount": 6,
        "juz": 30
    },
    "110": {
        "surahName": "An-Nasr",
        "surahArabicName": "ٱلنَّصْر",
        "surahMeaning": "The Divine Support",
        "ayahCount": 3,
        "juz": 30
    },
    "111": {
        "surahName": "Al-Masad",
        "surahArabicName": "ٱلْمَسَد",
        "surahMeaning": "The Palm Fiber",
        "ayahCount": 5,
        "juz": 30
    },
    "112": {
        "surahName": "Al-Ikhlas",
        "surahArabicName": "ٱلْإِخْلَاص",
        "surahMeaning": "The Sincerity",
        "ayahCount": 4,
        "juz": 30
    },
    "113": {
        "surahName": "Al-Falaq",
        "surahArabicName": "ٱلْفَلَق",
        "surahMeaning": "The Daybreak",
        "ayahCount": 5,
        "juz": 30
    },
    "114": {
        "surahName": "An-Nas",
        "surahArabicName": "ٱلنَّاس",
        "surahMeaning": "Mankind",
        "ayahCount": 6,
        "juz": 30
    }
};

function getPlainArabicName(name) {
    return name.replace(/[\u064B-\u065F\u0670]/g, "").replace(/ٱ/g, "ا").replace(/ة/g, "ه");
}

if (surahContainer) {
    function addElements() {
        for (let i = 1; i <= (Object.keys(surahData).length); i++) {
            let surah = document.createElement("div")
            surah.setAttribute("role", "listitem")
            const surahJuz = Array.isArray(surahData[i].juz) ? surahData[i].juz : [surahData[i].juz];
            surah.innerHTML = `
            <div class="surah" id="surah${i}" data-ayah="${surahData[i].ayahCount}" data-juz="${surahJuz.join(",")}">
                <div class="num" id="surah-number"><span class="num-value">${i}</span></div>
                <div class="details">
                    <div class="block1">
                        <div class="surah-name" id="surah-name">${surahData[i].surahName}</div>
                        <div class="surah-meaning" id="surah-meaning">${surahData[i].surahMeaning}</div>
                    </div>
                    <div class="block2">
                        <div class="arabic-name" id="arabic-name">${surahData[i].surahArabicName}</div>
                        <div class="surah-ayah"><span class="ayah-count">${surahData[i].ayahCount}</span> <span data-i18n="verses">Verses</span></div>
                    </div>
                    
                </div>
                <div class="like" role="button" tabindex="0" aria-label="إضافة السورة إلى المفضلة"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-heart-icon lucide-heart" aria-hidden="true"><path d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"/></svg></div>
            </div>`
            surahContainer.appendChild(surah)
        }
        document.dispatchEvent(new CustomEvent("surahsRendered"));
    }
    addElements()
}


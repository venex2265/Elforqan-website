const reciterData = {
    "reciters": [
        {
            "id": 1,
            "name": "Mishary Rashid Alafasy",
            "arabic_name": "مشاري راشد العفاسي",
            "api_name": "mishary_rashid_alafasy",
            "server": "https://server8.mp3quran.net/afs/"
        },
        {
            "id": 2,
            "name": "Abdul Rahman Al-Sudais",
            "arabic_name": "عبدالرحمن السديس",
            "api_name": "abdul_rahman_al_sudais",
            "server": "https://server11.mp3quran.net/sds/"
        },
        {
            "id": 3,
            "name": "Maher Al-Muaiqly",
            "arabic_name": "ماهر المعيقلي",
            "api_name": "maher_al_muaiqly",
            "server": "https://server12.mp3quran.net/maher/"
        },
        {
            "id": 4,
            "name": "Abdul Basit Abdul Samad",
            "arabic_name": "عبدالباسط عبدالصمد",
            "api_name": "abdul_basit",
            "server": "https://server7.mp3quran.net/basit/"
        },
        {
            "id": 5,
            "name": "Saad Al-Ghamdi",
            "arabic_name": "سعد الغامدي",
            "api_name": "saad_al_ghamdi",
            "server": "https://server7.mp3quran.net/s_gmd/"
        },
        {
            "id": 6,
            "name": "Yasser Al-Dosari",
            "arabic_name": "ياسر الدوسري",
            "api_name": "yasser_ad_dussary",
            "server": "https://server11.mp3quran.net/yasser/"
        },
        {
            "id": 7,
            "name": "Mahmoud Khalil Al-Hussary",
            "arabic_name": "محمود خليل الحصري",
            "api_name": "mahmoud_khalil_al_husary",
            "server": "https://server13.mp3quran.net/husr/"
        },
        {
            "id": 8,
            "name": "Muhammad Siddiq Al-Minshawi",
            "arabic_name": "محمد صديق المنشاوي",
            "api_name": "mohamed_siddiq_al_minshawi",
            "server": "https://server10.mp3quran.net/minsh/"
        },
        {
            "id": 9,
            "name": "Ahmed Al-Ajmi",
            "arabic_name": "أحمد العجمي",
            "api_name": "ahmed_ibn_ali_al_ajmy",
            "server": "https://server10.mp3quran.net/ajm/"
        },
        {
            "id": 10,
            "name": "Saud Al-Shuraim",
            "arabic_name": "سعود الشريم",
            "api_name": "saud_ash_shuraym",
            "server": "https://server7.mp3quran.net/shur/"
        },
        {
            "id": 11,
            "name": "Idris Abkar",
            "arabic_name": "إدريس أبكر",
            "api_name": "idris_abkar",
            "server": "https://server6.mp3quran.net/abkr/"
        },
        {
            "id": 12,
            "name": "Nasser Al-Qatami",
            "arabic_name": "ناصر القطامي",
            "api_name": "nasser_al_qatami",
            "server": "https://server6.mp3quran.net/qtm/"
        },
        {
            "id": 13,
            "name": "Fares Abbad",
            "arabic_name": "فارس عباد",
            "api_name": "fares_abbad",
            "server": "https://server8.mp3quran.net/frs_a/"
        },
        {
            "id": 14,
            "name": "Bandar Baleela",
            "arabic_name": "بندر بليلة",
            "api_name": "bandar_baleela",
            "server": "https://server6.mp3quran.net/balilah/"
        },
        {
            "id": 15,
            "name": "Islam subhi",
            "arabic_name": "إسلام صبحي",
            "api_name": "islam_subhi",
            "server": "https://server14.mp3quran.net/islam/Rewayat-Hafs-A-n-Assem/"
        }
    ]
};
let recitersContainer = document.getElementById("reciter-box")
recitersContainer.innerHTML = reciterData.reciters.map((reciter, i) => `
    <div class="reciter${i + 1}" data-reciterid="${reciter.api_name}" data-server="${reciter.server}">
        <div class="image">
            <img src="images/reciter/${reciter.api_name}.webp" alt="${reciter.name}" loading="lazy" decoding="async">
        </div>
        <div class="details">
            <div class="reciter-name">${reciter.name}</div>
            <div class="reciter-arabic-name">${reciter.arabic_name}</div>
            <div class="reading-type" id="reciter-reading-type" >Murratal</div>
        </div>
    </div>
`).join("")

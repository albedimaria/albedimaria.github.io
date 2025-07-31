async function loadLanguage(lang) {
    try {
        const response = await fetch(`./languages/${lang}.json`);
        const translations = await response.json();

        document.querySelectorAll("[data-translate]").forEach(el => {
            const key = el.getAttribute("data-translate");
            if (translations[key]) {
                el.innerText = translations[key];
            }
        });

        // aggiorna bottone con lingua attuale
        langButton.textContent = lang.toUpperCase();

        // aggiorna dropdown per mostrare solo le altre lingue
        updateDropdown(lang);

    } catch (error) {
        console.error("Errore nel caricamento della lingua:", error);
    }
}

const langMenu = document.querySelector(".lang-menu");
const langButton = document.getElementById("langButton");
const langDropdown = document.getElementById("langDropdown");

// mostra/nasconde solo le lingue diverse da quella corrente
function updateDropdown(currentLang) {
    langDropdown.querySelectorAll("li").forEach(item => {
        if (item.getAttribute("data-lang") === currentLang) {
            item.style.display = "none";
        } else {
            item.style.display = "block";
        }
    });
}

// toggle apertura menu
langButton.addEventListener("click", () => {
    langMenu.classList.toggle("open");
});

// gestione scelta lingua
langDropdown.querySelectorAll("li").forEach(item => {
    item.addEventListener("click", e => {
        const selectedLang = e.target.getAttribute("data-lang");
        localStorage.setItem("lang", selectedLang);
        loadLanguage(selectedLang);
        langMenu.classList.remove("open"); // chiudi menu
    });
});

// lingua salvata o EN di default
const savedLang = localStorage.getItem("lang") || "en";
loadLanguage(savedLang);

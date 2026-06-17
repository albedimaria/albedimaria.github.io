// returns browser default language, fallback to en
export function detectBrowserLanguage() {
    let browserLang = navigator.language.slice(0, 2);
    if (!["it", "en", "es"].includes(browserLang)) {
        browserLang = "en";
    }
    return browserLang;
}

// updates dropdown items visibility
export function updateDropdown(currentLang, langDropdown) {
    langDropdown.querySelectorAll("li").forEach(item => {
        const itemLang = item.getAttribute("data-lang");
        item.style.display = (itemLang === currentLang) ? "none" : "block";
    });
}

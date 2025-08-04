// handles loading and applying translations

import { updateDropdown } from './lang_utils.js';

export async function loadLanguage(lang, langButton, langDropdown) {
    try {
        const response = await fetch(`./languages/${lang}.json`);
        const translations = await response.json();

        // replace text for each element with data-translate
        document.querySelectorAll("[data-translate]").forEach(el => {
            const key = el.getAttribute("data-translate");
            if (translations[key]) {
                el.innerHTML = translations[key].replace(/\n/g, "<br>");
            }
        });

        // update current language label
        langButton.textContent = lang.toUpperCase();

        // update dropdown to hide the current language
        updateDropdown(lang, langDropdown);

    } catch (error) {
        console.error("error loading language:", error);
    }
}

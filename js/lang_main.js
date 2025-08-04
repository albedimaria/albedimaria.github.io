// initialization and event handling for language menu

import { loadLanguage } from './lang_loader.js';
import { detectBrowserLanguage } from './lang_utils.js';

const langMenu = document.querySelector(".lang-menu");
const langButton = document.getElementById("langButton");
const langDropdown = document.getElementById("langDropdown");

// toggle dropdown on button click
langButton.addEventListener("click", () => {
    langMenu.classList.toggle("open");
});

// handle user selection
langDropdown.querySelectorAll("li").forEach(item => {
    item.addEventListener("click", e => {
        const selectedLang = e.target.getAttribute("data-lang");
        localStorage.setItem("lang", selectedLang);
        loadLanguage(selectedLang, langButton, langDropdown);
        langMenu.classList.remove("open");
    });
});

// load saved language or browser default
const savedLang = localStorage.getItem("lang") || detectBrowserLanguage();
loadLanguage(savedLang, langButton, langDropdown);

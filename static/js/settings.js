// Завантаження перекладу для сторінки
const loadLanguage = async (lang) => {
    try {
        const response = await fetch(`/static/lang/lang_${lang}.json`);
        const translations = await response.json();

        // Оновлення текстів із data-key
        document.querySelectorAll("[data-key]").forEach(el => {
            const key = el.getAttribute("data-key");
            if (translations[key]) {
                el.textContent = translations[key];
            }
        });

        // Оновлення текстів в інших елементах, якщо потрібно
        document.querySelectorAll("[data-placeholder]").forEach(el => {
            const key = el.getAttribute("data-placeholder");
            if (translations[key]) {
                el.setAttribute("placeholder", translations[key]);
            }
        });
    } catch (error) {
        console.error("Error loading language file:", error);
    }
};

// Завантаження налаштувань при завантаженні сторінки
document.addEventListener("DOMContentLoaded", () => {
    // Завантажити збережену мову або встановити мову за замовчуванням
    const savedLanguage = localStorage.getItem("language") || "en";
    loadLanguage(savedLanguage);

    // Перевірка та застосування налаштувань для всіх сторінок
    applySettings();

    // Логіка налаштувань тільки для settings.html
    const settingsForm = document.getElementById("settings-form");
    if (settingsForm) {
        const fontSizeSelect = document.getElementById("font-size");
        const themeSelect = document.getElementById("theme");
        const languageSelect = document.getElementById("language");
        const countrySelect = document.getElementById("country");

        if (fontSizeSelect) {
            fontSizeSelect.value = localStorage.getItem("font-size") || "medium";
            fontSizeSelect.addEventListener("change", () => {
                const fontSize = fontSizeSelect.value;
                localStorage.setItem("font-size", fontSize);
                applySettings();
            });
        }

        if (themeSelect) {
            themeSelect.value = localStorage.getItem("theme") || "light";
            themeSelect.addEventListener("change", () => {
                const theme = themeSelect.value;
                localStorage.setItem("theme", theme);
                applySettings();
            });
        }

        if (languageSelect) {
            const savedLanguage = localStorage.getItem("language") || "en";
            languageSelect.value = savedLanguage;
            languageSelect.addEventListener("change", (e) => {
                const selectedLanguage = e.target.value;
                localStorage.setItem("language", selectedLanguage);
                loadLanguage(selectedLanguage);
            });
        }

        if (countrySelect) {
            const savedCountry = localStorage.getItem("country") || "USA";
            countrySelect.value = savedCountry;
            countrySelect.addEventListener("change", () => {
                const selectedCountry = countrySelect.value;
                localStorage.setItem("country", selectedCountry);
                toggleForms(selectedCountry);
            });
        }
    }

    // Відображення форми залежно від країни
    const savedCountry = localStorage.getItem("country") || "USA";
    toggleForms(savedCountry);
});

function toggleForms(selectedCountry) {
    const formUSA = document.getElementById("form-usa");
    const formIndia = document.getElementById("form-india");

    if (formUSA) {
        if (selectedCountry === "USA") {
            formUSA.style.display = "block";
            enableFormFields(formUSA);
        } else {
            formUSA.style.display = "none";
            disableFormFields(formUSA);
        }
    }

    if (formIndia) {
        if (selectedCountry === "India") {
            formIndia.style.display = "block";
            enableFormFields(formIndia);
        } else {
            formIndia.style.display = "none";
            disableFormFields(formIndia);
        }
    }

    // Оновлення прихованого поля в формі
    const countryField = document.getElementById("country");
    if (countryField) countryField.value = selectedCountry;
}

// Функція для відключення всіх полів у формі
function disableFormFields(form) {
    const fields = form.querySelectorAll("input, select, textarea");
    fields.forEach(field => field.setAttribute("disabled", "true"));
}

// Функція для увімкнення всіх полів у формі
function enableFormFields(form) {
    const fields = form.querySelectorAll("input, select, textarea");
    fields.forEach(field => field.removeAttribute("disabled"));
}

// Застосування збережених налаштувань
function applySettings() {
    // Теми
    const theme = localStorage.getItem("theme") || "light";
    document.body.classList.remove("light", "dark");
    document.body.classList.add(theme);

    // Шрифт
    const fontSize = localStorage.getItem("font-size") || "medium";
    const fontMultiplier = fontSize === "small" ? 1.0 :
                           fontSize === "medium" ? 1.5 : 2.0;

    document.documentElement.style.setProperty("--font-multiplier", fontMultiplier);
    console.log(`Font multiplier applied: ${fontMultiplier}`);
}


// Модальне вікно
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    const closeModal = document.getElementById("close-modal");

    // Відкриття модального вікна, якщо є прогноз
    if (modal && modal.querySelector("h2").textContent.trim() !== "$") {
        modal.style.display = "block";
    }

    // Закриття модального вікна
    if (closeModal) {
        closeModal.onclick = function () {
            modal.style.display = "none";
        };
    }

    // Закриття модального вікна при натисканні поза ним
    window.onclick = function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };
});

document.addEventListener("DOMContentLoaded", () => {
    const openModalBtn = document.getElementById("open-modal");
    const closeModalBtn = document.getElementById("close-custom-modal");
    const modal = document.getElementById("custom-modal");

    openModalBtn.addEventListener("click", () => {
        modal.style.display = "block";
    });

    closeModalBtn.addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
});
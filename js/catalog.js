const filtersForm = document.querySelector("#filtersForm");

if (filtersForm) {
    const allCheckbox = document.querySelector("#filter-all");

    const categoryCheckboxes = Array.from(
        filtersForm.querySelectorAll('input[name="category"]')
    );

    const specificCheckboxes = categoryCheckboxes.filter(
        checkbox => checkbox.value !== "all"
    );

    const priceFromInput = document.querySelector("#price-from");
    const priceToInput = document.querySelector("#price-to");

    const productCards = Array.from(
        document.querySelectorAll("[data-product-card]")
    );

    const productsCount = document.querySelector("#productsCount");
    const emptyResults = document.querySelector("#emptyResults");
    const filterError = document.querySelector("#filterError");

    /* Управление выбором категорий */
    categoryCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("change", () => {
            if (checkbox === allCheckbox && allCheckbox.checked) {
                specificCheckboxes.forEach(item => {
                    item.checked = false;
                });
            }

            if (checkbox !== allCheckbox && checkbox.checked) {
                allCheckbox.checked = false;
            }

            const hasSelectedCategory = specificCheckboxes.some(
                item => item.checked
            );

            if (!hasSelectedCategory) {
                allCheckbox.checked = true;
            }
        });
    });

    /* Применение фильтров */
    function applyFilters() {
        const minPrice = priceFromInput.value === ""
            ? 0
            : Number(priceFromInput.value);

        const maxPrice = priceToInput.value === ""
            ? Infinity
            : Number(priceToInput.value);

        if (minPrice > maxPrice) {
            filterError.hidden = false;
            return;
        }

        filterError.hidden = true;

        const selectedCategories = specificCheckboxes
            .filter(checkbox => checkbox.checked)
            .map(checkbox => checkbox.value);

        let visibleCount = 0;

        productCards.forEach(card => {
            const price = Number(card.dataset.price);
            const categories = card.dataset.categories.split(" ");

            const matchesCategory =
                allCheckbox.checked ||
                selectedCategories.some(category => {
                    return categories.includes(category);
                });

            const matchesPrice =
                price >= minPrice &&
                price <= maxPrice;

            const isVisible = matchesCategory && matchesPrice;

            card.hidden = !isVisible;

            if (isVisible) {
                visibleCount += 1;
            }
        });

        productsCount.textContent = `Найдено товаров: ${visibleCount}`;
        emptyResults.hidden = visibleCount !== 0;
    }

    /* Нажатие «Применить» */
    filtersForm.addEventListener("submit", event => {
        event.preventDefault();
        applyFilters();
    });

    /* Сброс полей и результатов */
    filtersForm.addEventListener("reset", () => {
        setTimeout(() => {
            applyFilters();
        }, 0);
    });

    /* Скрытие ошибки при исправлении цены */
    [priceFromInput, priceToInput].forEach(input => {
        input.addEventListener("input", () => {
            filterError.hidden = true;
        });
    });

    applyFilters();
}
const productPages = [
    "product.html",
    "product-abdula.html",
    "product-luchick.html"
];

const currentPage = window.location.pathname.split("/").pop();

/* Запоминаем открытую страницу товара */
if (productPages.includes(currentPage)) {
    localStorage.setItem("lastViewedProduct", currentPage);
}

/* Получаем последнюю просмотренную страницу */
const savedPage = localStorage.getItem("lastViewedProduct");

const lastProductPage = productPages.includes(savedPage)
    ? savedPage
    : "product.html";

/* Меняем ссылку пункта «Товар» */
document.querySelectorAll("[data-last-product]").forEach(link => {
    link.href = lastProductPage;
});
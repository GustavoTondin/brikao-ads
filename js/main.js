import { fetchProducts } from './services/api.js';
import { getFavorites, saveFavorites } from './services/favorites.js';
import { createProductCard } from './components/ProductCard.js';
import { createHeader } from './components/Header.js';

const headerContainer = document.getElementById('main-header');
const productsPage = document.getElementById('products-page');
const favoritesPage = document.getElementById('favorites-page');
const loadingIndicator = document.getElementById('loading-indicator');

let allProducts = [];
let favorites = getFavorites();
let darkMode = localStorage.getItem('darkMode') === 'true';

const renderProducts = (productsToRender) => {
    productsPage.innerHTML = '';
    productsToRender.forEach(product => {
        const isFavorite = favorites.includes(product.id);
        const card = createProductCard(product, isFavorite, toggleFavorite);
        productsPage.appendChild(card);
    });
};

const renderFavorites = () => {
    favoritesPage.innerHTML = '';
    const favoriteProducts = allProducts.filter(p => favorites.includes(p.id));
    favoriteProducts.forEach(product => {
        const card = createProductCard(product, true, toggleFavorite);
        favoritesPage.appendChild(card);
    });
};

const toggleFavorite = (productId) => {
    const index = favorites.indexOf(productId);
    if (index > -1) favorites.splice(index, 1);
    else favorites.push(productId);
    saveFavorites(favorites);
    if (productsPage.style.display !== 'none') renderProducts(allProducts);
    if (favoritesPage.style.display !== 'none') renderFavorites();
};

const showPage = (pageId) => {
    productsPage.style.display = 'none';
    favoritesPage.style.display = 'none';
    document.getElementById(pageId).style.display = 'flex';
    if (pageId === 'products-page') renderProducts(allProducts);
    else renderFavorites();
};

const filterProducts = (order) => {
    let sorted = [...allProducts];
    if (order === 'asc') sorted.sort((a,b) => a.price - b.price);
    else if (order === 'desc') sorted.sort((a,b) => b.price - a.price);
    renderProducts(sorted);
};

const searchProducts = (term) => {
    const lower = term.toLowerCase();
    const filtered = allProducts.filter(p => p.title.toLowerCase().includes(lower));
    renderProducts(filtered);
};

const toggleTheme = () => {
    darkMode = !darkMode;
    localStorage.setItem('darkMode', darkMode);
    document.body.classList.toggle('dark', darkMode);
};

const init = async () => {
    headerContainer.appendChild(createHeader(showPage, filterProducts, searchProducts, toggleTheme));
    document.body.classList.toggle('dark', darkMode);

    loadingIndicator.style.display = 'block';
    allProducts = await fetchProducts();
    loadingIndicator.style.display = 'none';

    renderProducts(allProducts);
};

init();

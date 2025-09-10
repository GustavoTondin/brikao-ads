export const createHeader = (onNavigate, onFilter, onSearch, onToggleTheme) => {
    const header = document.createElement('div');
    header.innerHTML = `
        <h1>BRIKAO DA ADS🛒💰</h1>
        <div class="nav-buttons">
            <button id="nav-products">Produtos</button>
            <button id="nav-favorites">Favoritos</button>
        </div>
        <br>
        <div class="search-theme">
            <input type="text" id="search-bar" placeholder="Pesquisar produtos...">
            <button id="btn-theme"><span class="icon">🌙</span></button>
        </div>
        <br>
        <div class="filter-controls">
            <label for="price-filter">Ordenar por Preço:</label>
            <select id="price-filter">
                <option value="none">Nenhum</option>
                <option value="asc">Menor para Maior</option>
                <option value="desc">Maior para Menor</option>
            </select>
        </div>
    `;

    const navProductsBtn = header.querySelector('#nav-products');
    const navFavoritesBtn = header.querySelector('#nav-favorites');
    const priceFilterSelect = header.querySelector('#price-filter');
    const searchBar = header.querySelector('#search-bar');
    const btnTheme = header.querySelector('#btn-theme');

    navProductsBtn.addEventListener('click', () => onNavigate('products-page'));
    navFavoritesBtn.addEventListener('click', () => onNavigate('favorites-page'));
    priceFilterSelect.addEventListener('change', (e) => onFilter(e.target.value));
    searchBar.addEventListener('input', (e) => onSearch(e.target.value));
    btnTheme.addEventListener('click', onToggleTheme);

    return header;
};

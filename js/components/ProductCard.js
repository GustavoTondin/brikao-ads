export const createProductCard = (product, isFavorite, onToggleFavorite) => {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const favoriteIcon = isFavorite ? '❤️' : '🤍';

    card.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h3>${product.title}</h3>
        <p>Preço: R$ ${product.price.toFixed(2)}</p>
        <button class="favorite-btn" data-id="${product.id}">${favoriteIcon}</button>
    `;

    const favoriteBtn = card.querySelector('.favorite-btn');
    favoriteBtn.addEventListener('click', () => {
        onToggleFavorite(product.id);
    });

    return card;
};
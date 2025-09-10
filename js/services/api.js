const API_URL = 'https://fakestoreapi.com/products';

export const fetchProducts = async () => {
    const response = await fetch(API_URL);
    return await response.json();
};
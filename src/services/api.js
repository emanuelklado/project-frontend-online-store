export async function getCategories() {
  const data = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const categories = await data.json();
  return categories;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const fetchData = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const categoriesAndQuery = await fetchData.json();
  return categoriesAndQuery;
}

export async function getProductByProductId(productId) {
  const fetchData = await fetch(`https://api.mercadolibre.com/items/${productId}`);
  const productInfo = await fetchData.json();
  return productInfo;
}

export async function getCategories() {
  // Implemente aqui
  const data = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const categories = await data.json();
  console.log('categories: ', categories);
  return categories;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
  const fetchData = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const categoriesAndQuery = await fetchData.json();
  console.log('catQuery ', categoriesAndQuery);
  return categoriesAndQuery;
  /* const filter = categories.filter((el) => el.name.includes(produto) || el.id.includes(umId));
  console.log('fil', filter); */
}

import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ProductListingList from '../components/AbaProdutos/productListingList';
import { products as fallbackProducts } from '../data/products';
import { getProducts } from '../services/catalog';

const ProductPage = () => {
  const [order, setOrder] = useState('menor-preco');
  const [products, setProducts] = useState(fallbackProducts);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const categoryFromUrl = searchParams.get('categoria') || '';
  const searchQuery = searchParams.get('filter')?.toLowerCase() || '';
  const [filters, setFilters] = useState(() => (
    categoryFromUrl ? [categoryFromUrl.charAt(0).toUpperCase() + categoryFromUrl.slice(1).toLowerCase()] : []
  ));

  useEffect(() => {
    getProducts()
      .then(({ data }) => {
        if (data.length > 0) setProducts(data);
      })
      .catch(() => {
        // O catálogo local mantém a demonstração utilizável sem a API.
      });
  }, []);

  const allFilters = [
    { label: 'Marca', options: ['Adidas', 'Balenciaga', 'K-Swiss', 'Nike', 'Puma', 'Stamp', 'OQVestir', 'JBL', 'MST'] },
    { label: 'Categoria', options: ['Camisetas', 'Calças', 'Bonés', 'Headphones', 'Tênis'] },
    { label: 'Gênero', options: ['Masculino', 'Feminino', 'Unissex'] },
    { label: 'Estado', options: ['Novo', 'Usado'] },
  ];

  const handleFilterChange = (value) => {
    setFilters((previous) => previous.includes(value)
      ? previous.filter((filter) => filter !== value)
      : [...previous, value]);
  };

  const processedProducts = (() => {
    const filtered = products.filter((product) => {
      const title = product.title?.toLowerCase() || '';
      const category = product.category?.toLowerCase() || '';
      const matchesSearch = !searchQuery || title.includes(searchQuery) || category.includes(searchQuery);
      const matchesFilter = filters.length === 0 || filters.some((filter) => (
        product.category === filter || product.brand === filter || product.gender === filter || product.condition === filter
      ));
      return matchesSearch && matchesFilter;
    });

    return [...filtered].sort((first, second) => (
      order === 'maior-preco' ? second.price - first.price : first.price - second.price
    ));
  })();

  return (
    <div className="flex flex-col lg:flex-row gap-8 px-4 sm:px-6 md:px-10 py-6 w-full">
      <aside className="w-full lg:w-[280px] flex-shrink-0">
        <h3 className="text-gray-700 text-[16px] font-semibold mb-4">Filtrar por:</h3>
        {allFilters.map((filter) => (
          <div key={filter.label} className="mb-6">
            <h4 className="text-xs text-gray-600 font-semibold mb-2">{filter.label}</h4>
            <div className="flex flex-col gap-2">
              {filter.options.map((option) => (
                <label key={option} className="flex items-center gap-2 text-sm text-gray-700 cursor-pointer">
                  <input type="checkbox" checked={filters.includes(option)} onChange={() => handleFilterChange(option)} className="w-4 h-4 accent-pink-500" />
                  {option}
                </label>
              ))}
            </div>
          </div>
        ))}
      </aside>
      <main className="flex-1 w-full">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <span className="text-sm text-gray-500">
            {filters.length === 0 ? <>Todos os produtos – <strong>{processedProducts.length}</strong> produto(s)</> : <>Resultados para <strong>{filters.join(', ')}</strong> – <strong>{processedProducts.length}</strong> produto(s)</>}
          </span>
          <div className="flex items-center gap-2">
            <label htmlFor="order" className="text-sm text-gray-600">Ordenar por:</label>
            <select id="order" value={order} onChange={(event) => setOrder(event.target.value)} className="h-[40px] border border-gray-300 rounded px-3 text-sm focus:ring-1 focus:ring-pink-500 outline-none">
              <option value="menor-preco">Menor preço</option>
              <option value="maior-preco">Maior preço</option>
            </select>
          </div>
        </div>
        <ProductListingList products={processedProducts} />
        <div className="flex justify-end mt-10 w-full border-t pt-6">
          <Link to="/pedidos" className="w-full sm:w-auto"><button className="w-full sm:w-auto px-8 py-3 bg-pink-700 hover:bg-pink-800 text-white font-semibold rounded shadow-md transition-all active:scale-95">Ir para o carrinho</button></Link>
        </div>
      </main>
    </div>
  );
};

export default ProductPage;
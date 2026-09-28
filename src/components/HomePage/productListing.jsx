import { useNavigate, useLocation } from 'react-router-dom';
import { HiArrowNarrowRight } from 'react-icons/hi';
import ProductCard from './productCard';

const ProductListing = ({ products }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const hasProducts = Array.isArray(products) && products.length > 0;

  const handleViewAll = () => {
    navigate('/produtos');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section className="px-4 mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold">Produtos em destaque:</h2>
        {isHomePage && <button onClick={handleViewAll} className="text-pink-600 text-sm font-medium flex items-center gap-1 hover:text-pink-700 transition group">Ver todos <HiArrowNarrowRight className="text-base transform group-hover:translate-x-1 transition-transform" /></button>}
      </div>
      {hasProducts ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
          {products.map((product, index) => <ProductCard key={product.id ?? `${product.name}-${index}`} product={product} />)}
        </div>
      ) : (
        <p className="rounded-lg border border-dashed border-gray-300 bg-white p-8 text-center text-gray-600">Nenhum produto está disponível nesta categoria.</p>
      )}
    </section>
  );
};

export default ProductListing;
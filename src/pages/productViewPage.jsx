import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import { products as fallbackProducts } from '../data/products';
import { getProductById, getProducts } from '../services/catalog';
import ImageGallery from '../components/imageGallery';
import ProductInfo from '../components/productInfo';
import RelatedProducts from '../components/relatedProducts';

const Breadcrumbs = ({ product }) => (
  <nav className="flex items-center text-sm text-gray-500 mb-4">
    <Link to="/" className="hover:text-pink-600">Home</Link>
    <FiChevronRight className="mx-2" />
    <Link to={`/produtos?categoria=${product.category}`} className="hover:text-pink-600">{product.category}</Link>
    <FiChevronRight className="mx-2" />
    <span className="font-semibold text-gray-700">{product.name}</span>
  </nav>
);

const ProductViewPage = () => {
  const { id } = useParams();
  const fallbackProduct = fallbackProducts.find((item) => item.id === Number(id));
  const [product, setProduct] = useState(fallbackProduct || null);
  const [allProducts, setAllProducts] = useState(fallbackProducts);
  const [loading, setLoading] = useState(!fallbackProduct);

  useEffect(() => {
    let active = true;
    Promise.all([getProductById(id), getProducts()])
      .then(([apiProduct, productsResult]) => {
        if (!active) return;
        setProduct(apiProduct);
        if (productsResult.data.length > 0) setAllProducts(productsResult.data);
      })
      .catch(() => {
        // A página permanece demonstrável mesmo sem o backend local ligado.
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, [id]);

  if (loading && !product) {
    return <div className="text-center py-20 text-gray-600">Carregando produto...</div>;
  }

  if (!product) {
    return <div className="text-center py-20 font-bold text-xl">Produto não encontrado.</div>;
  }

  const imageUrls = product.images?.map((image) => image.src) || [product.image];

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumbs product={product} />
        <main className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-12 mt-6">
          <ImageGallery images={imageUrls} />
          <ProductInfo product={product} />
        </main>
        <RelatedProducts currentProduct={product} allProducts={allProducts} />
      </div>
    </div>
  );
};

export default ProductViewPage;
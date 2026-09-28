import { useState } from 'react';

const SafeImage = ({ src, alt, className = '', fallback = '/product-thumb-1.jpeg' }) => {
  const [currentSrc, setCurrentSrc] = useState(src || fallback);

  return <img src={currentSrc} alt={alt} className={className} onError={() => setCurrentSrc(fallback)} />;
};

export default SafeImage;
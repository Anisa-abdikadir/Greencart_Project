import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../Context/AppContext';
import ProductCard from '../Components/ProductCard';
import { categories } from '../assets/assets';

const ProductCategory = () => {
  const { category } = useParams();
  const { products } = useAppContext();

  const normalizedCategory = category?.toLowerCase();
  const searchCategory = categories.find(
    (item) => item.path.toLowerCase() === normalizedCategory
  );

  const filteredProducts = products.filter(
    (product) => product.category?.toLowerCase() === normalizedCategory
  );

  return (
    <div className="mt-16">
      {searchCategory && (
        <div className="flex flex-col items-end w-max">
          <p className="text-2xl font-medium uppercase">{searchCategory.text.toLowerCase()}</p>
          <div className="w-16 h-0.5 bg-primary rounded-full" />
        </div>
      )}

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 lg:grid-cols-5 mt-6 sm:grid-cols-3">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      ) : (
        <div className="flex items-baseline justify-center h-[96vh]">
          <p className="text-2xl font-medium text-primary">No products found in this category.</p>
        </div>
      )}
    </div>
  );
};

export default ProductCategory;

import { useAppContext } from "../Context/AppContext"
import ProductCard from "./ProductCard"

const BestSeller = () => {

  const {products} =useAppContext();
  return (
    <div className='mt-6'>
        <p className='text-2xl md:text-3xl font-medium'>bestseller</p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3  md:gap-6  lg:grid-cols-5 mt-6" >
        

            {products
              .filter((product) => product.inStock)
              .slice(0, 5)
              .map((product) => (
                  <ProductCard
                      key={product._id}
                      product={product}
                  />
    ))
}


        </div>
      
    </div>
  )
}

export default BestSeller

import React, { useContext } from "react";
import { productProvider } from "../../../Context/ProductContext";
import { toast } from "react-hot-toast";
import { userProvider } from "../../../Context/UserContext";
import { cartProvider } from "../../../Context/CartContext";

const FeaturedProducts = () => {
  const { products } = useContext(productProvider);
  const { products: cartProducts, refetch } = useContext(cartProvider);
  const {user} = useContext(userProvider)

  const handleAddCart = (id) => {
    const alReadyAdded = cartProducts.find(
      (product) => product.productId === id
    );
    if (alReadyAdded) {
      toast.error("product already added");
      return;
    }
    const product = {
      productId: id,
      quantity: 1,
      user: user?.email,
    };
    fetch(`http://localhost:5000/cart/`, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((res) => res.json())
      .then(() => {
        toast.success("product added into cart");
        refetch();
      });
  };

  return (
    <div className="my-8">
      <h2 className="text-xl font-bold mb-4">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.slice(0, 4).map((product) => (
          <div
            key={product?._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden transition duration-500 ease-in-out transform hover:-translate-y-1 hover:shadow-xl max-w-sm mx-auto"
          >
            <img
              className="w-auto mx-auto h-48"
              src={product?.picture}
              alt={product?.name}
            />
            <div className="p-4">
              <h3 className="text-gray-900 font-bold text-md mb-2">
                {product?.name.length > 30
                  ? product?.name.slice(0, 30) + "..."
                  : product?.name}
              </h3>
              <div className="flex items-baseline mb-2">
                <span className="text-gray-600 font-bold text-lg mr-2">
                  ${product?.price}
                </span>
              </div>
              <p className="text-gray-700 leading-6 text-sm mb-5">
                {product?.description.length > 100
                  ? product?.description.slice(0, 100) + "..."
                  : product?.description}
              </p>
              <button onClick={()=>handleAddCart(product._id)} className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-500 ease-in-out">
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;

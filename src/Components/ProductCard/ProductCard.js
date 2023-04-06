import React from "react";
import { ImPriceTags } from "react-icons/im";
import { Link } from "react-router-dom";

const ProductCard = ({ product }) => {
  const {
    picture,
    name,
    description,
    price,
    _id,
  } = product;

  return (
    <Link
      to={`/products/${_id}`}
      className={`card w-full h-full max-w-sm mx-auto border rounded-sm`}
    >
      <div>
        <img className="h-80 mx-auto" src={picture} alt="ProductImage" />
      </div>
      <div className="card-body p-3">
        <div>
          <h2 className="text-normal font-bold">{name.length > 40 ?  name.slice(0, 40) + "..."
              : name}</h2>
          <p className="text-xs">
            {description.length > 150
              ? description.slice(0, 150) + "..."
              : description}
          </p>
        </div>
        <div>
          <div className="flex gap-3 my-2 justify-between">
            <span className="flex items-center gap-1 text-md font-semibold">
              <ImPriceTags></ImPriceTags> Price: <span className="font-bold">${price}</span>
            </span>
          </div>
        </div>
        <div className="mx-auto">
          <button
            // disabled={user?.email === postedBy}
            className={`font-semibold px-5 border py-2 hover:text-emerald-700 hover:border-emerald-700`}
          >
            View Details
          </button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;

import ProductCard from "../ProductCard";
import {
  cardContainer,
  productForm,
  removeCard,
  updateElement,
  btn,
} from "./product.module.scss";

const ProductForm = ({ addCard, resultsFromOcr }) => {
  return (
    <form className={productForm}>
      <button type="button" onClick={addCard} className={btn}>
        Add Item
      </button>
      <div className={cardContainer}>
        {resultsFromOcr.map((product) => (
          <ProductCard
            product={product}
            key={product.id}
            removeCard={removeCard}
            updateElement={updateElement}
          />
        ))}
      </div>
      <button type="button" onClick={addCard} className={btn}>
        Add Item
      </button>
    </form>
  );
};

export default ProductForm;

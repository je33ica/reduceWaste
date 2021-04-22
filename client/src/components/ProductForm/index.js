import ProductCard from "../ProductCard";
import { cardContainer, productForm, btn } from "./product.module.scss";

const ProductForm = ({
  addCard,
  resultsFromOcr,
  removeCard,
  updateElement,
  submitProductCardstoDB,
}) => {
  return (
    <form className={productForm}>
      <button type="button" className={btn} onClick={submitProductCardstoDB}>
        Save Products to Database
      </button>
      <button type="button" onClick={() => addCard("start")} className={btn}>
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
      <button type="button" onClick={() => addCard("end")} className={btn}>
        Add Item
      </button>
    </form>
  );
};

export default ProductForm;

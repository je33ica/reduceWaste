import Loading from "../Loading";
import PopUpAlert from "../PopUpAlert";
import ProductCard from "../ProductCard";
import {
  cardContainer,
  productForm,
  btn,
  singleCard,
} from "./product.module.scss";

const ProductForm = ({
  addCard,
  productsArr,
  removeCard,
  updateElement,
  submitProductCardstoDB,
  loading,
  displayPopup,
  single,
}) => {
  return (
    <form className={productForm}>
      {displayPopup.show && (
        <PopUpAlert
          type={displayPopup.type}
          message={displayPopup.message}
          hideLoad
        />
      )}
      <button type="button" className={btn} onClick={submitProductCardstoDB}>
        {single ? "Save Product to your store" : "Save Products to your store"}
      </button>
      {!single && (
        <button type="button" onClick={() => addCard("start")} className={btn}>
          Add Item to Form
        </button>
      )}
      {loading && <Loading />}
      <div className={productsArr.length === 1 ? singleCard : cardContainer}>
        {productsArr.map((product) => (
          <ProductCard
            product={product}
            key={product.id}
            removeCard={removeCard}
            updateElement={updateElement}
            single={single}
          />
        ))}
      </div>
      {productsArr.length > 4 && (
        <>
          <button
            type="button"
            className={btn}
            onClick={submitProductCardstoDB}
          >
            Save Products to your store
          </button>
          <button type="button" onClick={() => addCard("end")} className={btn}>
            Add Item to Form
          </button>
        </>
      )}
      {(loading && productsArr.length > 8) && <Loading />}
    </form>
  );
};

export default ProductForm;

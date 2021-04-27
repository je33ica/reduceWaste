import { card, customSelect } from "./productcard.module.scss";

const ProductCard = ({ product, removeCard, updateElement }) => {
  return (
    <div className={card}>
      <label htmlFor="productName">Product</label>
      <input
        type="text"
        name="productName"
        value={product.productName}
        onChange={(e) =>
          updateElement(e.target.value, e.target.name, product.id)
        }
        required
      />
      <label htmlFor="amount">
        Amount - <em>Optional</em>
      </label>
      <input
        type="text"
        name="amount"
        value={product.amount}
        onChange={(e) =>
          updateElement(e.target.value, e.target.name, product.id)
        }
      />
      <label htmlFor="EAN">
        EAN (barcode) - <em>Optional</em>
      </label>
      <input
        type="text"
        name="EAN"
        value={product.EAN}
        onChange={(e) =>
          updateElement(e.target.value, e.target.name, product.id)
        }
      />
      <label htmlFor="category">Category</label>
      <select
        name="category"
        id=""
        value={product.category}
        onChange={(e) => {
          updateElement(e.target.value, e.target.name, product.id);
        }}
        className={customSelect}
      >
        <option value="" disabled hidden>
          Choose a category
        </option>
        <option value="Fresh">Fresh</option>
        <option value="Frozen">Frozen</option>
        <option value="Dry">Dry</option>
        <option value="General">General</option>
      </select>

      <label htmlFor="expiry">Expiry</label>
      <input
        type="date"
        name="expiry"
        value={product.expiry}
        onChange={(e) =>
          updateElement(e.target.value, e.target.name, product.id)
        }
      />
      <button
        className="btn"
        type="button"
        onClick={() => removeCard(product.id)}
      >
        Remove Item
      </button>
    </div>
  );
};

export default ProductCard;

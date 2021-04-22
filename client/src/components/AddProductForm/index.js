import { useEffect } from "react";

const AddProductForm = ({
  productName,
  productAmount,
  expiryDate,
  submitProductHandler,
}) => {
  //   submitProductHandler;

  return (
    <div>
      <form className="form" onSubmit={submitProductHandler}>
        <h2>Add Products</h2>
        <label>Product name</label>
        <input type="text" name="product" ref={productName} required></input>
        <label>Amount</label>
        <input type="text" name="amount" ref={productAmount} required></input>
        <label>Expiry</label>
        <input type="date" name="expiry" ref={expiryDate} required></input>
        <p>
          <button className="btn" type="submit">
            Add product
          </button>
        </p>
      </form>
    </div>
  );
};

export default AddProductForm;

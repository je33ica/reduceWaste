import { useEffect } from "react";



  return (
    <div>
      <form className="form" onSubmit={submitProductHandler}>
        <h2>Add Products</h2>
        <label>Product name</label>
        
        <label>Amount</label>
        
        <label>Expiry</label>
       
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

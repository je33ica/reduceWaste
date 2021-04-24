const DashboardTable = ({ products, ingredients, updateIngredients }) => {
  const daysToExpiry = (expiry) => {
    const dateNow = Date.now();
    const expiryToUnix = Date.parse(expiry);
    return Math.floor((expiryToUnix - dateNow) / (1000 * 60 * 60 * 24));
  };

  //   console.log("today", dateNow);
  //   const expiryToUnix = Date.parse(products[0].expiry);
  //   console.log("unix", expiryToUnix);
  //   console.log("expiry", products[0].expiry);
  //   console.log(
  //     "diff",
  //     Math.floor((expiryToUnix - dateNow) / (1000 * 60 * 60 * 24))
  //   );

  //   const expDate = new Date(Date.now() + 863600000),
  //   //THREEWKS = 1000 * 3600 * 24 * 7 * 3; // milliseconds in 3 weeks

  return (
    <div className="grid">
      <div>
        <table>
          <tr>
            <th>Product</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Expiry date</th>
            <th>Days until expiry</th>
            <th>Add to recipe finder</th>
          </tr>
          {products.map((product) => {
            return (
              <tr key={product._id}>
                <td>{product.productName}</td>
                <td>{product.amount}</td>
                <td>{product.category || "General"}</td>
                <td>{product.expiry.slice(0, 10)}</td>
                <td>{daysToExpiry(product.expiry)}</td>
                <td><input type="checkbox" name={product.productName} value={ingredients[product.productName]} onChange={(e) => updateIngredients(e.target.name)}/></td>
              </tr>
            );
          })}
          {/* <tr>
            <td></td>
            <td>Smith</td>
            <td>50</td>
          </tr> */}
        </table>
      </div>
    </div>
  );
};

export default DashboardTable;

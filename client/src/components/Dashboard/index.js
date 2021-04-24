const DashboardTable = ({ products }) => {
  return (
    <div className="grid">
      <div>
        <table>
          <tr>
            <th>Product</th>
            <th>Amount</th>
            <th>Expiry date</th>
            <th>Days until expiry</th>
          </tr>
          {products.map((product) => {
            return (
              <tr key={product._id}>
                <td>{product.productName}</td>
                <td>{product.amount}</td>
                <td>{product.expiry.slice(0, 10)}</td>
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

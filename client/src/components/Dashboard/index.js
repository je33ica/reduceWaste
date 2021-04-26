import { tableContainer } from "./dashboard.module.scss";
//import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
const DashboardTable = ({ products, ingredients, updateIngredients }) => {
  const calculateDaysToExpiry = (expiry) => {
    const dateNow = Date.now();
    const expiryToUnix = Date.parse(expiry);
    return Math.floor((expiryToUnix - dateNow) / (1000 * 60 * 60 * 24));
  };

  const categoryColour = (category, daysToExpiry) => {
    if (category === "Dry") {
      return dryColour(daysToExpiry);
    } else if (category === "Frozen") {
      return frozenColour(daysToExpiry);
    } else if (category === "Fresh") {
      return freshColour(daysToExpiry);
    } else {
      return generalColour(daysToExpiry);
    }
  };

  const generalColour = (daysToExpiry) => {
    if (daysToExpiry < 7) {
      return "redAlert";
    } else if (daysToExpiry < 14) {
      return "orangeAlert";
    } else {
      return "";
    }
  };

  const dryColour = (daysToExpiry) => {
    if (daysToExpiry < 14) {
      return "redAlert";
    } else if (daysToExpiry < 28) {
      return "orangeAlert";
    } else {
      return "";
    }
  };
  const frozenColour = (daysToExpiry) => {
    if (daysToExpiry < 28) {
      return "redAlert";
    } else if (daysToExpiry < 60) {
      return "orangeAlert";
    } else {
      return "";
    }
  };
  const freshColour = (daysToExpiry) => {
    if (daysToExpiry < 3) {
      return "redAlert";
    } else if (daysToExpiry < 7) {
      return "orangeAlert";
    } else {
      return "";
    }
  };

  //sort array by date
  //mongo could sort bydate - remove anythin that has expired by 1 day
  const productsWithColour = products.map((product) => {
    const daysToExpiryCondition = calculateDaysToExpiry(product.expiry);
    const colour = categoryColour(product.category, daysToExpiryCondition);
    product.colour = colour;
    return product;
  });

  const redSorted = [];
  const orangeSorted = [];
  const generalSorted = [];
  productsWithColour.forEach((product) => {
    if (product.colour == "redAlert") {
      redSorted.push(product);
    } else if (product.colour == "orangeAlert") {
      orangeSorted.push(product);
    } else {
      generalSorted.push(product);
    }
  });

  const sortedProducts = [...redSorted, ...orangeSorted, ...generalSorted];

  const removeProduct = (id) => {
    fetch(`api/users/products${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }).then(() => {
      console.log("im the delte in dash", id);
    });
    //   // .then((response) => response.json())
    //   .then((data) => console.log("im the data ", data)) // Manipulate the data retrieved back, if we want to do something with it
    //   .catch((err) => console.log("im the err", err)); // Do something with the error
    // console.log("im the id", id);
  };

  const productsComponent = sortedProducts.map((product) => {
    const daysToExpiryCondition = calculateDaysToExpiry(product.expiry);

    const { colour } = product;
    return (
      <tr className={`${colour} productTR`} key={product._id}>
        <td>
          {product.productName.length > 20
            ? product.productName.slice(0, 17) + "..."
            : product.productName}
        </td>
        <td>{product.amount}</td>

        <td>{product.category || "General"}</td>
        <td>{product.expiry.slice(0, 10)}</td>
        <td>{daysToExpiryCondition}</td>
        <td className="operation">
          <button onClick={() => removeProduct(product._id)}>Delete</button>
        </td>
        <td>
          <input
            type="checkbox"
            name={product.productName}
            value={ingredients[product.productName]}
            onChange={(e) => updateIngredients(e.target.name)}
          />
        </td>
      </tr>
    );
  });

  return (
    <>
      <table className={tableContainer}>
        <thead className="headers">
          <tr>
            <th>Product</th>
            <th>Amount</th>
            <th>Category</th>
            <th>Expiry date</th>
            <th>Days until expiry</th>
            <th>Delete Item</th>
            <th>Add to recipe finder</th>
          </tr>
        </thead>
        <tbody>{productsComponent}</tbody>
      </table>
    </>
  );
};

export default DashboardTable;

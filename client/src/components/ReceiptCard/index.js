import {card} from "./receiptcard.module.scss"

const ReceiptCard = ({product, removeCard, updateElement})=> {
  return (
    <div className={card}>
      <label htmlFor="productName">Product</label>
      <input type="text" name="productName" value={product.productName} onChange={(e) => updateElement(e.target.value, e.target.name, product.id)}/>
      <label htmlFor="amount">Amount</label>
      <input type="text" name="amount" value={product.amount} onChange={(e) => updateElement(e.target.value, e.target.name, product.id)}/>
      <label htmlFor="expiry">Expiry</label>
      <input type="date" name="expiry" value={product.expiry} onChange={(e) => updateElement(e.target.value, e.target.name, product.id)}/>
      <button type="button" onClick={() => removeCard(product.id)}>Remove Item</button>
    </div>
  )
}

export default ReceiptCard
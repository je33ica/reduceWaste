import {card} from "./receiptcard.module.scss"

const ReceiptCard = ({product, removeCard})=> {
  return (
    <div className={card}>
      <label htmlFor="title">Product</label>
      <input type="text" name="title" value={product.productName}/>
      <label htmlFor="amount">Amount</label>
      <input type="text" name="amount" value={product.amount}/>
      <label htmlFor="expiry">Expiry</label>
      <input type="date" name="expiry" value={product.expiry}/>
      <button type="button" onClick={() => removeCard(product.id)}>Remove Item</button>
    </div>
  )
}

export default ReceiptCard
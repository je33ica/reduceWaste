import {card} from "./receiptcard.module.scss"

const ReceiptCard = ({product})=> {
  return (
    <div className={card}>
      <label htmlFor="title">Product</label>
      <input type="text" name="title" value={product.productName}/>
      <label htmlFor="amount">Amount</label>
      <input type="text" name="amount" value={product.amount}/>
      <label htmlFor="expiry">Expiry</label>
      <input type="date" name="expiry" value={product.expiry}/>
    </div>
  )
}

export default ReceiptCard
import {card} from "./receiptcard.module.scss"

const ReceiptCard = ({product})=> {
  return (
    <div className={card}>
      <h1>{product}</h1>
    </div>
  )
}

export default ReceiptCard
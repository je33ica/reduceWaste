import {tooltip} from "./navicon.module.scss"

const Tooltip = ({text}) => {
  return (
    <div className={tooltip}>{text}</div>
  )
}

export default Tooltip
import { useState } from "react";
import Tooltip from "./Tooltip";
import { keyItem } from "./infoKey.module.scss";

const Keyitem = ({ item }) => {
  const [displayTooltip, setDisplayTooltip] = useState(null);
  const toggleTooltip = (bool) => {
    setDisplayTooltip(bool);
  };
  return (
    <div
      className={keyItem}
      onMouseEnter={() => toggleTooltip(true)}
      onMouseLeave={() => toggleTooltip(false)}
      style={{
        backgroundColor: item.backgroundColor,
        position: "relative",
        borderStyle: item.borderStyle,
      }}
    >
      <p>{item.keyText}</p>
      {displayTooltip && <Tooltip text={item.tooltip} />}
    </div>
  );
};
export default Keyitem;

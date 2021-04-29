import { useState } from "react";
import Tooltip from "./Tooltip";

const Keyitem = ({ item }) => {
  const [displayTooltip, setDisplayTooltip] = useState(null);
  const toggleTooltip = () => {
    setDisplayTooltip(!displayTooltip);
  };
  return (
    <div
      onMouseOver={toggleTooltip}
      onMouseLeave={toggleTooltip}
      style={{ backgroundColor: item.backgroundColor, position: "relative" }}
    >
      <p>{item.keyText}</p>
      {displayTooltip && <Tooltip text={item.tooltip} />}
    </div>
  );
};
export default Keyitem;

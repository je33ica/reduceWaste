import { boxes } from "./infoKey.module.scss";

import Keyitem from "./KeyItem";

const InfoKey = () => {
  const keyArr = [
    {
      tooltip: "These items will need to be used as soon as possible",
      keyText: "USE IMMEDIATELY",
      backgroundColor: "#da5959",
    },
    {
      tooltip: "These items will need using shortly",
      keyText: "WARNING",
      backgroundColor: "orange",
    },
  ];

  return (
    <>
      <div className={boxes}>
        {keyArr.map((item) => (
          <Keyitem key={item.tooltip} item={item} />
        ))}
      </div>
    </>
  );
};
export default InfoKey;

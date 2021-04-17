import Loading from "../Loading";
import { popupAlert, success, failure } from "./popup.module.scss";

const PopUpAlert = ({ type, message }) => {
  return (
    <div
      className={
        type === "success"
          ? `${popupAlert} ${success}`
          : `${popupAlert} ${failure}`
      }
    >
      <p>{message}</p>
      {type === "success" && <Loading />}
    </div>
  );
};

export default PopUpAlert;

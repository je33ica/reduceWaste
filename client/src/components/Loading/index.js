import spinnerGif from "../../assets/loading/spinner.gif";
import { loadingCont, loadingSpinner } from "./loading.module.scss";

const Loading = () => {
  return (
    <div className={loadingCont}>
      <img className={loadingSpinner} src={spinnerGif} alt="loading gif" />
    </div>
  );
};

export default Loading;

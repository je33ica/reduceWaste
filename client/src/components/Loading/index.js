import spinnerGif from "../../assets/loading/spinner.gif";
import { loadingCont } from "./loading.module.scss";

const Loading = () => {
  return (
    <div className={loadingCont}>
      <img src={spinnerGif} alt="loading gif" />
    </div>
  );
};

export default Loading;

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import icons from "../../icons";

const TextAlert = ({ type, message }) => {
  return (
    <small className={`alert alert-${type}`}>
      <FontAwesomeIcon icon={icons.warning} />
      &nbsp; &nbsp;
      {message}
    </small>
  );
};

export default TextAlert;

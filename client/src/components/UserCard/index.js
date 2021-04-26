import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import icons from "../../icons"
import {card, icon, content} from "./usercard.module.scss"

const UserCard = ({user}) => {
  const humanReadableDate = new Date(user.userCreated).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
  return (
    <div className={card}>
      <div className={icon}>
        <FontAwesomeIcon icon={icons.userCircle} />
      </div>
      <div className={content}>
        <h2 style={{textAlign: "left"}}>{user.username}</h2>
        <h3><FontAwesomeIcon icon={icons.email}/> : {user.email}</h3>
        <h5>User Since: {humanReadableDate}</h5>
      </div>
    </div>
  )
};

export default UserCard
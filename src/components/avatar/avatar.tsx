import "./avatar.style.css";
import { useQuery } from "@apollo/client";

import { GET_USER } from "../../api";
export default function Avatar() {
  const { data, loading, error } = useQuery(GET_USER);
  return (
    <div className="avatar">
      <div className="avatar-img-box">
        <img src="/profile-picture.jpg" alt="profile picture" />
      </div>
      <div className="avatar-text-box">
        <p>Good morning</p>
        {data && <p>{data.getUser.name}</p>}
      </div>
    </div>
  );
}

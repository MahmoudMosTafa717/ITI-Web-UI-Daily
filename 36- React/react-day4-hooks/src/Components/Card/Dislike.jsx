import { memo } from "react";
import "./Card.css";

const Dislike = memo(({ count, onDislike }) => {
  return (
    <button className="action-btn dislike-btn" onClick={onDislike}>
      <i className="fa-regular fa-thumbs-down"></i>
      <span className="count-badge">{count}</span>
    </button>
  );
});

export default Dislike;

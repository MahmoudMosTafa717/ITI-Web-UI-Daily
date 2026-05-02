import "./Card.css";

function Like({ count, onLike }) {
  return (
    <button className="action-btn like-btn" onClick={onLike}>
      <i className="fa-regular fa-thumbs-up"></i>
      <span className="count-badge">{count}</span>
    </button>
  );
}

export default Like;

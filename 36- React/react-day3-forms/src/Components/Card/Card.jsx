import Like from "./Like.jsx";
import Dislike from "./Dislike.jsx";
import "./Card.css";

function Card({ post, handleVote }) {

  const handleLike = () => {
    handleVote(post.id, "likes");
  };

  const handleDislike = () => {
    handleVote(post.id, "dislikes");
  };

  return (
    <div className="card">
      <div className="card-image-container">
        <img className="card-image" src={post.image} alt={post.title} />
      </div>
      <div className="card-content">
        <h3 className="card-title">{post.title}</h3>
        <p className="card-description">{post.description}</p>
        
        {post.tags && post.tags.length > 0 && (
          <div className="card-tags">
            {post.tags.map((tag, index) => (
              <span key={index} className="card-tag">
                #{tag}
              </span>
            ))}
          </div>
        )}

        <div className="card-actions">
          <Like count={post.likes || 0} onLike={handleLike} />
          <Dislike count={post.dislikes || 0} onDislike={handleDislike} />
        </div>
      </div>
    </div>
  );
}

export default Card;

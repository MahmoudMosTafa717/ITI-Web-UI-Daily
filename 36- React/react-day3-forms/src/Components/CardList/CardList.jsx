import Card from "../Card/Card.jsx";
import "./CardList.css";

function CardList({ posts = [], handleVote }) {
  return (
    <div className="card-list">
      {posts.map((post) => (
        <Card key={post.id} post={post} handleVote={handleVote} />
      ))}
    </div>
  );
}

export default CardList;

import Card from "../Card/Card.jsx";
import "./CardList.css";

function CardList({ posts = [], handleVote }) {
  return (
    <div className="card-list">
      {posts.length > 0 ? (
        posts.map((post) => (
          <Card key={post.id} post={post} handleVote={handleVote} />
        ))
      ) : (
        <p className="no-posts">No posts found matching your criteria.</p>
      )}
    </div>
  );
}

export default CardList;

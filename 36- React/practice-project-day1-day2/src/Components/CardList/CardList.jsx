import Card from "../Card/Card";
import "./CardList.css";

const CardList = ({ posts = [] }) => {
  return (
    <div className="card-list">
      {posts.map((post) => (
        <Card key={post.id} post={post} />
      ))}
    </div>
  );
};

export default CardList;

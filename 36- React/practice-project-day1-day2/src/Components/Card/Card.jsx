import "./Card.css";

const Card = ({ post }) => {
  return (
    <div className="card">
      <img className="card-image" src={post.image} alt={post.title} />
      <h3 className="card-title">{post.title}</h3>
      <p className="card-description">{post.description}</p>
    </div>
  );
};

export default Card;

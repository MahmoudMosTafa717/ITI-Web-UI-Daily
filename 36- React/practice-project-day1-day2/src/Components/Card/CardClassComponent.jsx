import { Component } from "react";
import "./Card.css";

class CardClassComponent extends Component {
  render() {
    const { post } = this.props;

    return (
      <div className="card">
        <img className="card-image" src={post.image} alt={post.title} />
        <h3 className="card-title">{post.title}</h3>
        <p className="card-description">{post.description}</p>
      </div>
    );
  }
}

export default CardClassComponent;

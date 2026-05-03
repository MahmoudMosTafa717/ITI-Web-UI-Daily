import { Component } from "react";
import Card from "../Card/Card";
import "./CardList.css";

class CardListClassComponent extends Component {
  render() {
    const posts = this.props.posts || [];

    return (
      <div className="card-list">
        {posts.map((post) => (
          <Card key={post.id} post={post} />
        ))}
      </div>
    );
  }
}

export default CardListClassComponent;

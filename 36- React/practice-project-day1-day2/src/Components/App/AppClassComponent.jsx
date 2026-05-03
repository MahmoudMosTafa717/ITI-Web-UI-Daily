import { Component } from "react";
import "./App.css";
import Header from "../Header/Header";
import Slider from "../Slider/Slider";
import Form from "../Form/Form";
import CardList from "../CardList/CardList";
import Footer from "../Footer/Footer";
import posts from "../../data/posts.json";

class AppClassComponent extends Component {
  render() {
    return (
      <div className="app">
        <Header />
        <Slider />
        <main className="main-content">
          <div className="main-left">
            <Form />
          </div>
          <div className="main-right">
            <h2 className="section-title">Latest Posts</h2>
            <CardList posts={posts} />
          </div>
        </main>
        <Footer />
      </div>
    );
  }
}

export default AppClassComponent;

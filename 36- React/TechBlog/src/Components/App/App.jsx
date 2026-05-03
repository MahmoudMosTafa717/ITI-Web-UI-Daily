import React from "react";
import "../App/App.css";
import Form from "../Form/Form";
import Header from "../Header/Header";
import Slider from "../Slider/Slider";
import CardList from "../CardList/CardList";
import Footer from "../Footer/Footer";
import postsData from "../../data/posts.json";

// FUNCTION VERSION (commented)
/*
function App() {
  return (
    <>
      <Header />
      <Slider />
      <Form />
      <CardList />
      <Footer />
    </>
  );
}
*/

// CLASS VERSION (used)
class App extends React.Component {
  // App holds posts in state and passes them down via props
  constructor(props) {
    super(props);
    this.state = {
      posts: postsData,
    };
  }

  render() {
    return (
      <>
        <Header />
        <Slider />
        <main className="main">
          <div className="left">
            <Form />
          </div>
          <div className="right">
            <CardList posts={this.state.posts} />
          </div>
        </main>
        <Footer />
      </>
    );
  }
}

export default App;

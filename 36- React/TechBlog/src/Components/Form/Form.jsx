// Form.jsx
// This component renders a form to add new blog posts.
import React from "react";
import "./Form.css";

// FUNCTION VERSION (commented)
/*
function Form({ addPost }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  // This version used hooks; kept only for reference.
}
*/

// CLASS VERSION (used)
class Form extends React.Component {
  // Local state for input values
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      image: "",
    };
  }

  // Generic change handler for inputs
  handleChange = (e) => {
    const { name, value } = e.target;
    this.setState({ [name]: value });
  };

  // Button click does not perform submission logic per requirements
  handleClick = (e) => {
    e.preventDefault();
    // No submission logic required. This is a UI-only form.
  };

  render() {
    return (
      <form className="form" onSubmit={this.handleClick}>
        <h2>Add New Post</h2>
        <input
          name="title"
          type="text"
          placeholder="Title"
          value={this.state.title}
          onChange={this.handleChange}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={this.state.description}
          onChange={this.handleChange}
        ></textarea>
        <input
          name="image"
          type="text"
          placeholder="Image URL"
          value={this.state.image}
          onChange={this.handleChange}
        />
        <button type="button" onClick={this.handleClick}>
          Add Post
        </button>
      </form>
    );
  }
}

export default Form;

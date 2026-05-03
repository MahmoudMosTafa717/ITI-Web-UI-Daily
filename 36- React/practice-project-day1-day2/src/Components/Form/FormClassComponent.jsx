import { Component } from "react";
import "./Form.css";

class FormClassComponent extends Component {
  render() {
    return (
      <form className="form">
        <h2 className="form-title">Contact Us</h2>

        <label className="form-label">Name</label>
        <input
          className="form-input"
          type="text"
          placeholder="Enter your name"
        />

        <label className="form-label">Email</label>
        <input
          className="form-input"
          type="email"
          placeholder="Enter your email"
        />

        <label className="form-label">Message</label>
        <textarea
          className="form-textarea"
          placeholder="Write your message"
          rows="5"
        ></textarea>

        <button className="form-button" type="button">
          Send Message
        </button>
      </form>
    );
  }
}

export default FormClassComponent;

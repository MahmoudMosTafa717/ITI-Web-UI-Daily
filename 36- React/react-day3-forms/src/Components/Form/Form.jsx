import { useState } from "react";
import "./Form.css";

function Form({ addPost }) {
  const [title, setTitle] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title || !imageUrl || !description) return;

    const newPost = {
      id: Date.now(),
      title,
      image: imageUrl,
      description,
      tags: tags.split(",").map((tag) => tag.trim()).filter((tag) => tag !== ""),
    };

    addPost(newPost);

    setTitle("");
    setImageUrl("");
    setDescription("");
    setTags("");
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <h2 className="form-title">Create Post</h2>

      <label className="form-label">Post Title</label>
      <input
        className="form-input"
        type="text"
        placeholder="Enter post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <label className="form-label">Image URL</label>
      <input
        className="form-input"
        type="url"
        placeholder="https://example.com/image.jpg"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />

      <label className="form-label">Description</label>
      <textarea
        className="form-textarea"
        placeholder="Write post description"
        rows="5"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <label className="form-label">Tags (comma separated)</label>
      <input
        className="form-input"
        type="text"
        placeholder="e.g. react, tech, coding"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />

      <button className="form-button" type="submit">
        Add Post
      </button>
    </form>
  );
}

export default Form;

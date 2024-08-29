import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPost } from "../../redux/reducers/postReducer";
import "../CreatePostForm/CreatePostForm.scss";
import { useNavigate } from "react-router-dom";

const CreatePostForm = () => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [pictures, setPictures] = useState([]);
  const [video, setVideo] = useState(null);
  const [error, setError] = useState("");

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);
  const handlePicturesChange = (e) => setPictures(Array.from(e.target.files));
  const handleVideoChange = (e) => setVideo(e.target.files[0]);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      setError("Titre et contenu sont requis.");
      return;
    }

    const postData = {
      title,
      content,
      pictures: pictures.map((file) => URL.createObjectURL(file)),
      video: video ? URL.createObjectURL(video) : null,
    };

    try {
      await dispatch(addPost(postData)).unwrap();
      setTitle("");
      setContent("");
      setError("");
      navigate("/");
    } catch (err) {
      setError("Erreur lors de la création du post.");
    }
  };

  return (
    <div className="create-post-form">
      <h2>Créer un Nouveau Post</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="title">Titre</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={handleTitleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Contenu</label>
          <textarea
            id="content"
            value={content}
            onChange={handleContentChange}
            required
          ></textarea>
        </div>
        {/* <div className="form-group">
          <label htmlFor="pictures">Images (optionnel)</label>
          <input
            type="file"
            id="pictures"
            multiple
            onChange={handlePicturesChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="video">Vidéo (optionnel)</label>
          <input
            type="file"
            id="video"
            accept="video/*"
            onChange={handleVideoChange}
          />
        </div> */}
        <button type="submit">Créer le Post</button>
      </form>
    </div>
  );
};

export default CreatePostForm;

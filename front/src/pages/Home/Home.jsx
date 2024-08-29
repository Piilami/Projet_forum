import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../redux/reducers/postReducer";
import PostList from "../../components/postList/PostList";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import { useNavigate } from "react-router-dom";
import "./Home.scss";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [sortType, setSortType] = useState("recent");

  useEffect(() => {
    dispatch(fetchPosts())
      .then((response) => console.log("Posts fetched:", response))
      .catch((error) => console.error("Error fetching posts:", error));
  }, [dispatch]);

  const { posts, loading, error } = useSelector((state) => state.posts);
  console.log(posts);

  const handleSortChange = (type) => {
    setSortType(type);
  };

  const sortedPosts = () => {
    if (!posts || posts.length === 0) return [];

    if (sortType === "recent") {
      return [...posts].sort((a, b) => new Date(b.date) - new Date(a.date));
    }
    if (sortType === "popular") {
      return [...posts].sort(
        (a, b) => b.votes.upvote.length - a.votes.upvote.length
      );
    }
    if (sortType === "weekly") {
    }
    return posts;
  };

  return (
    <main className="main__home">
      <button
        aria-label="Bouton de redirection pour ajout de post"
        className="btn-open-add-form"
        onClick={() => navigate("/add-post")}
      >
        Ajouter un post
      </button>
      <div className="article-sorter">
        <button
          aria-label="bouton de tri des posts du plus récent au plus vieux"
          className="article-sort__btn"
          onClick={() => handleSortChange("recent")}
        >
          Plus récent
        </button>
        <button
          aria-label="bouton de tri des posts les plus populaires"
          className="article-sort__btn"
          onClick={() => handleSortChange("popular")}
        >
          Plus populaire
        </button>
        <button
          aria-label="bouton de tri des posts les plus populaires cette semaine"
          className="article-sort__btn"
          onClick={() => handleSortChange("weekly")}
        >
          Populaire de la semaine
        </button>
      </div>

      <div className="container__forum-articles">
        {loading ? (
          <Loader />
        ) : error ? (
          <ErrorMessage message={error.message} />
        ) : (
          <PostList posts={sortedPosts()} />
        )}
      </div>
    </main>
  );
};

export default Home;

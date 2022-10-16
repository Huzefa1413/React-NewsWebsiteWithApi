import { useState, useEffect } from "react";
import axios from "axios";
import Post from "../../components/Post";
import "./index.css";

function Home() {
  const [post, setPost] = useState([]);
  const [search, setSearch] = useState("World");

  useEffect(() => {
    axios
      .get(
        `https://newsapi.org/v2/everything?q=${search}&from=2022-10-15&sortBy=popularity&apiKey=299b4698317642c5a2255c1f031f0e1b`
      )
      .then((response) => {
        console.log(response.data.articles)
        setPost(response.data.articles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    axios
      .get(
        `https://newsapi.org/v2/everything?q=${search}&from=2022-10-15&sortBy=popularity&apiKey=299b4698317642c5a2255c1f031f0e1b`
      )
      .then((response) => {
        setPost(response.data.articles);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="navbar">
        <div className="logo">
          <h1>Robotsy News</h1>
        </div>
        <div className="search">
          <form onSubmit={submitHandler}>
            <input
              type="text"
              placeholder="Search Robotsy News"
              onChange={(e) => {
                setSearch(e.target.value);
              }}
            />
            <button type="submit">Search</button>
          </form>
        </div>
      </div>

      <div className="newspostsbody">
        {post.map((eachPost) => (
          <Post
            author={eachPost.author}
            publishedAt={eachPost.publishedAt}
            title={eachPost.title}
            description={eachPost.description}
            urlToImage={eachPost.urlToImage}
            source={eachPost.source.name}
            url={eachPost.url}
          />
        ))}
      </div>
    </>
  );
}

export default Home;

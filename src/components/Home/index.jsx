import { useState, useEffect } from "react";
import axios from "axios";
import Post from "../../components/Post";
function Home() {
  const [post, setPost] = useState([]);
  useEffect(() => {
    axios
      .get(
        "https://newsapi.org/v2/everything?q=World&from=2022-10-15&sortBy=popularity&apiKey=299b4698317642c5a2255c1f031f0e1b"
      )
      .then((response) => {
        setPost(response.data.articles);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <>
      <h1 style={{ textAlign: "center", margin: "20px" }}>Robotsy News</h1>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {post.map((eachPost, i) => (
          <Post
            author={eachPost.author}
            publishedAt={eachPost.publishedAt}
            title={eachPost.title}
            description={eachPost.description}
            urlToImage={eachPost.urlToImage}
          />
        ))}
      </div>
    </>
  );
}

export default Home;

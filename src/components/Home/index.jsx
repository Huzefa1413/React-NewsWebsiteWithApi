import { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment/moment";
import Post from "../../components/Post";
import "./index.css";

function Home() {
  const [post, setPost] = useState([]);
  const [search, setSearch] = useState("World");

  useEffect(() => {
    const options = {
      method: 'GET',
      url: 'https://bing-news-search1.p.rapidapi.com/news/search',
      params: { q: search, freshness: 'Day', textFormat: 'Raw', safeSearch: 'Off' },
      headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': '3c97ac746bmsh7dccd8a13cb8a63p18bed6jsn1e5ff75525bb',
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {
      setPost(response.data.value)
    }).catch(function (error) {
      console.error(error);
    });

  }, []);

  const submitHandler = (e) => {
    e.preventDefault();

    const options = {
      method: 'GET',
      url: 'https://bing-news-search1.p.rapidapi.com/news/search',
      params: { q: search, freshness: 'Day', textFormat: 'Raw', safeSearch: 'Off' },
      headers: {
        'X-BingApis-SDK': 'true',
        'X-RapidAPI-Key': '3c97ac746bmsh7dccd8a13cb8a63p18bed6jsn1e5ff75525bb',
        'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com'
      }
    };

    axios.request(options).then(function (response) {
      setPost(response.data.value)
    }).catch(function (error) {
      console.error(error);
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
        {post.map((eachPost, i) => (
          // console.log(i, 'author', eachPost.provider[0].name)
          // console.log(i, 'time', eachPost.datePublished)
          // console.log(i, 'title', eachPost.name)
          // console.log(i, 'description', eachPost.description)
          // console.log(i, 'link', eachPost.url)
          // console.log(i, 'image', eachPost.image.thumbnail.contentUrl)

          <Post
            key={i}
            source={eachPost?.provider[0]?.name}
            publishedAt={moment(eachPost?.datePublished).format('Do MMMM, h:mm a')}
            title={eachPost?.name}
            description={eachPost?.description}
            url={eachPost?.url}
            urlToImage={eachPost?.image?.thumbnail?.contentUrl?.replace("pid=News", "")}
          />
        ))}
      </div>
    </>
  );
}

export default Home;

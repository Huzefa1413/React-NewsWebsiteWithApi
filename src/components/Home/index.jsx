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
    document.getElementById("searchbox").value = "";
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
          <form className="searchform" onSubmit={submitHandler}>
            <input id="searchbox"
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
      <form className="news" onSubmit={submitHandler}>
        <button className={`${(search === "World") ? "highlight" : "nothighlight"}`} type="submit" onClick={() => setSearch("World")}>World</button>
        <button className={`${(search === "Business") ? "highlight" : "nothighlight"}`} type="submit" onClick={() => setSearch("Business")}>Business</button>
        <button className={`${(search === "Technology") ? "highlight" : "nothighlight"}`} type="submit" onClick={() => setSearch("Technology")}>Technology</button>
        <button className={`${(search === "Entertainment") ? "highlight" : "nothighlight"}`} type="submit" onClick={() => setSearch("Entertainment")}>Entertainment</button>
        <button className={`${(search === "Sports") ? "highlight" : "nothighlight"}`} type="submit" onClick={() => setSearch("Sports")}>Sports</button>
        <button className={`${(search === "Science") ? "highlight" : "nothighlight"}`} type="submit" onClick={() => setSearch("Science")}>Science</button>
        <button className={`${(search === "Health") ? "highlight" : "nothighlight"}`} type="submit" onClick={() => setSearch("Health")}>Health</button>
      </form>
      <div className="newspostsbody">
        {post.map((eachPost, i) => (
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

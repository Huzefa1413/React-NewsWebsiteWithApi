import "./index.css";

const Post = (props) => (
  <div className="post">
    <div className="head">
      <div className="author">{props.author}</div>
      <div className="time">{props.publishedAt}</div>
    </div>
    <div className="data">
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </div>
    <div className="image">
      <img src={props.urlToImage} alt="" />
    </div>
  </div>
);

export default Post;

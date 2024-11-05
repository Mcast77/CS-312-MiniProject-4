import React from "react";
import "./styles.css";

function Post(param) {
  const updatePost = (event) => {
    event.preventDefault();
    const postData = { title: param.title, body: param.body, id: param.blogId };
    param.update(postData);
    param.setPage("updatePage");
  };

  const deletePost = (event) => {
    event.preventDefault();
    const postId = { id: param.blogId };
    fetch("/deleteBlog", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postId),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        param.onDelete();
      });
    param.setPage("homePage");
  };

  return (
    <div>
      <div className="postLayout">
        <h2 className="postItem">Title: {param.title}</h2>
        <h3 className="postItem">By {param.creatorName}</h3>
        <h4 className="postItem">Updated: {param.dateCreated}</h4>
        <hr />
        <p className="postItem">{param.body}</p>

        {param.userId === param.creatorUserId.toString() && (
          <div>
            <button onClick={updatePost}>Update blog</button>
            <button onClick={deletePost}>Delete blog</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Post;

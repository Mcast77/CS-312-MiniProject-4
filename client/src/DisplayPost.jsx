import React, { useEffect, useState } from "react";
import Post from "./Post";

function DisplayPost(param) {
  const [blogPosts, setBlogPosts] = useState([{}]);

  useEffect(() => {
    fetchPosts();
  }, [param.refresh]);

  const fetchPosts = () => {
    fetch("/getBlogs")
      .then((response) => response.json())
      .then((data) => setBlogPosts(data))
  };

  const refreshPosts = () => {
    fetchPosts();
  }

  return (
    <div>
      {typeof blogPosts.posts === "undefined" ? (
        <p>No posts to display.</p>
      ) : (
        blogPosts.posts.map((post, postIdentifier) => (
          <Post
            key={postIdentifier}
            title={post.title}
            creatorName={post.creator_name}
            dateCreated={post.date_created}
            body={post.body}
            creatorUserId={post.creator_user_id}
            blogId={post.blog_id}
            userId={param.id}
            setPage={param.setPage}
            update={param.update}
            onDelete={refreshPosts}
          />
        ))
      )}
    </div>
  );
}

export default DisplayPost;

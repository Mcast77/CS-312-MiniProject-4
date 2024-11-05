import React from "react";
import BlogPostForm from "./BlogPostForm";
import "./styles.css";

function UpdatePostPage(param) {
  return (
    <div>
      <BlogPostForm
        header="Update Post"
        action="/updateBlog"
        method="put"
        title={param.postData.title}
        body={param.postData.body}
        id={param.postData.id}
        callback={param.setPage}
      />
    </div>
  );
}

export default UpdatePostPage;

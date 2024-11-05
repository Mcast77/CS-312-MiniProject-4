import React, { useState } from "react";
import BlogPostForm from "./BlogPostForm";
import DisplayPost from "./DisplayPost";

function HomePage(param) {
  const [refreshRequest, setRefreshRequest] = useState(false);

  const triggerRefresh = () => {
    setRefreshRequest((prev) => !prev);
  };

  return (
    <div>
      <BlogPostForm
        header="Create a Post"
        action="/addBlog"
        method="post"
        title=""
        body=""
        id={param.id}
        callback={triggerRefresh}
      />
      <DisplayPost
        id={param.id}
        refresh={refreshRequest}
        setPage={param.setPage}
        update={param.setParams}
      />
    </div>
  );
}

export default HomePage;

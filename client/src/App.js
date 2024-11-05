import React, { useState } from "react";
import HomePage from "./HomePage";
import Header from "./Header";
import SigninPage from "./SigninPage";
import SignupPage from "./SignupPage";
import UpdatePostPage from "./UpdatePostPage";

function App() {
  const [page, setPage] = useState("signin");
  const [userId, setUserId] = useState(-1);
  const [params, setParams] = useState([]);

  const changePage = (destination) => {
    setPage(destination);
  };

  const changeUserId = (identification) => {
    setUserId(identification);
  };

  const changeParams = (params) => {
    setParams(params);
  };

  function displayPage() {
    switch (page) {
      case "signup":
        return <SignupPage setPage={changePage} setUserId={changeUserId} />;

      case "updatePage":
        return <UpdatePostPage setPage={changePage} postData={params} />;

      case "signin":
        return <SigninPage setPage={changePage} setUserId={changeUserId} />;

      case "homePage":
        return (
          <HomePage id={userId} setPage={changePage} setParams={changeParams} />
        );

      default:
        return (
          <HomePage id={userId} setPage={changePage} setParams={changeParams} />
        );
    }
  }

  return (
    <div>
      <Header />
      {displayPage()}
    </div>
  );
}

export default App;

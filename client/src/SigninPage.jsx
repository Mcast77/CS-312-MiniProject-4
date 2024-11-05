import React, { useState } from "react";

function SigninPage(param) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [validStatus, setValidStatus] = useState(true);

  const handleForm = async (event) => {
    event.preventDefault();
    let loginData = {
      username: username,
      password: password,
    };

    const response = await fetch("/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    });

    const data = await response.json();

    if (data.id === -1) {
      setUsername("");
      setPassword("");
      setValidStatus(false);
    } else {
      param.setUserId(data.id);
      param.setPage("homePage");
    }
  };

  return (
    <div>
      <h1 className="center">Sign-in Page</h1>
      <form
        onSubmit={handleForm}
        action="/"
        method="post"
        className="formLayout fullScreen"
      >
        <label for="username">Username</label>
        <br />
        <input
          type="input"
          id="username"
          name="username"
          className="extend"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <br />
        <label for="password">Password</label>
        <br />
        <input
          type="input"
          id="password"
          name="password"
          className="extend"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <input class="cusion" type="submit" value="Sign in" />
        <br />
        <input
          type="submit"
          value="Sign up for an acount"
          onClick={() => param.setPage("signup")}
        />
        {validStatus === false && (
          <p className="error">
            Username and/or password are incorrect
            <br />
            Please try again, or sign up
          </p>
        )}
      </form>
    </div>
  );
}

export default SigninPage;

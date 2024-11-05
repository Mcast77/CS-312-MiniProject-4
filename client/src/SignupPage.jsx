import React, { useState } from "react";

function SignupPage(param) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [validStatus, setValidStatus] = useState(true);

  const handleForm = async (event) => {
    event.preventDefault();
    const signupData = {
      username: username,
      password: password,
      name: name,
    };

    const response = await fetch("/signup", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(signupData),
    });

    const data = await response.json();

    if (data.valid === "false") {
      setUsername("");
      setPassword("");
      setName("");
      setValidStatus(false);
    } else {
      param.setUserId(data.id);
      param.setPage("signin");
    }
  };

  return (
    <div>
      <h1 className="center">Signup Page</h1>
      <form onSubmit={handleForm} className="formLayout fullScreen">
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
        <label for="name">Name</label>
        <br />
        <input
          type="input"
          id="name"
          name="name"
          className="extend"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <input class="cusion" type="submit" value="Sign up" />
        <br />
        <input
          type="submit"
          value="Return to signin"
          onClick={() => param.setPage("signin")}
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

export default SignupPage;

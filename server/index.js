import express from "express";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { configDotenv } from "dotenv";
import pg from "pg";

var blogPosts = [];
var userId = "";

configDotenv();
const db = new pg.Client({
  user: process.env.USER,
  host: process.env.HOST,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

const port = 5000;
const app = express();
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + "/public"));

db.connect();

app.post("/", async (req, res) => {
  console.log(req.body)
  if (await signin(req.body.username, req.body.password)) {
    userId = req.body.username;
    res.json({"id":userId});
  } else {
    res.json({"id":-1});
  }
});

app.post("/signup", async (req, res) => {
console.log(req.body);
  if (
    (await signup(req.body.username, req.body.password, req.body.name)) 
  ) {
    res.json({"valid":"true"});
  } else {
    res.json({"valid":"false"});
  }
});

app.get("/getBlogs", async (req, res) => {
  const posts = await getBlogs();
  res.json({"posts":posts});
})

app.post("/addBlog", (req, res) => {
  if (postBlog(req.body.id, req.body.title, req.body.body)) {
    res.json({"code":"working"});
  } else {
    res.json({"code":"error"});
  }
});

app.put("/updateBlog", (req,res) => {
  if (editBlog(req.body.id, req.body.title, req.body.body)) {
    res.json({"code":"working"});
  } else {
    res.json({"code":"error"});
  }
})

app.delete("/deleteBlog", (req,res) => {
  console.log(req.body)
  if (deleteBlog(req.body.id)) {
    res.json({"code":"working"});
  } else {
    res.json({"code":"error"});
  }
})

app.listen(port, () => {
  console.log(`The server is running on port ${port}.`);
});

process.on("SIGINT", () => {
  db.end();
  console.log("Server closing down & ending DB connection.");
  process.exit();
});

async function getBlogs() {
  const result = await db.query("SELECT * FROM blogs");
  return result.rows;
}

async function checkUsernameNotInUse(username) {
  const result = await db.query("SELECT * FROM users WHERE user_id = $1", [
    username,
  ]);
  if (result.rowCount > 0) {
    return false;
  } else {
    return true;
  }
}

async function signup(username, password, name) {
  if (await checkUsernameNotInUse(username)) {
    try {
      const result = await db.query(
        "INSERT INTO users (user_id,password,name) VALUES ($1,$2,$3)",
        [username, password, name]
      );
      if (result.rowCount > 0) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log("ERROR: data couldn't be added.");
    }
  } else {
    return false;
  }
}

async function signin(username, password) {
  try {
    const result = await db.query(
      "SELECT * FROM users WHERE user_id = $1 AND password = $2",
      [username, password]
    );
    if (result.rowCount > 0) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    console.log("ERROR: could not sign in.");
    return false;
  }
}

async function postBlog(username, title, body) {
  try {
    const query =
      "INSERT INTO blogs (creator_name,title,body,creator_user_id)" +
      " SELECT users.name, $1, $2, users.user_id FROM users WHERE users.user_id = $3";
    const result = await db.query(query, [title, body, username]);
    if (result.rowCount > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("ERROR: data couldn't be added.");
  }
}

async function deleteBlog(blog_id) {
  try {
    const result = await db.query("DELETE FROM blogs WHERE blog_id = $1", [
      parseInt(blog_id),
    ]);
    if (result.rowCount > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("ERROR: data couldn't be added.");
  }
}

async function editBlog(blog_id, title, body) {
  try {
    const result = await db.query(
      "UPDATE blogs SET title = $1, body = $2 WHERE blog_id = $3",
      [title, body, parseInt(blog_id)]
    );
    if (result.rowCount > 0) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.log("ERROR: data couldn't be added.");
  }
}

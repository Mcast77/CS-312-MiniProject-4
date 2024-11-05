import React, {useState} from "react";
import "./styles.css";

function BlogPostForm( param ) {
    const [title, setTitle] = useState(param.title);
    const [body, setBody] = useState(param.body);

    function handleForm(event) {
        event.preventDefault();
        let postData = {
            id:param.id,
            title:title,
            body:body,
        } 
        fetch(param.action,{
            method: param.method,
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(postData)
        }).then(response => response.json()).then(data=>{
            console.log(data);
        })
        setTitle("");
        setBody("");
        param.callback();
    }

    return (
        <div>
      <h1 className="center">{param.header}</h1>
      <form onSubmit={handleForm} className="formLayout">
        <label htmlFor="title">Blog Title:</label><br />
        <input
          type="text"
          name="title"
          className="extend"
          value={title}
          onChange={e => setTitle(e.target.value)}
        /><br />
        
        <label htmlFor="body">Blog Post:</label><br />
        <textarea
          name="body"
          className="extend"
          rows="15"
          value={body}
          onChange={e => setBody(e.target.value)}
        ></textarea><br />
        
        <input type="submit" value="Post Blog" />
      </form>
    </div>
    )
}

export default BlogPostForm;
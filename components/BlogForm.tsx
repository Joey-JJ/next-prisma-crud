import React, { useState } from "react";
import { useRouter } from "next/router";

const BlogForm: React.FC = () => {
  const router = useRouter();
  const [author, setAuthor] = useState("");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const formData = {
      author: author,
      title: title,
      body: body,
    };

    const res = await fetch("/api/posts/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) throw new Error("Request failed");

    setAuthor("");
    setTitle("");
    setBody("");
    router.replace(router.asPath);
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        required
        type="text"
        value={author}
        placeholder="author"
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        required
        type="text"
        value={title}
        placeholder="title"
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        required
        type="text"
        value={body}
        placeholder="body"
        onChange={(e) => setBody(e.target.value)}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default BlogForm;

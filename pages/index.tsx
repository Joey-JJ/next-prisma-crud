import { useState } from "react";
import type { NextPage } from "next";
import { Post, PrismaClient } from "@prisma/client";

interface Props {
  data: Post[];
}

const prisma = new PrismaClient();

export const getServerSideProps = async () => {
  const data = await prisma.post.findMany();
  return {
    props: {
      data: JSON.parse(JSON.stringify(data)),
    },
  };
};

const Home: NextPage<Props> = (props) => {
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
  };

  const { data } = props;
  return (
    <>
      {data.map((post: any) => {
        return <div key={post.id}>{`${post.author} - ${post.title}`}</div>;
      })}
      <br />
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
    </>
  );
};

export default Home;

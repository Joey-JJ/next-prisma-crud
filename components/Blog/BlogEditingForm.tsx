import React, { useState } from "react";
import { useRouter } from "next/router";
import type { Post } from "@prisma/client";

interface Props {
  post: Post;
  onDelete: () => void;
  setIsEditing: any;
}

const BlogEditingForm: React.FC<Props> = (props) => {
  const { post, onDelete, setIsEditing } = props;
  const router = useRouter();

  const [title, setTitle] = useState(post.title);
  const [author, setAuthor] = useState(post.author);
  const [body, setBody] = useState(post.body);

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {};

    const res = await fetch(`/api/posts/${post.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        author: author,
        body: body,
      }),
    });

    setIsEditing((prevstate: boolean) => !prevstate);
    router.reload();
  };

  return (
    <form onSubmit={submitHandler}>
      <input
        required
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        required
        type="text"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        required
        type="text"
        value={body}
        onChange={(e) => setBody(e.target.value)}
      />
      <button onClick={onDelete}>Delete</button>
      <button type="submit">Save</button>
    </form>
  );
};

export default BlogEditingForm;

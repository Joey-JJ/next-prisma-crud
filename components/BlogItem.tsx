import React from "react";
import { Post } from "@prisma/client";
import { useRouter } from "next/router";

interface Props {
  post: Post;
}

const BlogItem: React.FC<Props> = (props) => {
  const { post } = props;
  const router = useRouter();

  const onDelete = async () => {
    const response = await fetch(`/api/posts/${post.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Something went wrong, delete failed.");
    }

    router.reload();
  };

  return (
    <>
      <div>
        <h1>{`${post.title}`}</h1>
        <h3>{`Author: ${post.author}`}</h3>
        <p>{`${post.body}`}</p>
        <button onClick={onDelete}>X</button>
      </div>
      <br />
    </>
  );
};

export default BlogItem;

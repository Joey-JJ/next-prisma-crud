import React, { useState } from "react";
import type { Post } from "@prisma/client";
import { useRouter } from "next/router";
import BlogEditingForm from "./BlogEditingForm";

interface Props {
  post: Post;
}

const BlogItem: React.FC<Props> = (props) => {
  const { post } = props;
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);

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

  if (isEditing) {
    return (
      <div>
        <BlogEditingForm
          post={post}
          onDelete={onDelete}
          setIsEditing={setIsEditing}
        />
      </div>
    );
  }

  return (
    <>
      <div>
        <h1>{`${post.title}`}</h1>
        <h3>{`Author: ${post.author}`}</h3>
        <p>{`${post.body}`}</p>
        <button onClick={onDelete}>X</button>
        <button onClick={() => setIsEditing((prevstate) => !prevstate)}>
          Edit
        </button>
      </div>
      <br />
    </>
  );
};

export default BlogItem;

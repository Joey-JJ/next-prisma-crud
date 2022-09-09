import React, { useState } from "react";
import type { Post } from "@prisma/client";
import { useRouter } from "next/router";
import BlogEditingForm from "./BlogEditingForm";
import classes from "../../styles/BlogItem.module.css";

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
      <div className={classes.container}>
        <h1 className={classes.title}>{`${post.title}`}</h1>
        <h3 className={classes.author}>{`By ${post.author}`}</h3>
        <p className={classes.body}>{`${post.body}`}</p>
        <div className={classes.buttons}>
          <button onClick={onDelete}>Delete</button>
          <button onClick={() => setIsEditing((prevstate) => !prevstate)}>
            Edit
          </button>
        </div>
      </div>
    </>
  );
};

export default BlogItem;

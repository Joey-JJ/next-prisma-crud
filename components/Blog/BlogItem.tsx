import React, { useState } from "react";
import type { Post } from "@prisma/client";
import { useRouter } from "next/router";
import Image from "next/image";
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
        <Image
          src={
            "https://images.unsplash.com/photo-1661846601758-28ce69e3d480?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2370&q=80"
          }
          width={200}
          height={200}
          alt="avatar"
        />
        <div className={classes["content-container"]}>
          <div className={classes["card-titles"]}>
            <h1 className={classes.title}>{`${post.title}`}</h1>
            <h3 className={classes.author}>{`By ${post.author}`}</h3>
          </div>
          <p className={classes.body}>{`${post.body}`}</p>
          <div className={classes.buttons}>
            <button onClick={onDelete}>Delete</button>
            <button onClick={() => setIsEditing((prevstate) => !prevstate)}>
              Edit
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogItem;

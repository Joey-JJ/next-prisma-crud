import React from "react";
import { Post } from "@prisma/client";

interface Props {
  post: Post;
}

const BlogItem: React.FC<Props> = (props) => {
  const { post } = props;

  return (
    <>
      <div>
        <h1>{`${post.title}`}</h1>
        <h3>{`Author: ${post.author}`}</h3>
        <p>{`${post.body}`}</p>
      </div>
      <br />
    </>
  );
};

export default BlogItem;

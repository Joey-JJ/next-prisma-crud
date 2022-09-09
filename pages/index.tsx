import React, { useState } from "react";
import type { NextPage } from "next";
import { Post, PrismaClient } from "@prisma/client";
import BlogForm from "../components/Blog/BlogForm";
import BlogItem from "../components/Blog/BlogItem";
import classes from "../styles/Home.module.css";

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
  const { data } = props;
  const blogs = data.map((post: Post) => (
    <BlogItem key={post.id} post={post} />
  ));

  const [formOpen, setFormOpen] = useState(false);

  return (
    <div className={classes.container}>
      {/* {formOpen && <BlogForm />}
      {!formOpen && (
        <button
          className="btn-primary"
          onClick={() => setFormOpen((prevState) => !prevState)}
        >
          Add blog
        </button>
      )} */}
      {blogs}
    </div>
  );
};

export default Home;

import type { NextPage } from "next";
import { Post, PrismaClient } from "@prisma/client";
import BlogForm from "../components/BlogForm";
import BlogItem from "../components/BlogItem";

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

  return (
    <div>
      <BlogForm />
      {blogs}
    </div>
  );
};

export default Home;

import { Post, PrismaClient } from "@prisma/client";
import type { NextPage } from "next";

// Create - api/posts/new
// Read  all - api/posts/
// Read one - api/posts/:id
// Update - api/posts/:id
// Delete - api/posts/:id

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
  return (
    <div>
      {data.map((post: any) => {
        return <div key={post.id}>{`${post.author} - ${post.title}`}</div>;
      })}
    </div>
  );
};

export default Home;

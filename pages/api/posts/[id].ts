// Handler will be used for updating and deleting posts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { method } = req;
  const { id } = req.query;

  switch (method) {
    case "DELETE":
      try {
        const deleted = await prisma.post.delete({
          where: {
            id: id as string,
          },
        });

        res.status(200).json({ message: "Post deleted", post: deleted });
      } catch (e) {
        res.status(404).json({ message: "Request failed", error: e });
      }

    case "PUT":
      const { title, author, body } = req.body;
      try {
        const edited = await prisma.post.update({
          where: {
            id: id as string,
          },
          data: {
            title: title,
            author: author,
            body: body,
          },
        });

        res.status(200).json({ message: "Post updated", post: edited });
      } catch (e) {
        res.status(404).json({ message: "Request failed", error: e });
      }
  }
};

export default handler;

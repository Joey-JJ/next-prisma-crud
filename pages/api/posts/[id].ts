// Handler will be used for updating and deleting posts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "DELETE") {
    const id = req.query.id as string;
    try {
      const deleted = await prisma.post.delete({
        where: {
          id: id,
        },
      });

      res.status(200).json({ message: "Post deleted", post: deleted });
    } catch (e) {
      res.status(404).json({ message: "Request failed", error: e });
    }
  }
};

export default handler;

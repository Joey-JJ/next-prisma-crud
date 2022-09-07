// Handler will be used for creating posts
import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(404).json({ message: "BAD REQUEST" });
    throw new Error("Wrong request type");
  }

  const post = await prisma.post.create({ data: req.body });

  res.status(200).json({ message: "OK", post: post });
};

export default handler;

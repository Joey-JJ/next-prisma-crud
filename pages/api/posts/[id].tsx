// Handler will be used for updating and deleting posts

import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(404).json({ message: "BAD REQUEST" });
    throw new Error("Wrong request type");
  }
};

export default handler;

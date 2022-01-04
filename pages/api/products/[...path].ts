import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handle(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({ name: "Get Product detail" });
}

import { NextApiRequest, NextApiResponse } from "next";

type Data =
  | {
      data: any[];
      pagination: number;
    }
  | { name: string };

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "GET") {
    return res.status(404).json({ name: "Method not support" });
  }
  const response = await fetch(
    "https://js-post-api.herokuapp.com/api/posts?_page=1&_limit=10"
  );
  const responseJSON = await response.json();
  res.status(200).json(responseJSON);
}

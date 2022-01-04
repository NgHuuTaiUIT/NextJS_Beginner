import Cookies from "cookies";
import { createProxyServer } from "http-proxy";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export const config = {
  api: {
    bodyParser: false
  }
};

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") {
    return res.status(400).json({ message: "method not support" });
  }

  const cookie = new Cookies(req, res);
  cookie.set("access_token");

  res.status(200).json({ message: "logout success" });
}

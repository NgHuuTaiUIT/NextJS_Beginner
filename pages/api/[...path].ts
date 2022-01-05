import Cookies from "cookies";
import { createProxyServer } from "http-proxy";
import { NextApiRequest, NextApiResponse } from "next";

type Data = any[];

export const config = {
  api: {
    bodyParser: false
  }
};

const proxy = createProxyServer();

export default async function handle(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  return new Promise((resolve, reject) => {
    //NOTE:Convert cookies to header authorization

    const cookie = new Cookies(req, res);

    const accessToken = cookie.get("access_token");

    // req.headers.cookie = "";
    console.log("chào");
    if (accessToken) {
      console.log(accessToken);
      req.headers.Authorization = `Bearer ${accessToken}`;
    }

    //NOTE: Handle Response
    proxy.web(req, res, {
      target: process.env.API_URL,
      changeOrigin: true,
      selfHandleResponse: false
    });

    //NOTE: Cho nextjs server biết đã xử lý xong
    proxy.once("proxyRes", () => {
      resolve(true);
    });
  });

  //   res.status(200).json(responseJSON);
}

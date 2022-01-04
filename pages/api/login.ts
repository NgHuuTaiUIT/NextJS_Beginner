import Cookies from "cookies";
import { createProxyServer, ProxyResCallback } from "http-proxy";
import { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

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
  if (req.method !== "POST") {
    return res.status(404).json({ message: "Method not support" });
  }

  return new Promise((resolve, reject) => {
    req.headers.cookie = "";

    const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
      try {
        let body = "";
        proxyRes.on("data", function (chunk) {
          body += chunk;
        });

        proxyRes.on("end", function () {
          const { accessToken, expiredAt } = JSON.parse(body);

          console.log(accessToken, expiredAt);

          const cookies = new Cookies(req, res, {
            secure: process.env.NODE_ENV !== "development"
          });

          cookies.set("access_token", accessToken, {
            httpOnly: true,
            sameSite: "lax",
            expires: new Date(expiredAt)
          });

          (res as NextApiResponse)
            .status(200)
            .json({ message: "login success" });
        });
      } catch (error) {
        (res as NextApiResponse)
          .status(500)
          .json({ message: "Something went wrong" });
      }

      resolve(true);
    };

    proxy.once("proxyRes", handleLoginResponse);

    proxy.web(req, res, {
      target: process.env.API_URL,
      changeOrigin: true,
      selfHandleResponse: true
    });
  });

  //   res.status(200).json(responseJSON);
}

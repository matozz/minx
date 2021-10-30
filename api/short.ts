import { VercelRequest, VercelResponse } from "@vercel/node";
import { readFileSync } from "fs";
import { join } from "path";
import storage from "../storage";

export default async (
  req: VercelRequest,
  res: VercelResponse
): Promise<any> => {
  const { slug } = req.query;

  if (typeof slug !== "string" || slug === "") {
    return res.status(400).send("Bad Request");
  }

  try {
    // get target url by slug
    const [url, timestamp] = (await storage.getUrlBySlug(slug)) ?? [];

    // target url not found
    if (url == null) {
      const file = readFileSync(
        join(__dirname, "../public", "404.html"),
        "utf8"
      );
      return res.status(400).end(file);
    }

    // target url expired
    if (Date.now() > +timestamp) return res.status(404).redirect("/error/404");

    // add access log
    await storage.addLog(
      slug,
      req.headers["user-agent"],
      req.headers["x-real-ip"]?.toString()
    );

    // 307 redirect if target exists
    res.redirect(url);
  } catch (e: any) {
    return res.status(500).send(e.message);
  }
};

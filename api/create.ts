import { VercelRequest, VercelResponse } from "@vercel/node";
import storage from "../storage";
import { formatDate } from "../util/date";

export default async (
  req: VercelRequest,
  res: VercelResponse
): Promise<any> => {
  // params from request body or querystring
  const params = req.body ?? req.query;
  const {
    url = "",
    slug = "",
    limits = -1,
    expires = 7,
  } = params as {
    url?: string;
    slug?: string;
    limits?: number;
    expires?: number;
  };

  // url is required
  if (url === "") {
    return res
      .status(400)
      .send({ message: "Missing required parameter: url." });
  }

  // url format check
  if (!/^https?:\/\/.{3,}/.test(url)) {
    return res.status(400).send({ message: "Illegal format: url." });
  }

  // custom slug length check
  if (slug.length !== 0 && (slug.length < 2 || slug.length > 10)) {
    return res
      .status(400)
      .send({ message: "Illegal length: slug, (>= 2 && <= 10)." });
  }

  const getForwarded = (name: string): string =>
    req.headers[`x-forwarded-${name}`]?.toString() ?? "";

  try {
    // request origin url
    const origin = `${getForwarded("proto")}://${getForwarded("host")}/`;

    // if slug customized
    if (slug !== "") {
      const {
        url: existUrl,
        timestamp,
        id,
        limits,
      } = (await storage.getCommentBySlug(slug)) ?? {};

      // url & slug are the same.
      if (existUrl === url) {
        return res.send({ slug, link: origin + slug });
      }

      // slug already exists
      if (existUrl != null && timestamp && id) {
        if (
          limits == 0 ||
          (timestamp && timestamp != -1 && Date.now() > timestamp)
        ) {
          // delete expired url
          await storage.delComment(id);
        } else {
          return res.status(400).send({
            message: `Slug already exists. ${
              timestamp != -1
                ? "Expire At: " + formatDate(timestamp, "yyyy-MM-dd hh:mm:ss")
                : ""
            }`,
          });
        }
      }
    }

    // target url exists
    const existSlug = await storage.getSlugByUrl(url);

    // url exists & no custom slug
    if (existSlug != null && slug === "") {
      return res.send({ slug: existSlug, link: origin + existSlug });
    }

    // create if not exists
    const newSlug = await storage.addLink(url, expires, limits, slug);

    // response
    res.send({ slug: newSlug, link: origin + newSlug });
  } catch (e: any) {
    return res.status(500).send({ message: e.message });
  }
};

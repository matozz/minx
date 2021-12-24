import { VercelRequest, VercelResponse } from '@vercel/node'
import { readFileSync } from 'fs'
import { join } from 'path'
import storage from '../storage'

export default async (
  req: VercelRequest,
  res: VercelResponse
): Promise<any> => {
  const { slug } = req.query

  if (typeof slug !== 'string' || slug === '') {
    return res.status(400).send('Bad Request')
  }

  try {
    // get target url by slug
    const { url, timestamp, id, limits } =
      (await storage.getCommentBySlug(slug)) ?? {}

    // target url not found || target url expired
    if (url == null || !timestamp || (!!~timestamp && Date.now() > timestamp)) {
      const file = readFileSync(
        join(__dirname, '../public', '404.html'),
        'utf8'
      )
      return res.status(400).end(file)
    }

    // update request limit
    if (typeof limits !== 'undefined' && id) {
      if (limits > 0) {
        await storage.updateComment(id, slug, url, timestamp, limits - 1)
      } else if (limits == 0) {
        const file = readFileSync(
          join(__dirname, '../public', '400.html'),
          'utf8'
        )
        return res.status(400).end(file)
      }
    }

    // add access log
    await storage.addLog(
      slug,
      req.headers['user-agent'],
      req.headers['x-real-ip']?.toString()
    )

    // 307 redirect if target exists
    res.redirect(url)
  } catch (e: any) {
    return res.status(500).send(e.message)
  }
}

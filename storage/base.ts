import { customAlphabet } from 'nanoid'

export const nanoid = customAlphabet(
  '1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
  4
)

export interface Comment {
  id: string
  body: string
  author_association: 'OWNER' | 'MEMBER' | 'CONTRIBUTOR' | 'NONE'
}
export interface CommentOptions {
  url: string
  timestamp: number
  id: string
  limits: number | undefined
}

export default abstract class BaseStorage {
  async createSlug (): Promise<string> {
    const slug = nanoid()
    const exists = await this.getCommentBySlug(slug)
    if (exists == null) return slug
    return await this.createSlug()
  }

  async addLog (slug: string, ua?: string, ip?: string): Promise<void> {
    console.log({ slug, ua, ip, date: new Date() })
  }

  abstract addLink (
    url: string,
    expires: number,
    limits: number,
    slug?: string
  ): Promise<string>

  abstract updateComment (
    id: string,
    slug: string,
    url: string,
    expires: number
  ): // limits: number
  Promise<void>

  abstract delComment (id: string): Promise<void>

  abstract getCommentBySlug (slug: string): Promise<CommentOptions | undefined>

  abstract getSlugByUrl (url: string): Promise<string | undefined>
}

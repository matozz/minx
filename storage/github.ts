import got from 'got'

import BaseStorage, { Comment, CommentOptions } from './base'

const {
  GITHUB_TOKEN = '',
  GITHUB_OWNER = '',
  GITHUB_REPO = '',
  GITHUB_ISSUE_ID = 1
} = process.env

const endpoint1 = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues/${GITHUB_ISSUE_ID}/comments`
const endpoint2 = `https://api.github.com/repos/${GITHUB_OWNER}/${GITHUB_REPO}/issues/comments`
const whiteList = ['OWNER', 'MEMBER']
const splitter = ' || '
const date = 24 * 60 * 60 * 1000

const requestOptions = {
  headers: {
    authorization: `token ${GITHUB_TOKEN}`,
    accept: 'application/vnd.github.v3+json'
  },
  timeout: 5 * 1000 // 5s
}

export default class GitHub extends BaseStorage {
  private fetchComments (): AsyncIterableIterator<Comment> {
    // fetch all comments from github repo issue
    return got.paginate<Comment>(endpoint1, {
      ...requestOptions,
      searchParams: { per_page: 100 }
    })
  }

  async addLink (
    url: string,
    expires: number,
    limits: number,
    slug?: string
  ): Promise<string> {
    slug = slug == null || slug === '' ? await this.createSlug() : slug
    expires =
      expires != -1 && expires != 0 ? Date.now() + date * expires : expires
    limits = limits == null ? -1 : limits

    // create github repo issue comment
    await got.post<Comment>(endpoint1, {
      ...requestOptions,
      json: {
        body: slug + splitter + url + splitter + expires + splitter + limits
      }
    })

    return slug
  }

  async updateComment (
    id: string,
    slug: string,
    url: string,
    expires: number,
    limits?: number
  ): Promise<void> {
    await got.patch<Comment>(endpoint2 + '/' + id, {
      ...requestOptions,
      json: {
        body: slug + splitter + url + splitter + expires + splitter + limits
      }
    })
  }

  async delComment (id: string): Promise<void> {
    await got.delete<Comment>(endpoint2 + '/' + id, {
      ...requestOptions
    })
  }

  async getCommentBySlug (slug: string): Promise<CommentOptions | undefined> {
    for await (const { body, id, author_association } of this.fetchComments()) {
      // ignore items not author added
      if (!whiteList.includes(author_association)) continue
      // parse each item to get the mapping
      const [key, url, timestamp, limits] = body.trim().split(splitter)
      // item format checking
      if (url != null && key === slug) { return { url, timestamp: +timestamp, id, limits: +limits } }
    }
  }

  async getSlugByUrl (url: string): Promise<string | undefined> {
    for await (const { body, author_association } of this.fetchComments()) {
      // ignore items not author added
      if (!whiteList.includes(author_association)) continue
      // parse each item to get the mapping
      const [key, value] = body.trim().split(splitter)
      // item format checking
      if (value === url) return key
    }
  }
}

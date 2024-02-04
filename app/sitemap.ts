import { getBlogPosts } from "app/db/blog"

export default async function sitemap() {
  let blogs = getBlogPosts().map((post) => ({
    url: `https://kinhdev.id.vn/blog/${post.slug}`,
    lastModified: post.metadata.publishedAt,
  }))

  let routes = ["", "/blog", "/guestbook", "/uses", "/work"].map((route) => ({
    url: `https://kinhdev.id.vn${route}`,
    lastModified: new Date().toISOString().split("T")[0],
  }))

  return [...routes, ...blogs]
}

# 写文章指南

以后新增文章时，只需要做两件事：

1. 在当前 `posts/` 目录新建一个 Markdown 文件，例如 `my-new-post.md`。
2. 在 `posts/index.json` 里新增一条文章信息，并把 `file` 指向这个 Markdown 文件。

示例：

```json
{
  "id": "my-new-post",
  "title": "我的新文章",
  "category": "JavaScript",
  "date": "2026-05-26",
  "readTime": "6 min",
  "cover": "https://images.unsplash.com/photo-example",
  "tags": ["JavaScript", "学习笔记"],
  "excerpt": "这里写文章摘要。",
  "file": "my-new-post.md"
}
```

Markdown 支持：

- 段落
- `###` 小标题
- 列表
- 链接
- 图片
- 代码块
- 行内代码

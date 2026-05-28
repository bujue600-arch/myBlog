let posts = [];

const state = {
  query: "",
  category: "",
  tag: "",
};

const els = {
  header: document.querySelector("#siteHeader"),
  navToggle: document.querySelector("#navToggle"),
  siteNav: document.querySelector("#siteNav"),
  postList: document.querySelector("#postList"),
  searchInput: document.querySelector("#searchInput"),
  clearFilter: document.querySelector("#clearFilter"),
  resultCount: document.querySelector("#resultCount"),
  activeFilter: document.querySelector("#activeFilter"),
  profileStats: document.querySelector("#profileStats"),
  latestList: document.querySelector("#latestList"),
  categoryList: document.querySelector("#categoryList"),
  tagCloud: document.querySelector("#tagCloud"),
  archiveList: document.querySelector("#archiveList"),
  siteArticleCount: document.querySelector("#siteArticleCount"),
  siteVisitorCount: document.querySelector("#siteVisitorCount"),
  siteViewCount: document.querySelector("#siteViewCount"),
  reader: document.querySelector("#reader"),
  readerTitle: document.querySelector("#readerTitle"),
  readerMeta: document.querySelector("#readerMeta"),
  readerTags: document.querySelector("#readerTags"),
  readerContent: document.querySelector("#readerContent"),
  toTop: document.querySelector("#toTop"),
  typewriter: document.querySelector("#typewriter"),
};

const formatDate = (date) =>
  new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(date));

const countBy = (items, getter) =>
  items.reduce((acc, item) => {
    const values = Array.isArray(getter(item)) ? getter(item) : [getter(item)];
    values.forEach((value) => {
      acc[value] = (acc[value] || 0) + 1;
    });
    return acc;
  }, {});

const escapeHtml = (value) =>
  String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

function parseInlineMarkdown(text) {
  return escapeHtml(text)
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" />')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noreferrer">$1</a>')
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");
}

function markdownToHtml(markdown) {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const html = [];
  let paragraph = [];
  let list = [];
  let listType = "ul";
  let table = [];
  let quote = [];
  let code = [];
  let inCode = false;
  let codeLang = "";

  const flushParagraph = () => {
    if (!paragraph.length) return;
    html.push(`<p>${parseInlineMarkdown(paragraph.join(" "))}</p>`);
    paragraph = [];
  };

  const flushList = () => {
    if (!list.length) return;
    html.push(`<${listType}>${list.map((item) => `<li>${parseInlineMarkdown(item)}</li>`).join("")}</${listType}>`);
    list = [];
    listType = "ul";
  };

  const splitTableRow = (line) =>
    line
      .replace(/^\|/, "")
      .replace(/\|$/, "")
      .split("|")
      .map((cell) => cell.trim());

  const flushTable = () => {
    if (!table.length) return;
    const [header, , ...rows] = table;
    html.push(`
      <div class="table-wrap">
        <table>
          <thead><tr>${splitTableRow(header).map((cell) => `<th>${parseInlineMarkdown(cell)}</th>`).join("")}</tr></thead>
          <tbody>
            ${rows
              .map((row) => `<tr>${splitTableRow(row).map((cell) => `<td>${parseInlineMarkdown(cell)}</td>`).join("")}</tr>`)
              .join("")}
          </tbody>
        </table>
      </div>
    `);
    table = [];
  };

  const flushQuote = () => {
    if (!quote.length) return;
    html.push(`<blockquote>${quote.map((line) => `<p>${parseInlineMarkdown(line)}</p>`).join("")}</blockquote>`);
    quote = [];
  };

  const flushFlow = () => {
    flushParagraph();
    flushList();
    flushTable();
    flushQuote();
  };

  const pushListItem = (type, item) => {
    flushParagraph();
    flushTable();
    flushQuote();
    if (list.length && listType !== type) flushList();
    listType = type;
    list.push(item);
  };

  const isTableSeparator = (line) => /^\|?\s*:?-{3,}:?\s*(\|\s*:?-{3,}:?\s*)+\|?$/.test(line);

  lines.forEach((line) => {
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      if (inCode) {
        html.push(`<pre><code class="language-${escapeHtml(codeLang)}">${escapeHtml(code.join("\n"))}</code></pre>`);
        code = [];
        codeLang = "";
        inCode = false;
      } else {
        flushFlow();
        codeLang = trimmed.slice(3).trim();
        inCode = true;
      }
      return;
    }

    if (inCode) {
      code.push(line);
      return;
    }

    if (!trimmed) {
      flushFlow();
      return;
    }

    if (trimmed.includes("|") && (trimmed.startsWith("|") || table.length)) {
      flushParagraph();
      flushList();
      flushQuote();
      table.push(trimmed);
      return;
    }

    if (table.length && !isTableSeparator(trimmed)) {
      flushTable();
    }

    if (trimmed.startsWith(">")) {
      flushParagraph();
      flushList();
      flushTable();
      const quoteLine = trimmed.replace(/^>\s?/, "").trim();
      if (quoteLine) quote.push(quoteLine);
      return;
    }

    if (trimmed.startsWith("# ")) {
      flushFlow();
      html.push(`<h3>${parseInlineMarkdown(trimmed.slice(2))}</h3>`);
      return;
    }

    if (trimmed.startsWith("### ")) {
      flushFlow();
      html.push(`<h3>${parseInlineMarkdown(trimmed.slice(4))}</h3>`);
      return;
    }

    if (trimmed.startsWith("## ")) {
      flushFlow();
      html.push(`<h3>${parseInlineMarkdown(trimmed.slice(3))}</h3>`);
      return;
    }

    if (trimmed.startsWith("- ")) {
      pushListItem("ul", trimmed.slice(2));
      return;
    }

    const orderedListItem = trimmed.match(/^\d+\.\s+(.+)$/);
    if (orderedListItem) {
      pushListItem("ol", orderedListItem[1]);
      return;
    }

    paragraph.push(trimmed);
  });

  flushParagraph();
  flushList();
  flushTable();
  flushQuote();

  if (inCode) {
    html.push(`<pre><code class="language-${escapeHtml(codeLang)}">${escapeHtml(code.join("\n"))}</code></pre>`);
  }

  return html.join("");
}

async function loadPosts() {
  const response = await fetch("posts/index.json");
  if (!response.ok) {
    throw new Error("无法加载文章索引");
  }
  posts = await response.json();
  posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

function getFilteredPosts() {
  const query = state.query.trim().toLowerCase();

  return posts.filter((post) => {
    const matchQuery =
      !query ||
      [post.title, post.category, post.excerpt, ...post.tags]
        .join(" ")
        .toLowerCase()
        .includes(query);
    const matchCategory = !state.category || post.category === state.category;
    const matchTag = !state.tag || post.tags.includes(state.tag);
    return matchQuery && matchCategory && matchTag;
  });
}

function renderPosts() {
  const filtered = getFilteredPosts();
  els.resultCount.textContent = `${filtered.length} 篇`;

  const filters = [];
  if (state.category) filters.push(`分类：${state.category}`);
  if (state.tag) filters.push(`标签：${state.tag}`);
  if (state.query) filters.push(`搜索：${state.query}`);
  els.activeFilter.hidden = filters.length === 0;
  els.activeFilter.textContent = filters.length ? `当前筛选：${filters.join(" / ")}` : "";

  if (!filtered.length) {
    els.postList.innerHTML = `<div class="empty-state card">没有找到匹配的文章，换个关键词试试看。</div>`;
    return;
  }

  els.postList.innerHTML = filtered
    .map(
      (post) => `
        <article class="post-card card">
          <div class="post-cover" style="background-image: url('${post.cover}')"></div>
          <div class="post-body">
            <div class="post-meta">
              <span>${formatDate(post.date)}</span>
              <span>${post.category}</span>
              <span>${post.readTime}</span>
            </div>
            <h3>${post.title}</h3>
            <p>${post.excerpt}</p>
            <div class="post-tags">
              ${post.tags.map((tag) => `<span class="tag"># ${tag}</span>`).join("")}
            </div>
            <button class="post-read" type="button" data-post-id="${post.id}">阅读全文</button>
          </div>
        </article>
      `
    )
    .join("");
}

function renderSidebar() {
  const categoryCounts = countBy(posts, (post) => post.category);
  const tagCounts = countBy(posts, (post) => post.tags);
  const archiveCounts = countBy(posts, (post) => new Date(post.date).getFullYear());

  els.profileStats.innerHTML = `
    <div><strong>${posts.length}</strong><span>文章</span></div>
    <div><strong>${Object.keys(tagCounts).length}</strong><span>标签</span></div>
    <div><strong>${Object.keys(categoryCounts).length}</strong><span>分类</span></div>
  `;

  els.latestList.innerHTML = posts
    .slice(0, 5)
    .map((post) => `<button class="mini-link" type="button" data-post-id="${post.id}">${post.title}</button>`)
    .join("");

  els.categoryList.innerHTML = Object.entries(categoryCounts)
    .map(
      ([category, count]) => `
        <button class="category-item" type="button" data-category="${category}">
          <span>${category}</span><strong>${count}</strong>
        </button>
      `
    )
    .join("");

  els.tagCloud.innerHTML = Object.entries(tagCounts)
    .map(
      ([tag, count]) => `
        <button class="filter-chip" type="button" data-tag="${tag}"># ${tag} ${count}</button>
      `
    )
    .join("");

  els.archiveList.innerHTML = Object.entries(archiveCounts)
    .sort((a, b) => b[0] - a[0])
    .map(
      ([year, count]) => `
        <div class="archive-item">
          <span>${year}</span><strong>${count} 篇</strong>
        </div>
      `
    )
    .join("");

  if (els.siteArticleCount) els.siteArticleCount.textContent = posts.length;
  if (els.siteVisitorCount) els.siteVisitorCount.textContent = "1";
  if (els.siteViewCount) els.siteViewCount.textContent = posts.length * 2 + 1;
}

async function openPost(id) {
  const post = posts.find((item) => item.id === id);
  if (!post) return;

  els.readerTitle.textContent = post.title;
  els.readerMeta.textContent = `${formatDate(post.date)} · ${post.category} · ${post.readTime}`;
  els.readerTags.innerHTML = post.tags.map((tag) => `<span class="tag"># ${tag}</span>`).join("");
  els.readerContent.innerHTML = "<p>文章加载中...</p>";
  els.reader.classList.add("is-open");
  els.reader.setAttribute("aria-hidden", "false");
  document.body.classList.add("reader-open");

  try {
    if (!post.content) {
      const response = await fetch(`posts/${post.file}`);
      if (!response.ok) throw new Error("文章文件加载失败");
      post.content = markdownToHtml(await response.text());
    }
    els.readerContent.innerHTML = post.content;
  } catch (error) {
    els.readerContent.innerHTML = `<p>文章暂时无法加载，请稍后再试。</p>`;
    console.error(error);
  }
}

function closeReader() {
  els.reader.classList.remove("is-open");
  els.reader.setAttribute("aria-hidden", "true");
  document.body.classList.remove("reader-open");
}

function applyCategory(category) {
  state.category = category;
  state.tag = "";
  renderPosts();
  document.querySelector("#content").scrollIntoView({ behavior: "smooth", block: "start" });
}

function applyTag(tag) {
  state.tag = tag;
  state.category = "";
  renderPosts();
  document.querySelector("#content").scrollIntoView({ behavior: "smooth", block: "start" });
}

function clearFilters() {
  state.query = "";
  state.category = "";
  state.tag = "";
  els.searchInput.value = "";
  renderPosts();
}

function bindEvents() {
  window.addEventListener("scroll", () => {
    const scrolled = window.scrollY > 32;
    els.header.classList.toggle("is-scrolled", scrolled);
    els.toTop.classList.toggle("is-visible", window.scrollY > 420);
  });

  els.navToggle.addEventListener("click", () => {
    const isOpen = els.siteNav.classList.toggle("is-open");
    els.header.classList.toggle("is-open", isOpen);
    els.navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  els.siteNav.addEventListener("click", () => {
    els.siteNav.classList.remove("is-open");
    els.header.classList.remove("is-open");
    els.navToggle.setAttribute("aria-expanded", "false");
  });

  els.searchInput.addEventListener("input", (event) => {
    state.query = event.target.value;
    renderPosts();
  });

  els.clearFilter.addEventListener("click", clearFilters);

  document.addEventListener("click", (event) => {
    const readButton = event.target.closest("[data-post-id]");
    const categoryButton = event.target.closest("[data-category]");
    const tagButton = event.target.closest("[data-tag]");
    const closeButton = event.target.closest("[data-close-reader]");

    if (readButton) openPost(readButton.dataset.postId);
    if (categoryButton) applyCategory(categoryButton.dataset.category);
    if (tagButton) applyTag(tagButton.dataset.tag);
    if (closeButton) closeReader();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeReader();
  });

  els.toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function bootTypewriter() {
  const phrases = ["了解真相才能获得真正的自由"];
  let phraseIndex = 0;
  let index = 0;
  let deleting = false;

  const tick = () => {
    const phrase = phrases[phraseIndex];
    els.typewriter.textContent = phrase.slice(0, index);

    if (!deleting && index < phrase.length) {
      index += 1;
      window.setTimeout(tick, 92);
      return;
    }

    if (!deleting && index === phrase.length) {
      deleting = true;
      window.setTimeout(tick, 1800);
      return;
    }

    if (deleting && index > 0) {
      index -= 1;
      window.setTimeout(tick, 42);
      return;
    }

    deleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    window.setTimeout(tick, 420);
  };

  tick();
}

async function init() {
  bindEvents();
  bootTypewriter();

  try {
    await loadPosts();
    renderSidebar();
    renderPosts();
  } catch (error) {
    els.postList.innerHTML = `<div class="empty-state card">文章加载失败，请检查 posts/index.json。</div>`;
    console.error(error);
  }
}

init();

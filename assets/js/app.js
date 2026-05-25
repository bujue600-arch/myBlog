const posts = [
  {
    id: "javascript-event-loop",
    title: "JavaScript 事件循环学习笔记",
    category: "JavaScript",
    date: "2026-05-20",
    readTime: "8 min",
    cover:
      "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
    tags: ["JavaScript", "浏览器", "异步"],
    excerpt:
      "从调用栈、任务队列和微任务三个角度，把事件循环理解成浏览器安排代码执行顺序的调度规则。",
    content: `
      <p>事件循环不是一个孤立概念，它连接了调用栈、Web API、宏任务和微任务。理解它之后，再看 Promise、setTimeout、async/await 的输出顺序就会稳定很多。</p>
      <h3>我的理解方式</h3>
      <p>同步代码先进入调用栈执行；异步能力交给浏览器或运行时处理；回调在合适的时机回到任务队列。每次宏任务结束后，运行时会尽量清空微任务队列，然后再进入下一轮渲染和任务。</p>
      <pre><code>console.log("start");
setTimeout(() => console.log("timer"));
Promise.resolve().then(() => console.log("promise"));
console.log("end");</code></pre>
      <p>这段代码的输出顺序是 start、end、promise、timer。原因是同步代码先执行，Promise 回调进入微任务，setTimeout 回调进入宏任务。</p>
    `,
  },
  {
    id: "css-layout-review",
    title: "CSS 布局复盘：Grid 与 Flex 怎么选",
    category: "CSS",
    date: "2026-05-16",
    readTime: "6 min",
    cover:
      "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=900&q=80",
    tags: ["CSS", "布局", "响应式"],
    excerpt:
      "用一维和二维这条线来区分 Flex 与 Grid，让页面结构更稳定，也让移动端适配更可控。",
    content: `
      <p>Flex 更适合处理一条轴上的排列，比如导航、按钮组、卡片内部的图文。Grid 更适合处理二维布局，比如博客主体的文章列和侧边栏。</p>
      <h3>实践规则</h3>
      <p>当布局需要同时关心行和列时优先用 Grid；当只需要处理横向或纵向排列时用 Flex。这个规则不绝对，但能避免很多嵌套混乱。</p>
      <p>个人博客首页就是典型 Grid 场景：桌面端主列加侧边栏，移动端直接变成一列。</p>
    `,
  },
  {
    id: "react-state-thinking",
    title: "React 状态设计：先分清来源再写组件",
    category: "React",
    date: "2026-05-08",
    readTime: "9 min",
    cover:
      "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=900&q=80",
    tags: ["React", "组件设计", "状态管理"],
    excerpt:
      "组件写乱很多时候不是 API 不熟，而是没有先判断状态到底属于服务端、页面、组件还是派生数据。",
    content: `
      <p>写 React 前先问一个问题：这个状态的真实来源在哪里？如果它可以从已有数据计算出来，就不要再单独存一份。</p>
      <h3>四类状态</h3>
      <p>服务端状态来自接口；页面状态控制筛选、分页和弹窗；组件状态处理输入、展开和临时交互；派生状态应该通过计算得到。</p>
      <p>把状态分清楚以后，组件层级和数据流会自然很多，也更容易排查 bug。</p>
    `,
  },
  {
    id: "typescript-notes",
    title: "TypeScript 入门后真正有用的三个习惯",
    category: "TypeScript",
    date: "2026-04-28",
    readTime: "7 min",
    cover:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
    tags: ["TypeScript", "类型系统", "工程化"],
    excerpt:
      "少写 any、先定义边界数据、让类型服务业务含义，而不是为了类型而类型。",
    content: `
      <p>TypeScript 的价值不只是补全提示，它更重要的作用是把数据边界写清楚，让错误尽早暴露。</p>
      <h3>三个习惯</h3>
      <p>第一，接口返回值不要偷懒写 any。第二，外部输入先校验再进入业务逻辑。第三，类型名称要表达业务含义，而不是只描述形状。</p>
      <p>当类型能帮助别人理解代码意图时，它才真正发挥了作用。</p>
    `,
  },
  {
    id: "learning-system",
    title: "如何把零散学习变成知识库",
    category: "学习方法",
    date: "2026-04-18",
    readTime: "5 min",
    cover:
      "https://images.unsplash.com/photo-1456324504439-367cee3b3c32?auto=format&fit=crop&w=900&q=80",
    tags: ["学习方法", "知识库", "复盘"],
    excerpt:
      "技术学习不能只收藏链接，更要把问题、结论、例子和复盘写成能被再次使用的内容。",
    content: `
      <p>知识库不是资料仓库。资料仓库解决“放在哪里”，知识库解决“下次怎么用”。</p>
      <h3>记录模板</h3>
      <p>我会按照四个部分记录：遇到的问题、当时的误解、最终的理解、下次遇到类似问题如何判断。</p>
      <p>这能把一次学习转化成长期资产，也能在面试或项目中更快组织表达。</p>
    `,
  },
];

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
    .slice()
    .sort((a, b) => new Date(b.date) - new Date(a.date))
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

function openPost(id) {
  const post = posts.find((item) => item.id === id);
  if (!post) return;

  els.readerTitle.textContent = post.title;
  els.readerMeta.textContent = `${formatDate(post.date)} · ${post.category} · ${post.readTime}`;
  els.readerTags.innerHTML = post.tags.map((tag) => `<span class="tag"># ${tag}</span>`).join("");
  els.readerContent.innerHTML = post.content;
  els.reader.classList.add("is-open");
  els.reader.setAttribute("aria-hidden", "false");
  document.body.classList.add("reader-open");
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
  const phrases = [
    "了解真相才能获得真正的自由",
  ];
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

renderSidebar();
renderPosts();
bindEvents();
bootTypewriter();

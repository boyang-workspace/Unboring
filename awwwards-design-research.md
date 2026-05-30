# Awwwards 设计研究综合报告

> 研究日期: 2026-05-28
> 来源: https://www.awwwards.com/
> 版本: v2 — 深度扩展版
> 研究范围: 访问 30+ 页面 / 分析 15+ 外部站点 / 阅读 18+ 博客文章 / 研究 8 门 Academy 课程 / 覆盖全部 7 个子站板块

---

## 一、Awwwards 平台总览

Awwwards 是全球顶尖的网页设计评选与展示平台，围绕四个核心支柱组织：

| 模块 | 说明 |
|------|------|
| **Websites (作品)** | 30+ 分类的获奖/提名网站，按 Category / Tag / Technology / Country / Color / Font 筛选 |
| **Collections (合集)** | 设计模式驱动的精选合集（CSS动画、WebGL、Storytelling、渐变等） |
| **Academy (学院)** | 28+ 门视频课程，$12/月全通，涵盖 Figma、UX、创意编码、设计系统 |
| **Elements (元素)** | 47 种 UI 组件分类库（Header/Footer/Form/Navigation/Transition 等） |
| **Directory (名录)** | 1975+ 设计机构/自由职业者，可按类型、预算、国家搜索 |
| **Blog (博客)** | 设计方法论、案例研究、趋势分析 |
| **Market (市场)** | Framer 模板交易 |

### 网站分类体系

- **按奖项**: Sites of the Day / Sites of the Month / Sites of the Year / Nominees / Honorable Mention
- **按类别 (30+)**: E-commerce, Architecture, Design Agencies, Fashion, Portfolio, Experimental, Storytelling, Startup...
- **按技术 (80+)**: React, Next.js, Vue, Three.js, WebGL, GSAP, Framer Motion, Webflow, WordPress, Shopify...
- **按标签 (40+)**: Animation, Minimal, Typography, Parallax, Microinteractions, 3D, Dark Mode...
- **按国家 (70+)**: US, UK, France, Japan, Brazil, India, China...

---

## 二、获奖网站设计模式深度分析

### 2.1 直接访问分析的站点

#### A. Baunfire (baunfire.com) — Silicon Valley 数字设计机构

| 维度 | 详情 |
|------|------|
| **框架** | Gatsby (React SSG) + Contentful CMS |
| **部署** | Netlify |
| **配色** | 深色主题 (#111 #272628) + 红色强调 + 白色文字 (#f9f9f9) |
| **排版** | 自定义类型系统：`type-h11`/`type-h3`/`type-sub2`/`type-sub3`/`type-comp2` |
| **动效** | 逐字母分割动画（每个字母 `<div>` 独立包裹）+ scroll-triggered reveal |
| **核心亮点** | 巨型 SVG 品牌字母作为 Hero 视觉；红色强调色在深色背景上极具冲击力；逐字母动画增加高级感 |

**关键 CSS 模式:**
- 字母动画: `hidden-onload` / `animate-load` / `swipe-to-appear` 类
- 延迟系统: `initial-delay` / `delayed` 类实现交错入场
- 变换: `translate3d` 为基础的定位

#### B. Noomo Agency (noomoagency.com) — 洛杉矶 3D Storytelling 机构

| 维度 | 详情 |
|------|------|
| **框架** | Nuxt 3 (Vue 3) + Prismic CMS |
| **部署** | Vercel |
| **3D** | Three.js / WebGL - 全屏 3D 场景作为背景 |
| **动效** | Locomotive/Lenis 平滑滚动 + 滚动驱动的摄像机移动 |
| **预加载** | 品牌 logo 动画预加载器 |
| **表单** | 联系表单含预算选择 (50K-100K / 100K-300K / 300K+) — 行业罕见透明度 |
| **奖项墙** | 扩展式奖项手风琴 (23 Awwwards / 12 FWA / 8 Webby / 7 CSSDA) |

**关键设计决策:**
- 3D 场景持续存在于 smooth-scroll wrapper 中，永不卸载
- Pinia store 管理场景状态（`cameraMove`, `sceneId`, `mixers`）
- 自定义字体栈: `font-machina-60/120/30` + `font-neue-roman-16/24/14-500`
- Hover 效果: mask + 箭头切换动画
- 提交按钮: 白色文字深色背景 → 深色文字白色背景 的翻转

#### C. Nectar Studio (nectarestudio.com) — 瓦伦西亚/马德里设计机构

| 维度 | 详情 |
|------|------|
| **框架** | WordPress |
| **配色** | 浅色主题 + 深色文字 |
| **排版** | 系统字体（无自定义加载） |
| **动效** | 克制的 CSS 过渡 + 品牌 logo 动画 GIF |
| **亮点** | "Let's talk" 浮动 CTA + 联系弹窗；2004-2026 悠久历史背书 |
| **风格** | 编辑式布局，内容清晰，不过度追逐趋势 |

#### D. Fluid Glass (fluid.glass) — 高端建材品牌

| 维度 | 详情 |
|------|------|
| **构建** | Nuxt.js + Storyblok CMS + Vercel |
| **动效** | GSAP ScrollTrigger + SVG 动画 |
| **导航** | "导航岛" 自适应布局 + 页底自动展开菜单 |
| **系统** | 沉浸式项目连续滚动浏览（非独立页面，而是一段叙事流） |
| **高光** | 品牌加载器作为氛围定调者；结构化的 "Get a Quote" 流程 |

#### E. Bruno Simon (bruno-simon.com) — 游戏化 3D 个人作品集

| 维度 | 详情 |
|------|------|
| **3D** | Three.js (WebGPU/TSL) + Blender |
| **核心概念** | 驾驶汽车探索 3D 岛屿，在虚拟空间中浏览作品 |
| **性能** | 实例化渲染（树木/草丛/长椅）；78,400 片草叶（每片单三角形）；DRACO 压缩 |
| **优化** | 视锥体剔除 + 纹理压缩 (ETC1S/UASTC) + 移动端自适应质量 |
| **天气系统** | 实时天气/季节/昼夜循环；所有用户共享同一环境状态 |
| **音效** | 3 首原创配曲 + 环境音（鸟/蟋蟀/海浪/风/雷）+ 空间化交互音 |
| **多人** | "耳语"留言板 + 全球 Cookie 计数器 + 圈速排行榜 |
| **成就** | 载具皮肤解锁 — 游戏化激励机制 |
| **开源** | 前端代码 MIT 开源在 GitHub |

---

### 2.2 获奖设计通用模式提炼

| # | 模式 | 采用率 | 说明 |
|---|------|--------|------|
| 1 | **深色主题** | 高 | 深灰/近黑色背景 + 白色文字 + 一个强调色 |
| 2 | **自定义排版** | 高 | 加载自定义字体 (Machina, Neue, 等) 作为设计元素 |
| 3 | **Scroll-driven 动效** | 极高 | 入场/视差/过渡全部以滚动触发，不自动播放 |
| 4 | **Headless CMS** | 高 | Contentful / Prismic / Storyblok / DatoCMS |
| 5 | **现代框架** | 高 | React (Gatsby/Next.js) > Vue (Nuxt 3) |
| 6 | **3D/WebGL** | 中-高 | Three.js 作为差异化竞争点 |
| 7 | **SVG 作为设计要素** | 高 | Logo、装饰、品牌字母均用 SVG（非图片） |
| 8 | **预加载器** | 中 | 品牌动画预加载，营造抵达感 |
| 9 | **连续滚动叙事** | 中 | 项目以"流"呈现而非独立页面 |
| 10 | **展示奖项与案例** | 高 | 以作品和奖项作为首要社交证明 |
| 11 | **极简 UI / "杀死界面"** | 中 | 去除多余导航，让作品本身成为界面 |
| 12 | **性能即设计** | 高 | CDN + 图片优化 + 代码分割 作为设计的一部分 |

---

## 三、Blog 设计方法论精华

### 3.1 文章清单

| 文章 | 日期 | 关键方法论 |
|------|------|-----------|
| **Not a Portfolio. A Presence.** | Apr 2026 | 杀死界面 / 节奏取代导航 / 动效即叙事 / 减少控制增加信任 |
| **Fluid Glass - Case Study** | May 2026 | 动效研究先行 / 连续滚动叙事 / 数字好客 / 性能即设计 |
| **Mapping the Uncharted: San Rita** | Apr 2026 | 数字工艺 / GLSL自定义着色器 / 全局 Canvas 不卸载 / 自适应质量 / 克制 |
| **30 Great Websites with Parallax** | Jul 2025 | 多速度层创造深度 / 水平滚动 / 鼠标视差 / WebGL 3D 视差 |
| **Trendy Gradients in Web Design** | Jul 2025 | 多色渐变趋势 / 不规则形状+模糊 / 工具生态 |
| **100 Best Free Fonts for Designers** | Jul 2025 | 可变字体 / 编辑式排版 / 字体配对 / 视觉层级 |
| **Bruno's Portfolio Case Study** | Mar 2026 | 游戏化作品集 / Blender→Three.js 管线 / 音效设计 / 多人特性 |
| **Become a Jury Member 2026** | Mar 2026 | 评审标准：创新、协作、卓越 |

### 3.2 核心设计方法论提炼

#### 方法论 1: "杀死界面" (Kill the Interface)
> 出自: Not a Portfolio. A Presence.

- 移除 UI 元素，让作品本身成为界面
- 不做显式导航，用 **节奏 (Rhythm)** 来驱动浏览
- 动效不是装饰，而是 **叙事载体 (Motion as Narrative)**
- 减少控制，相信用户可以通过直觉探索
- "Every decision carries more weight when there are fewer components to support it."

**适用场景**: 创意作品集、品牌展示、影视类网站

#### 方法论 2: 数字工艺 (Digital Craft)
> 出自: Mapping the Uncharted: San Rita

- 手工感 > 完美感 —— "human intuition and 'imperfect' design are more valuable than ever"
- 使用 GLSL 着色器在材质中添加噪点和纹理，创造可触摸感
- 全局 Canvas 模式：3D 场景永不卸载，导航只是摄像机移动
- 自适应质量系统：降帧时自动降低阴影/纹理精度保证流畅
- "杀死心头好" (Killing Darlings)：删除过多特性，聚焦核心感受

**适用场景**: 品牌故事、沉浸式体验、数据可视化

#### 方法论 3: 动效研究先行 (Motion Studies First)
> 出自: Fluid Glass Case Study

- 在写代码之前，先通过动效研究探索交互的节奏
- 测试不同 timing, easing, response 的组合
- 建立一致的交互语言 (consistent interaction language)
- 预加载器作为氛围定调者（不是等待而是仪式感）

**适用场景**: 任何包含动画交互的项目

#### 方法论 4: 叙事驱动导航 (Narrative-Driven Navigation)
- 项目展示不是独立页面，而是连续流
- 浏览 = 旅程 (journey)，不是搜索任务 (search task)
- 过渡 = 剪辑 (cuts)，停顿 = 有意为之 (deliberate)
- "It feels closer to watching than browsing"

**适用场景**: 故事型品牌、案例展示、产品发布

#### 方法论 5: 游戏化作品集 (Gamified Portfolio)
> 出自: Bruno Simon

- 3D 世界探索代替传统浏览
- 成就系统 + 奖励（载具皮肤）
- 多人元素（留言、排行榜）增加社交粘性
- 实时天气/季节系统增加沉浸感
- "Sound is one of the most powerful ways to convey emotion"

**适用场景**: 个人作品集、技术展示、社区平台

#### 方法论 6: 数字好客 (Digital Hospitality)
> 出自: Fluid Glass

- 在用户到达页底时，菜单自动轻微展开（无需点击）
- 微交互消除摩擦
- 系统主动服务用户，而非等待用户操作

**适用场景**: 服务型品牌、SaaS 产品、展示型网站

---

## 四、Awwwards Academy 课程体系

### 4.1 核心课程分类

| 分类 | 课程数 | 代表课程 | 适合 |
|------|--------|----------|------|
| **Figma UI 设计** | 8+ | Learn UI Design with Figma from Scratch (4.9★) | 设计入门/进阶 |
| **UX 研究** | 2 | UX Research 101 (4.9★) | 产品设计 |
| **创意编码** | 2 | Creative Coding 2.0 in JS (4.9★) | 前端动效 |
| **3D/WebGL** | 1 | 3D Particle with Blender + Three.js (4.7★) | 3D 网站 |
| **设计系统** | 1 | Design Systems for Websites using Figma (4.7★) | 规范化设计 |
| **Webflow** | 1 | Website Creation with Webflow (4★) | 无代码 |
| **SEO** | 1 | SEO Basics for Beginners (4.7★) | 营销 |
| **无障碍** | 1 | Digital Accessibility as a Mindset (5★) | 全栈 |
| **叙事设计** | 1 | The Narrative Web: Storytelling UX/UI (4.7★) | 品牌设计 |
| **电商** | 2 | Ecommerce Design from Scratch with Figma (5★) | 电商 |

### 4.2 学习路径建议

```
入门: Figma UI Design → UX Research → Design Systems
动效: Creative Coding 2.0 → Animation System → 3D Particle Scene
进阶: Narrative Web → Holistic Design → Advanced Prototyping
专项: Ecommerce Design → Webflow → SEO
```

---

## 五、设计工具与技术栈生态

### 5.1 获奖站点技术栈频率

| 技术 | 出现率 | 用途 |
|------|--------|------|
| **GSAP** | 极高 | ScrollTrigger、时间线动画、序列控制 |
| **Three.js** | 高 | 3D 场景、粒子、WebGL 渲染 |
| **Next.js / Nuxt** | 高 | React/Vue 全栈框架 |
| **Lenis / Locomotive** | 高 | 平滑滚动 |
| **Contentful / Prismic** | 中-高 | Headless CMS |
| **Vercel / Netlify** | 高 | JAMstack 部署 |
| **Blender** | 中 | 3D 模型 → Three.js |
| **GLSL Shaders** | 中 | 自定义材质的视觉效果 |
| **SVG** | 极高 | Logo、装饰、品牌元素 |
| **Figma** | 极高 | 设计工具 |

### 5.2 渐变工具推荐

| 工具 | URL | 用途 |
|------|-----|------|
| WebGradients | webgradients.com | 180 CSS 渐变集合 |
| Khroma AI | khroma.co | AI 生成调色板 |
| Color Space | mycolor.space | 三色渐变生成器 |
| UI Gradients | uigradients.com | 渐变合集 |
| Easing Gradients | larsenwerk.com/easing-gradients | 缓动渐变 |
| Eggradients | eggradients.com | 200+ 渐变背景 |

### 5.3 免费字体推荐

| 字体 | 来源 | 特点 |
|------|------|------|
| Geist | Vercel | 现代无衬线 |
| Satoshi | Fontshare | 商业免费可变字体 |
| Cabinet Grotesk | Fontshare | 可变字体 |
| Clash Display | Fontshare | 展示型可变字体 |
| PP Mori | 个人项目免费试用 | 优雅无衬线 |
| NOHEMI | 9种样式可变 | 可变字体 |
| Bigilla | 免费 | 展示衬线体 |

---

## 六、"Unboring" 项目可借鉴的设计原则

### 6.1 可以直接用

1. **深色主题 + 一个强调色** — 几乎所有获奖站点都在用
2. **Scroll-driven 入场动画** — GSAP ScrollTrigger 实现
3. **逐字母/逐字动画** — 增加高级感，实现简单
4. **平滑滚动** — Lenis / Locomotive Scroll 库
5. **Bento Grid 布局** — 模块化卡片式布局
6. **品牌 SVG 作为核心视觉** — 替代图片
7. **展示数据/案例作为社交证明** — 模仿 Noomo 的奖项墙

### 6.2 适合差异化

1. **"杀死界面"** — 减少框架和导航，让内容成为体验
2. **游戏化** — 成就系统、排行榜、探索奖励
3. **3D/WebGL 场景** — Three.js + Blender 管线
4. **自适应质量系统** — 降帧时降画质保流畅
5. **音效设计** — 空间化音频增强沉浸感
6. **实时环境（天气/时间）** — 增加世界的真实感

### 6.3 设计原则清单

```
□ 动效研究先行 — 先做 motion study 再写代码
□ 一致性交互语言 — 所有动画共享同一 timing/easing 体系
□ 性能即设计 — CDN + 图片优化 + 代码分割 不作为事后
□ 数字工艺 — 手工感 > 完美感；GLSL 纹理增加可触摸感
□ 叙事驱动 — 浏览是旅程不是任务
□ 克制 — 删除比添加更难；每个组件必须有存在的理由
□ 数字好客 — UI 主动服务，减少用户操作
□ 信任用户 — 不解释所有东西，让直觉导航
```

---

## 七、后续行动建议

1. **建立设计系统 (Design System)** — 参考 Filip Felbar 的课程，从 Figma tokens 开始
2. **搭建设计模式库 (Pattern Library)** — 从 Elements 分类中提取常用组件
3. **尝试第一个 3D/WebGL 实验** — Blender + Three.js 管线，从小场景开始
4. **GSAP 动效研究** — 建立自己的 motion study 流程
5. **叙事驱动原型** — 选择一个项目用"旅程"而非"页面"的思维重新构思
6. **持续跟踪 Awwwards** — Sites of the Day 作为日常灵感源
7. **阅读更多方法论文章** — Academy 的 Narrative Web 课程推荐

---

## 八、Awwwards 评分与评审系统详解

### 8.1 评分标准（四大维度加权）

| 维度 | 权重 | 说明 |
|------|------|------|
| **Design (设计)** | **40%** | 视觉美学、布局、配色、排版、整体视觉语言 |
| **Usability (可用性)** | **30%** | 导航易用性、交互流畅度、信息架构 |
| **Creativity (创意)** | **20%** | 创新程度、独特性、突破性思维 |
| **Content (内容)** | **10%** | 内容质量、信息传达、文案撰写 |

### 8.2 评审流程

1. **提交** → 人工审核最低标准要求（不接受预置模板）
2. **通过** → 网站发布在 awwwards 上
3. **投票期 (5天)** → 至少 18 名评审员评分 + 用户投票
4. **结果** → SOTD / Honorable Mention / 无奖项

### 8.3 自动去偏机制
- 每个站点至少 18 名 Jury 打分
- **距离平均值最远的 3 个分数被自动剔除**
- PRO 用户的投票才算入官方分数（防止刷票）

### 8.4 奖项层级

| 奖项 | 条件 |
|------|------|
| **Honorable Mention** | Jury ≥ 6.5 AND User ≥ 6.5 |
| **Site of the Day (SOTD)** | 每天最高分，每年仅 365 个 |
| **Developer Award** | SOTD 站点 + 性能/SEO/无障碍 > 7 |
| **Site of the Month (SOTM)** | 每月前 8 名，重新评审 |
| **Site of the Year (SOTY)** | 所有 SOTM 获奖者 + 精选 |

---

## 九、Sites of the Day 完整榜单 (当前轮)

| # | 站点名 | 关键标签 | 技术栈 |
|---|--------|---------|--------|
| 1 | AIR | WebGL, Three.js, Minimal, Real Estate | Three.js, WebGL |
| 2 | Razorpay Sprint 26 | WebGL, 3D, Scrolling, Fintech | Webflow, Three.js |
| 3 | Cartier W&W 2026 | Three.js, GLSL, Luxury, Blender | Three.js, Blender, GLSL |
| 4 | Aimee's Papercraft World | Three.js, React, 3D, Colorful | React, Three.js, Blender |
| 5 | Cleo AI | React, Next.js, Framer, Data Viz | Next.js, Framer Motion |
| 6 | Sidewave | WebGL, Unity, 3D, Portfolio | Unity, WebGL |
| 7 | La Revoltosa | GSAP, Three.js, 3D, Illustration | Three.js, GSAP |
| 8 | Aino Agency | Vanilla JS, Portfolio, Experimental | Shopify/Hydrogen |
| 9 | Thorgal | Motion, Astro, WebGL, Parallax | Astro, WebGL |
| 10 | Capitolium | GSAP, Nuxt.js, Typescript | Vue/Nuxt, WebGL |
| 11 | KVS Studio | Three.js, 3D, Vue.js, Sound | Three.js, Vue.js |
| 12 | Enerblock | GSAP, Sanity, Astro, UI Design | Astro, Sanity CMS |
| 13 | Juan Mora | GSAP, Lottie, Webflow, Portfolio | Webflow, GSAP |
| 14 | fromanother.love | React, Next.js, Prismic, Portfolio | Next.js, Prismic |
| 15 | sakazuki | Figma, Illustrator, Experimental | Figma, AI |
| 16 | Power of Storytelling | Three.js, GSAP, 3D, Luxury | Three.js, GSAP |
| 17 | Pacôme Pertant | Three.js, GSAP, Nuxt.js, 3D | Nuxt.js, Three.js |
| 18 | Steven.com | Three.js, 3D, Webflow | Webflow, Three.js |
| 19 | Auremin | Three.js, Animation, Scrolling | Three.js |
| 20 | Novu | Next.js, Motion, CSS, Typography | Next.js |
| 21 | Palladio Group | WordPress, GSAP, 3D, Video | WordPress, GSAP |
| 22 | Floema | GSAP, Nuxt.js, 3D, E-Commerce | Nuxt.js, Three.js, GSAP |
| 23 | Major Media Agency | Figma, Framer, Cinema 4D | Framer, C4D |
| 24 | Luca Nardi | Three.js, GSAP, 3D, Sound | Three.js, GSAP |
| 25 | UMANO DESIGN | CSS, HTML5, Scrolling | Vanilla |
| 26 | Banh Mi World | Figma, Elementor, WP, Illustration | WordPress, Elementor |
| 27 | Code by Jesse | BARBA.js, Webflow, Responsive | Webflow |
| 28 | Happly | Shopify, Figma, E-Commerce | Shopify |
| 29 | REF Digital | GSAP, GLSL, Nuxt.js, Portfolio | Nuxt.js, GSAP, GLSL |
| 30 | Hashgraph Ventures | Three.js, 3D, Nuxt.js, Sanity | Nuxt.js, Three.js |
| 31 | CREATIVECUE® | React, Lottie, Figma, Portfolio | React, Lottie |

**技术栈分布**: Three.js 12+ / GSAP 10+ / Nuxt.js 5+ / Next.js 4+ / WebGL 8+ — Three.js 是绝对的统治级技术

---

## 十、最受赞誉设计机构 TOP 24

| # | 机构 | 国家 | HM | SOTD | SOTM | SOTY |
|---|------|------|----|------|------|------|
| 1 | **Locomotive** | 🇨🇦 Canada | 130 | 89 | 4 | 1 |
| 2 | **Immersive Garden** | 🇫🇷 France | 89 | 68 | 13 | 3 |
| 3 | **Resn** | 🇳🇿 New Zealand | 76 | 61 | 11 | 2 |
| 4 | **Monks** | 🇳🇱 Netherlands | 112 | 59 | 8 | 4 |
| 5 | **Active Theory** | 🇺🇸 US | 76 | 57 | 10 | 3 |
| 6 | **Hello Monday** | 🇺🇸 US | 60 | 53 | 9 | 2 |
| 7 | **AQuest** | 🇮🇹 Italy | 80 | 49 | 3 | 2 |
| 8 | **dogstudio** | 🇺🇸 US | 60 | 43 | 5 | 2 |
| 9 | **makemepulse** | 🇫🇷 France | 55 | 40 | 8 | 1 |
| 10 | **Build in Amsterdam** | 🇳🇱 Netherlands | 51 | 41 | 2 | 4 |
| 11 | **Merci Michel** | 🇫🇷 France | 58 | 39 | 6 | 2 |
| 12 | **Adoratorio Studio** | 🇮🇹 Italy | 65 | 44 | 1 | 0 |
| 13 | **Louis Paquet** | 🇨🇦 Canada | 49 | 40 | 2 | 1 |
| 14 | **Bürocratik** | 🇵🇹 Portugal | 48 | 41 | 1 | 0 |
| 15 | **Unseen Studio** | 🇬🇧 UK | 48 | 34 | 3 | 0 |
| 16 | **Obys** | 🇺🇦 Ukraine | 41 | 32 | 2 | 0 |
| 17 | **Zhenya Rynzhuk** | 🇺🇸 US | 31 | 30 | 1 | 2 |
| 18 | **REJOUICE®** | 🇺🇸 US | 32 | 29 | 1 | 0 |
| 19 | **Synchronized Studio** | 🇺🇸 US | 27 | 26 | 0 | 2 |
| 20 | **Spring/Summer** | 🇩🇰 Denmark | 30 | 23 | 0 | 2 |
| 21 | **ET Studio** | 🇮🇹 Italy | 33 | 25 | 0 | 0 |
| 22 | **The First The Last** | 🇺🇸 US | 44 | 22 | 0 | 2 |
| 23 | **BONHOMME** | 🇫🇷 France | 51 | 23 | 1 | 0 |
| 24 | **Akaru** | 🇫🇷 France | 43 | 21 | 1 | 0 |

**地理分布**: US (7) > France (4) > Italy (3) > Canada (2) = Netherlands (2) > NZ/Portugal/UK/Ukraine/Denmark

---

## 十一、更多已访问外部站点深度分析

### 11.1 Monks (monks.com)

| 维度 | 详情 |
|------|------|
| **框架** | Drupal 10 |
| **字体** | Helvetica Now |
| **配色** | 白色背景 + 多彩区块（黄/青/粉） |
| **动效** | Canvas 动画 + 视频背景 + 滚动触发展示 |
| **导航** | 顶栏 Mega Menu: Solutions/Marketing/Technology/Work/About |
| **特质** | 全球顶级营销技术公司。AI Storytelling 定位清晰。用 Drupal 管理海量内容 |

### 11.2 OddCommon (oddcommon.com)

| 维度 | 详情 |
|------|------|
| **框架** | 无大框架 / Vercel 部署 |
| **字体** | Roobert |
| **配色** | 浅色 (`#f4f4f4`) + 强调黄 (`#ffea28`) |
| **动效** | Canvas 背景效果 + 交互相应 |
| **导航** | Work / Expertise / Commoners / Careers / Contact + 明暗模式切换 |
| **特质** | B-Corp 认证。诚实、克制的设计。"Anti good enough" 态度。明暗模式切换是亮点 |

### 11.3 Bürocratik (burocratik.com)

| 维度 | 详情 |
|------|------|
| **框架** | Nuxt.js，DigitalOcean Spaces 托管媒体 |
| **字体** | Commercial Gräphik Web（自定义可变字体） |
| **配色** | 白/黑/红 — 红色作为签名色 |
| **动效** | Canvas 交互图形 + 作品悬停效果 |
| **导航** | 汉堡菜单 + 全屏覆盖：Homepage/Studios/Recognition/Work/Branding/18 Years |
| **特质** | "299 awards"，欧洲 #1 数字设计工作室。18 年历史。幽默个性 + 葡萄牙地理位置玩笑 |

### 11.4 San Rita (sanrita.ca)

| 维度 | 详情 |
|------|------|
| **框架** | Next.js + Turbopack |
| **核心技术** | Three.js / WebGL — 3D 地形程序化生成 |
| **字体** | Times (衬线体) |
| **配色** | 全黑背景 + 白色文字 — 极简单色 |
| **动效** | 完整的"地球化 (Terraforming)"加载序列：数据耳语 → 大气层部署 → 地质系统创建 → 生态系统建模 |
| **导航** | "Trail" (轨迹) 隐喻 — MAP / PROJECTS / ABOUT / PLAYGROUND / CONTACT |
| **特质** | 最具创意的站点之一。3D 地形体验 + 程序化生成 + 诗意文案。轨迹/地图导航隐喻 |

### 11.5 Caracal (caracal.studio) — 不完全访问

| 维度 | 详情 |
|------|------|
| **框架** | Next.js + Chakra UI |
| **字体系统** | **Sohne** (主字体 300-700) + **Plain** (粗体) + **NimbusSansDOT** (扩展) |
| **风格** | 布鲁塞尔品牌/网页设计工作室 |

### 11.6 Floema (floema.com) — SOTD May 13

| 维度 | 详情 |
|------|------|
| **框架** | Vue.js/Nuxt, GSAP, Three.js |
| **机构** | Bürocratik |
| **风格** | 浅色自然色 + 可持续城市家具品牌。3D 产品交互展示可持续材料。电商 + 可持续叙事 |
| **评分** | **7.65/10** (较高分) |

### 11.7 Aimee's Papercraft World — SOTD May 24

| 维度 | 详情 |
|------|------|
| **框架** | Three.js, React, Blender, GSAP |
| **设计师** | Andrew Woan |
| **风格** | **3D 纸艺 (Papercraft)** — Blender 导出带纸张纹理的 3D 模型 + 折叠动画 |
| **评分** | **7.33/10** |
| **特质** | 独特的纸艺美学。深度的个人叙事（行业内的虐待经历 → 疗愈） |

### 11.8 Capitolium — SOTD May 18

| 维度 | 详情 |
|------|------|
| **框架** | Vue.js/Nuxt, WebGL |
| **机构** | Supercolor |
| **风格** | 深色沉浸式。全屏入口门 ("Entrer") + 滚动叙事。TéFéCé × Stade Toulousain 品牌合作 |

---

## 十二、更多 Blog 文章方法论精华 (扩展)

### 12.1 新文章的完整方法论

#### Article 1: StringTune Case Study — 齿轮、凹槽与联锁叙事
**设计方法**: 将品牌比喻转化为交互机制 — 齿轮啮合、凹槽纹理成为视觉语言。色彩作为功能纹理的一部分。复杂产品转化为直观交互

#### Article 2: Farm Minerals Case Study — 化肥公司的设计挑战
**设计方法**: B2B 企业的品牌重塑。原材料质感传达力量感。棕/黑/白/土色系，硬朗的工业排版

#### Article 3: UNESCO Virtual Museum — 文化机构的数字转型
**设计方法**: 文化遗产的数字表达。交互式时间线 + 3D 文物浏览。教育与沉浸的平衡

#### Article 4: Ribbit Case Study — 角色驱动的品牌网站
**设计方法**: 拟人化品牌角色 (Ribbit) 作为核心交互入口。SVG 动画角色 + 滚动叙事。角色从静态→动态→交互的三阶段递进

#### Article 5: RossMason Case Study
**设计方法**: 复古未来主义排版。沉浸式背景 + 大胆的字体展示。低多边形风格的 3D 交互

#### Article 6: Mat Voyce Case Study
**设计方法**: 字体的流动性 — 文字本身成为动画和交互的载体。变形、扭曲、延展的排版作为艺术作品

#### Article 7: Bloom Case Study — 复杂科技产品的视觉转译
**设计方法**: 抽象概念可视化。滚动驱动的科普叙事。从微观到宏观的缩放镜头。数据可视化辅助理解

#### Article 8: Follow.art Case Study
**设计方法**: 社交平台 × 艺术画廊的混合界面。瀑布流 + 网格的杂交布局。滚动触发的内容加载

#### Article 9: Igloo Inc Case Study
**设计方法**: 品牌 IP 的沉浸式空间。3D 冰屋场景 + 角色交互。故事驱动的品牌体验

#### Article 10: Motion.Ed by Zajno — Webflow 动效实战
**设计方法**: Webflow 平台的动效极限探索。帧序列替代视频实现滚动动画。无代码实现复杂交互的可能性

### 12.2 额外设计模式文章

#### A. 微交互设计的 8 个步骤
1. **响应时间** — 0.1 秒内激活，否则脱离动作感
2. **重复性** — 保持一致的用户预期
3. **简洁性** — 尽量快速传达信息
4. **相关性** — 文本要说人话，传达情感
5. **易用性** — 模仿自然人类行为，考虑人性失误
6. **动画** — 告知进度但不干扰当前操作；有用 > 炫丽
7. **平衡** — 对比突出重点，但过度会分散注意力
8. **进化** — 微交互不必每次都相同

#### B. UI 动画工具清单
| 工具/库 | 特点 |
|---------|------|
| **Popmotion** | 驱动 Framer Motion 的底层库，<5kb |
| **Velocity.js** | 高性能，Uber/WhatsApp 使用 |
| **Anime.js** | 轻量级，支持 SVG/DOM/CSS/JS Object |
| **Mo JS** | 运动图形，声明式 API |
| **LottieFiles** | Airbnb 出品，Uber/Microsoft/Google 使用 |
| **Origami** | Facebook 出品，Figma/Sketch 集成 |
| **GSAP** | 业界标准，TweenMax/TimelineMax |

#### C. 30 种导航模式
- 3D 环境导航 / 圆形导航 / 水平滚动 / 旋转立方体 / 地图导航 / 浮动菜单 / 360° 导航 / 方向变化导航 /
键盘+滚动导航 / 缩放与滚动 / 拖拽与手势 / 翻页滑动 / 揭示滚动
- **未来方向**: 手势驱动界面、语音控制界面 (ASR + NLU + ML)、VR/AR 导航

#### D. 加载动画策略
- **感知性能 (Perceived Performance)**: 用户期望 0.2 秒内反馈，2 秒内完成
- 3 种策略: 进度反馈 / 主动等待 (微游戏/个性化) / 愉悦技巧 (动画字体/倒计时/幽默)

#### E. 声音设计的 3 个方向
- **声音景观 (Sonoric Landscapes)**: Web Audio API 空间化音频，模拟距离和方向
- **旁白与叙事**: 最纯粹的讲故事形式，但网页上极少见
- **"我们仍然对界面持有非常'图形化'的观点，是时候引入其他感官了"**

#### F. 暗色模式的 10 个好处
1. 视觉舒适度 / 2. 能源效率 (OLED) / 3. 增强可读性 / 4. 提升专注 / 5. 美观现代
6. 个性化 / 7. 减少蓝光 / 8. 无障碍 / 9. 品牌选择 / 10. 用户满意度

#### G. UX 文案 & 微文案
- **"Writing is designing too"** — 文案也是设计
- 语气匹配上下文：密码错误时不开玩笑，成功时可以用幽默
- 18 个最佳示例包括 Cleo (Hype/Roast 模式)、imreallyatrex ("chlll" 按钮)、Vovi Studio (直接创始人 Slack 链接)

---

## 十三、Collections 完整分类 (30+ 合集)

| 合集 | 说明 |
|------|------|
| **CSS Animations** | CSS 动画技术网站 |
| **WebGL Animations** | WebGL 驱动动画体验 |
| **WebGL / HTML5 Games** | 浏览器游戏展示 |
| **Agency Portfolios** | 设计机构作品集 |
| **Illustration in Web Design** | 插画型网页设计 |
| **Built with React** | React 站点合集 |
| **Music Interfaces** | 音乐/音频 UI |
| **Storytelling Websites** | 叙事型网页体验 |
| **Movie Landing Pages** | 电影宣传页 |
| **Interactive Experience** | 高互动性网页项目 |
| **Interactive Narratives** | 故事驱动的互动内容 |
| **Creative Spaces** | 创意/实验性数字空间 |
| **Calligraphy Fonts** | 书法/手写字体展示 |
| **Video & Audio Players** | 媒体播放器界面 |
| **Trendy Gradients** | 渐变色彩设计 |
| **Layout** | 独特布局方式 |
| **Product Page** | 产品页面设计 |
| **Games** | 网页游戏项目 |
| **Web Audio API / Audio Viz** | 音频驱动视觉体验 |
| **Three.js** | Three.js 3D 项目 |
| **AI Powered Web Projects** | AI 集成网页体验 |
| **Minimal** | 极简设计 |
| **Photography Portfolio** | 摄影作品集 |
| **WebGL Inspiration** | WebGL 灵感 |
| **Horizontal Layout** | 水平滚动布局 |
| **One Page** | 单页设计 |
| **Animation Libraries** | GSAP/Framer Motion 等 |
| **Hot Right Now 🔥** | 当前热门精选 |
| **Color Exploration** | 实验性配色 |
| **Electric Colors** | 霓虹色系 |
| **Pastel Colors** | 柔和色系 |
| **Handy Tools & Apps** | 设计师工具 |

---

## 十四、Elements (UI 组件库) 完整分类 (47 种)

```
404 pages / About Us / Animation / Blog / Branding / CTA / Contact / Content /
Cookie / Desktop thumbnail / FAQ / Footer / Forms / Gallery / Header / Hero Image /
Icons / Illustration / Interaction / Layout / Loading / Login/Sign up / Maps /
Menu / Microcopy / Mobile thumbnail / Modal/Popup / Mouse Interaction /
Navigation / Newsletter / Notification / Other / Pagination / Photo /
Pricing / Products / Scroll / Search / Shopping cart / Sidebar / Social Share /
Stats / Team / Transition / UI Components / Video
```

### Elements 过滤维度
- **Category** (47 种元素类型)
- **Color** (16 进制颜色选择器)
- PRO 标记元素需要订阅

---

## 十五、Academy 课程详细内容 (深度研究)

### 15.1 额外重点课程详情

#### Course: Creative Coding 2.0 in JS (Bruno Imbrizi)
| 项目 | 详情 |
|------|------|
| 评分 | 4.9/5 |
| 时长 | 2h 47m |
| 课程内容 | canvas-sketch 设置、曲线与鼠标交互、音频频率分析、粒子系统、海报生成 |
| 适合 | 想要用 JS 做创意编程的设计师 |

#### Course: The Narrative Web (Chiara Aliotta)
| 项目 | 详情 |
|------|------|
| 评分 | 4.7/5 |
| 时长 | 2h 29m |
| 课程内容 | 故事结构解剖 → 情感连接 → 受众/目的/角色/情境 → 线框图 vs 高保真 → 通过故事说服客户 |
| 适合 | 品牌设计师和 UX 设计师 |

#### Course: Holistic Design for Digital Products (Monks)
| 项目 | 详情 |
|------|------|
| 评分 | 5/5 |
| 时长 | 3h 21m |
| 课程内容 | 策略方向 → 设计概念 → 迭代生产 → 后生产(用户测试) → 跨越业务目标/品牌/受众/文化语境 |
| 适合 | 想系统性提升设计思维的人 |

#### Course: Design Meaningful Experiences through Animation System (Louis Ansa)
| 项目 | 详情 |
|------|------|
| 评分 | 4.4/5 (Bestseller) |
| 时长 | 4h |
| 等级 | **中高级**（唯一的中级课程） |
| 课程内容 | 动画流程选择 → easing/timings 原则 → After Effects 插件工作流 → Logo/落地页/UI Kit/轮播动画 |
| 适合作品 | 曾经在 Make Me Pulse 工作，做过 Nomadic Tribe (SOTY 2019) |

#### Course: Immersive Creative Website from Scratch (Luis Bizarro — Active Theory)
| 项目 | 详情 |
|------|------|
| 评分 | 4.5/5 |
| 时长 | **25h 52m** (最全面的课程) |
| 等级 | All Levels |
| 课程内容 | 无框架构建沉浸式网站，涵盖 WebGL / GSAP / Three.js / 部署 |
| 适合 | 想全面掌握创意编码的前端开发者 |

#### Course: Digital Accessibility as a Mindset (Margot Gabel)
| 项目 | 详情 |
|------|------|
| 评分 | 5/5 |
| 时长 | 2h 04m |
| 课程内容 | 无障碍设计思维 → 包容性设计实践 |
| 适合 | 所有设计师和开发者 |

#### Course: Design Systems for Websites using Figma (Filip Felbar)
| 项目 | 详情 |
|------|------|
| 评分 | 4.7/5 |
| 时长 | 5h 05m |
| 课程内容 | 颜色/排版/网格系统 → Figma 组件库 → Design Token → 团队协作 |
| 适合 | 想要系统化设计流程的团队 |

### 15.2 Instructor 亮点
- **Daniele Buffa** — MetaLab, Google/Sony Music/Headspace 项目经验
- **Bruno Imbrizi** — Google/Spotify/Nike 创意程序员
- **Pablo Stanley** — 著名设计师/插画师
- **Monks** — 全球顶级数字营销公司
- **Fabio Ottaviani** — Blender + Three.js 3D 专家
- **Louis Ansa** — Make Me Pulse 前员工, Nomadic Tribe (SOTY 2019)

---

## 十六、Cross-Site 综合发现

### 16.1 技术栈与设计风格的关联

| 技术栈 | 典型风格 | 代表站点 |
|--------|---------|---------|
| **Three.js + WebGL** | 沉浸式 3D、环境叙事 | San Rita, Noomo, Active Theory |
| **GSAP + Lenis** | 平滑滚动、逐字动画、视差 | Baunfire, Fluid Glass |
| **Next.js + Contentful** | 编辑式、内容优先、高性能 | Caracal, fromanother |
| **Nuxt.js + Prismic** | 3D Storytelling、Vue 阵营 | Noomo, Immersive Garden |
| **Vanilla JS + SVG** | 极简、高度定制 | OddCommon |
| **Webflow** | 无代码创意站点 | Steven.com, Code by Jesse |
| **WordPress** | 传统但可靠的 CMS | Nectar, Palladio Group |

### 16.2 获奖设计 5 大差异化信号

1. **有 3D/WebGL** → 基础门槛，没有就很难赢 SOTD
2. **有自定义字体** → 字体即品牌，系统字体不够
3. **有音效设计** → 最新的差异化武器
4. **有入口仪式感** → 预加载 / 门 / 声音切换 / 语言选择
5. **有数据故事** → 数据可视化 + 叙事 = 强说服力

### 16.3 Unboring 可直接落地的行动计划

```
Phase 1 (本周):
  □ 选一个 Lenis + GSAP ScrollTrigger demo 跑通
  □ 设计系统 token 初版（颜色/字体/间距）
  □ 暗色模式 + 强调色方案

Phase 2 (两周内):
  □ 逐字母/逐字入场动画实现
  □ SVG 品牌元素设计
  □ Bento Grid 布局实验
  □ 页面过渡动画 (page transition)

Phase 3 (一个月):
  □ Three.js 小场景实验（Blender 导出管线）
  □ 自定义字体选型 + 加载策略
  □ 微交互系统化（8 步框架）
  □ 感知性能优化

Phase 4 (长期):
  □ 3D 主线场景 + 连续滚动叙事
  □ 音效设计集成 (Web Audio API)
  □ 游戏化元素（成就/进度/反馈）
  □ 自适应质量系统
```

---

## 十七、总结

Awwwards 不仅是一个设计评选平台，更是**现代网页设计的趋势风向标**。本次研究覆盖了：

- ✅ **平台结构** — 网站/合集/学院/元素/目录/博客/市场 7 大模块
- ✅ **评分系统** — 四大维度加权 + 自动去偏 + 5 级奖项
- ✅ **31 个 SOTD** — 完整榜单 + 技术栈分析
- ✅ **24 家顶级机构** — 按获奖数量排名的全球设计力量
- ✅ **15+ 外部站点** — 直接访问分析设计模式
- ✅ **18+ 博客文章** — 方法论、案例研究、趋势全面提炼
- ✅ **30+ 合集分类** — 设计模式驱动的灵感体系
- ✅ **47 种 UI 组件** — Elements 分类库
- ✅ **28+ Academy 课程** — 学习路径和详细课程内容
- ✅ **8 篇设计模式文章** — 微交互/动画/导航/手势/加载/声音/暗色/文案

**核心结论**: 要做出 "unboring" 的设计，需要同时做好三件事：
1. **基础层** — 暗色主题 + 自定义字体 + 平滑滚动 + 精确动效（这些是门票）
2. **差异层** — 3D/WebGL + 音效 + 叙事驱动 + 游戏化（这些是赢面）
3. **工艺层** — 克制 + 一致性 + 性能 + 细节（这些是持久力）

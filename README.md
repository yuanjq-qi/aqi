# 袁佳琪的个人页面

这是一个纯静态的个人页面，用于展示袁佳琪的个人信息和课程列表。

## 项目结构

```
/
├── index.html          # 首页
├── css/
│   └── style.css       # 样式文件（目前使用Tailwind CSS CDN）
├── js/
│   └── script.js       # JavaScript文件
├── courses/            # 课程详情页目录
│   ├── python-basics.html
│   ├── data-analysis.html
│   ├── data-collection.html
│   ├── supply-chain.html
│   └── database.html
└── README.md           # 项目说明
```

## 技术栈

- 前端：纯HTML + CSS + JavaScript
- 样式框架：Tailwind CSS
- 图标库：Font Awesome
- 部署：Cloudflare Pages

## 功能特点

- 响应式设计，适配不同屏幕尺寸
- 简洁美观的界面
- 课程卡片式展示
- 平滑滚动效果
- 移动端导航菜单

## 部署到Cloudflare Pages

1. 登录Cloudflare账户
2. 进入Pages页面
3. 点击"Create a project"
4. 选择你的Git仓库（如果没有，可直接上传文件）
5. 配置构建选项：
   - 构建命令：`none`（纯静态文件）
   - 构建输出目录：`/`
6. 点击"Deploy site"
7. 等待部署完成，获取网站URL

## 后续计划

- 补充各个课程的详细内容
- 添加更多个人信息和项目展示
- 优化页面性能和用户体验
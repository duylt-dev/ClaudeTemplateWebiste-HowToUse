# Website hướng dẫn dùng Claude Template

Trang tài liệu tiếng Việt hướng dẫn cách dùng template `.claude/` + `LLM.md` + `docs/`
cho một project mới.

## Chạy

```bash
cd website
npm install
npm run dev       # http://localhost:5173
```

## Build

```bash
npm run build     # ra thư mục dist/
npm run preview   # xem thử bản build
```

`vite.config.js` đặt `base: './'` và app dùng `HashRouter`, nên thư mục `dist/`
chạy được ở mọi nơi: static host bất kỳ, subpath (GitHub Pages), hoặc mở thẳng
`dist/index.html` bằng trình duyệt.

## Cấu trúc

```
src/
├── App.jsx                 # 9 route
├── main.jsx
├── components/
│   ├── Layout.jsx          # header, sidebar, TOC, pager, theme sáng/tối
│   └── ui.jsx              # Callout, Code, Table, Tree, Steps, Card, Badge, H2/H3
├── data/
│   ├── nav.js              # cấu trúc điều hướng
│   ├── llm-sections.js     # 12 mục của LLM.md
│   ├── agents.js           # 16 agent
│   └── skills.js           # 28 skill
├── pages/                  # 9 trang nội dung
└── styles/                 # global (design token) · layout · components
```

## Sửa nội dung

- Đổi/thêm trang: sửa `src/data/nav.js` rồi thêm route trong `src/App.jsx`.
- Bảng agent/skill: sửa `src/data/agents.js` và `src/data/skills.js`.
- Mục lục bên phải tự sinh từ các thẻ `<H2>` của trang, không cần khai báo.

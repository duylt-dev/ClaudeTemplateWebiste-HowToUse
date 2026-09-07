export const AGENT_GROUPS = [
  {
    title: 'Lập kế hoạch & nghiên cứu',
    icon: '🧭',
    agents: [
      {
        name: 'planner',
        model: 'opus',
        skills: 'plan',
        what: 'Nghiên cứu, phân tích và viết kế hoạch triển khai vào plans/. Được phép gọi researcher song song.',
        when: 'Trước MỌI việc lớn. Đây là agent đầu tiên của vòng chính.',
      },
      {
        name: 'researcher',
        model: 'haiku',
        skills: 'research · docs-seeker',
        what: 'Tra cứu công nghệ, tài liệu, thư viện, best practice; tổng hợp thành báo cáo trong plans/reports/.',
        when: 'Trong giai đoạn plan — chạy nhiều bản song song trên các chủ đề khác nhau.',
      },
      {
        name: 'brainstormer',
        model: 'inherit',
        skills: 'brainstorm · sequential-thinking · docs-seeker',
        what: 'Bàn phương án kiến trúc, phân tích đánh đổi, phản biện thẳng thắn.',
        when: 'Trước khi chốt một quyết định lớn: REST hay GraphQL, upload file GB, v.v.',
      },
    ],
  },
  {
    title: 'Hiện thực',
    icon: '🔨',
    agents: [
      {
        name: 'fullstack-developer',
        model: 'sonnet',
        skills: 'cook',
        what: 'Thực thi một phase cụ thể từ plan song song, với ranh giới sở hữu file nghiêm ngặt.',
        when: 'Sau khi có plan chia phase; mỗi phase một agent.',
      },
      {
        name: 'code-simplifier',
        model: 'opus',
        skills: '—',
        what: 'Rút gọn code cho rõ ràng và nhất quán, giữ nguyên toàn bộ hành vi. Chỉ động vào code vừa sửa.',
        when: 'Giữa cook và test — test phải chạy trên bản đã đơn giản hoá.',
      },
    ],
  },
  {
    title: 'Kiểm thử & chất lượng',
    icon: '🔍',
    agents: [
      {
        name: 'tester',
        model: 'haiku',
        skills: 'test · sequential-thinking',
        what: 'Chạy unit/integration/e2e, phân tích coverage, kiểm build.',
        when: 'Sau mỗi lần hiện thực. Lặp lại tới khi tất cả xanh.',
      },
      {
        name: 'code-reviewer',
        model: 'inherit',
        skills: 'code-review · scout',
        what: 'Review toàn diện kèm scout tìm edge case mà diff không lộ ra.',
        when: 'Sau khi test xanh, trước khi mở PR.',
      },
      {
        name: 'debugger',
        model: 'sonnet',
        skills: 'debug · fix · docs-seeker',
        what: 'Điều tra sự cố, phân tích log CI/CD, chẩn đoán hiệu năng, xuất báo cáo chẩn đoán.',
        when: 'Khi có bug, test đỏ, hoặc pipeline hỏng.',
      },
    ],
  },
  {
    title: 'Thiết kế',
    icon: '🎨',
    agents: [
      {
        name: 'ui-ux-designer',
        model: 'inherit',
        skills: 'ui-ux-pro-max',
        what: 'Thiết kế giao diện, design system, layout responsive, animation, tài liệu thiết kế.',
        when: 'Khi cần thiết kế hoặc audit UI.',
      },
      {
        name: 'ui-designer',
        model: 'inherit',
        skills: 'ui-design-pencil',
        what: 'Đọc thẳng PRD và dựng wireframe .pen qua Pencil MCP.',
        when: 'Sau khi có PRD. Cần MCP server pencil.',
      },
    ],
  },
  {
    title: 'Tài liệu & BA',
    icon: '📝',
    agents: [
      {
        name: 'docs-manager',
        model: 'haiku',
        skills: 'docs',
        what: 'Quản lý tài liệu kỹ thuật, cập nhật docs theo thay đổi code, viết PDR.',
        when: 'Bước cuối của vòng chính — cùng commit với thay đổi code.',
      },
      {
        name: 'ba-writer',
        model: 'inherit',
        skills: 'project-kickoff · product-requirements · qa-uat',
        what: 'Sinh Kickoff, PRD, QA-UAT. Chỉ sinh tài liệu, không làm UI/UX.',
        when: 'Đầu project, khi bắt đầu từ ý tưởng.',
      },
      {
        name: 'journal-writer',
        model: 'haiku',
        skills: 'journal',
        what: 'Ghi lại bug khó, lỗ hổng bảo mật, hướng tiếp cận phải làm lại — kèm bối cảnh đầy đủ.',
        when: 'Khi một vấn đề tốn nhiều lần thử mới xong.',
      },
    ],
  },
  {
    title: 'Vận hành',
    icon: '⚙️',
    agents: [
      {
        name: 'project-manager',
        model: 'haiku',
        skills: 'project-management',
        what: 'Đối chiếu tiến độ với plan, tổng hợp báo cáo từ nhiều agent, cập nhật roadmap và changelog.',
        when: 'Sau một cột mốc, hoặc khi cần biết tình hình chung.',
      },
      {
        name: 'git-manager',
        model: 'haiku',
        skills: 'git',
        what: 'Stage, commit, push theo conventional commit; tự tách commit theo type/scope; quét secret.',
        when: 'Khi bạn nói "commit" hoặc "push".',
      },
      {
        name: 'mcp-manager',
        model: 'haiku',
        skills: '⚠ mcp-management (đã bỏ)',
        what: 'Khám phá và chạy tool MCP, giữ context chính sạch.',
        when: 'Khi làm việc với MCP server. Chạy với năng lực giảm vì skill nó cần đã bị loại bỏ.',
      },
    ],
  },
]

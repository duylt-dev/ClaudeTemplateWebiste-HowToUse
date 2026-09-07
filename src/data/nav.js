export const NAV = [
  {
    title: 'Bắt đầu',
    items: [
      { num: '01', path: '/', name: 'Tổng quan', desc: 'Bộ ba tài liệu và vì sao chúng tồn tại' },
      { num: '02', path: '/bat-dau-nhanh', name: 'Bắt đầu nhanh', desc: 'Chép template vào project mới trong 8 bước' },
    ],
  },
  {
    title: 'Ba trụ cột',
    items: [
      { num: '03', path: '/llm-md', name: 'LLM.md', desc: 'Bản đồ cấu trúc code — code đi đâu' },
      { num: '04', path: '/thu-muc-claude', name: 'Thư mục .claude', desc: 'Bộ não cấu hình: rules, agents, skills, hooks' },
      { num: '05', path: '/thu-muc-docs', name: 'Thư mục docs', desc: 'Hợp đồng kiến trúc và đặc tả màn hình' },
    ],
  },
  {
    title: 'Vận hành',
    items: [
      { num: '06', path: '/quy-trinh', name: 'Quy trình làm việc', desc: 'Plan → Cook → Test → Review → Docs' },
      { num: '07', path: '/agents', name: '16 Agents', desc: 'Ai làm việc gì, model nào' },
      { num: '08', path: '/skills', name: '28 Skills', desc: 'Bộ kỹ năng và tiền tố ck:' },
    ],
  },
  {
    title: 'Kết',
    items: [
      { num: '09', path: '/checklist', name: 'Checklist & cạm bẫy', desc: 'Những chỗ hay sai khi mang template sang project mới' },
    ],
  },
]

export const FLAT = NAV.flatMap((g) => g.items)

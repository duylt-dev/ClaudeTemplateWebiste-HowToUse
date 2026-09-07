import { Badge, Callout, Code, H2, Table } from '../components/ui.jsx'
import { AGENT_GROUPS } from '../data/agents.js'

const MODEL_TONE = { opus: 'accent', sonnet: 'info', haiku: 'ok', inherit: '' }

export default function Agents() {
  return (
    <>
      <div className="page-head">
        <div className="page-eyebrow">07 · Vận hành</div>
        <h1>16 agents</h1>
        <p className="page-lede">
          Mỗi agent là một file markdown trong <code>.claude/agents/</code> với
          frontmatter khai báo <code>name</code>, <code>description</code>,{' '}
          <code>model</code> và <code>tools</code>. Chia agent không phải để cho
          vui: mỗi agent chạy trong context riêng, nên việc nặng đọc file không làm
          ngợp context chính.
        </p>
      </div>

      <Callout type="info" title="Vì sao model khác nhau">
        <p style={{ marginBottom: 0 }}>
          <Badge tone="accent">opus</Badge> cho việc cần suy luận kiến trúc (
          <code>planner</code>, <code>code-simplifier</code>).{' '}
          <Badge tone="info">sonnet</Badge> cho việc hiện thực và điều tra.{' '}
          <Badge tone="ok">haiku</Badge> cho việc có khuôn mẫu rõ ràng — chạy test,
          commit, cập nhật docs. <Badge>inherit</Badge> nghĩa là dùng model của
          phiên hiện tại.
        </p>
      </Callout>

      {AGENT_GROUPS.map((g) => (
        <section key={g.title}>
          <H2>
            {g.icon} {g.title}
          </H2>
          <Table head={['Agent', 'Model', 'Làm gì', 'Gọi khi nào']}>
            {g.agents.map((a) => (
              <tr key={a.name}>
                <td style={{ whiteSpace: 'nowrap' }}>
                  <code>{a.name}</code>
                  <div
                    className="lead-note"
                    style={{ fontStyle: 'normal', fontSize: 11.5, marginTop: 3 }}
                  >
                    {a.skills}
                  </div>
                </td>
                <td>
                  <Badge tone={MODEL_TONE[a.model]}>{a.model}</Badge>
                </td>
                <td>{a.what}</td>
                <td>{a.when}</td>
              </tr>
            ))}
          </Table>
        </section>
      ))}

      <H2>Gọi agent thế nào</H2>
      <p>
        Phần lớn thời gian bạn không cần gọi tên. Claude tự chọn agent theo mô tả
        trong frontmatter. Chỉ gọi đích danh khi bạn muốn ép một agent cụ thể:
      </p>
      <Code lang="bash">{`
# Để Claude tự chọn — cách thường dùng
Thêm màn hình nén video, theo LLM.md.

# Ép một agent cụ thể
Dùng agent planner để lên kế hoạch màn hình nén video.
Dùng agent code-reviewer review lại thay đổi vừa rồi.

# Xem danh sách agent đã nạp
/agents
`}</Code>

      <H2>Thêm agent riêng cho project</H2>
      <Code lang="md" file=".claude/agents/release-manager.md">{`
---
name: release-manager
description: Dùng agent này khi cần chuẩn bị một bản release — bump version,
  sinh release note từ changelog, kiểm signing config. Ví dụ: <example>
  Context: sắp phát hành. user: 'chuẩn bị release 1.4.0'
  assistant: 'Tôi dùng release-manager để bump version và sinh release note'
  </example>
model: haiku
tools: Glob, Grep, Read, Edit, Bash
---

Bạn là release manager của project này.

## Trước khi làm bất cứ gì
1. Đọc \`LLM.md §10\` — bốn con số build và ý nghĩa từng con số.
2. Đọc \`docs/project-changelog.md\`.

## Luật
- Không bao giờ bump version khi còn test đỏ.
- …
`}</Code>

      <Callout type="tip" title="Description quyết định agent có được gọi hay không">
        <p style={{ marginBottom: 0 }}>
          Claude chọn agent bằng cách đọc <code>description</code>. Viết mô tả kèm
          vài khối <code>&lt;example&gt;</code> nêu rõ tình huống — mọi agent trong
          template đều làm vậy. Mô tả chung chung kiểu “giúp việc release” sẽ không
          bao giờ được chọn đúng lúc.
        </p>
      </Callout>
    </>
  )
}

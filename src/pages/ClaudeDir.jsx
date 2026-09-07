import { Link } from 'react-router-dom'
import { Callout, Code, H2, H3, Table, Tree } from '../components/ui.jsx'

export default function ClaudeDir() {
  return (
    <>
      <div className="page-head">
        <div className="page-eyebrow">04 · Trụ cột 2</div>
        <h1>
          Thư mục <code style={{ fontSize: '0.86em' }}>.claude/</code>
        </h1>
        <p className="page-lede">
          Đây là phần bạn chép nguyên và gần như không sửa. Nó quyết định{' '}
          <strong>ai</strong> làm việc gì (agents), <strong>bằng cách nào</strong>{' '}
          (skills), theo <strong>luật nào</strong> (rules), và Claude nhìn thấy gì
          ở mỗi lượt (hooks + statusline).
        </p>
      </div>

      <H2>Toàn cảnh</H2>

      <Tree>{`
<span class="d">.claude/</span>
├── <span class="hl">CLAUDE.md</span>              <span class="n">hợp đồng gốc — Claude nạp mỗi phiên, không cần ai gọi</span>
├── <span class="hl">rules/</span>                 <span class="n">5 file luật, được CLAUDE.md và agent tham chiếu</span>
│   ├── development-rules.md
│   ├── primary-workflow.md
│   ├── orchestration-protocol.md
│   ├── team-coordination-rules.md
│   └── documentation-management.md
├── <span class="hl">agents/</span>                <span class="n">16 agent, mỗi agent một file md có frontmatter</span>
├── <span class="hl">skills/</span>                <span class="n">28 skill, mỗi skill một thư mục có SKILL.md</span>
├── <span class="hl">hooks/</span>
│   ├── usage-context-awareness.cjs     <span class="n">lấy quota, ghi cache</span>
│   └── lib/                            <span class="n">colors · transcript-parser · git-info-cache …</span>
├── <span class="hl">scripts/</span>
│   ├── set-active-plan.cjs   <span class="n">⚠ cần CK_SESSION_ID — xem cảnh báo bên dưới</span>
│   ├── validate-docs.cjs
│   ├── resolve_env.py
│   └── lib/ck-config-utils.cjs
├── <span class="hl">agent-memory/</span>          <span class="n">bộ nhớ dài hạn theo từng agent</span>
├── <span class="hl">statusline.cjs</span>         <span class="n">vẽ thanh trạng thái</span>
├── <span class="hl">settings.json</span>          <span class="n">env · statusLine · hooks</span>
├── <span class="hl">.ck.json</span>               <span class="n">quy ước đặt tên plan, đường dẫn docs/plans, model Gemini</span>
├── .env.example · .mcp.json.example
└── schemas/ck-config.schema.json        <span class="n">chỉ để editor autocomplete</span>
`}</Tree>

      <H2>CLAUDE.md — file quan trọng nhất</H2>
      <p>
        Khác với mọi file còn lại, <code>CLAUDE.md</code> được nạp{' '}
        <strong>tự động ở mọi phiên</strong>. Đó là lý do điều khoản “bắt buộc đọc{' '}
        <code>LLM.md</code> trước khi viết code” được đặt ở đây chứ không phải chỗ
        khác — không có cách nào bỏ sót nó.
      </p>
      <p>Nó chứa sáu khối, theo thứ tự:</p>
      <ol>
        <li>
          Mô tả project — <strong>khối duy nhất bạn phải viết lại</strong>
        </li>
        <li>
          Bảng “MANDATORY: read before writing code” — trỏ tới <code>LLM.md</code>{' '}
          và MVI doc
        </li>
        <li>Reading rules và Update rules — bốn luật đọc, mười luật cập nhật</li>
        <li>“Non-negotiable MVI rules” — 8 luật đã từng gây bug thật</li>
        <li>Danh mục skills và agents</li>
        <li>Config, scripts, phụ thuộc ngoài, và các tham chiếu treo đã biết</li>
      </ol>

      <Callout type="tip" title="Viết luật ở đây thế nào">
        <p style={{ marginBottom: 0 }}>
          Đúng công thức của cả template: <em>nêu luật, rồi nêu cái giá cụ thể của
          việc phá luật</em>. Snippet phải là code thật, không phải ví dụ bịa. Một
          luật không có lý do sẽ bị bỏ qua và cuối cùng bị xoá.
        </p>
      </Callout>

      <H2>rules/ — 5 file luật</H2>

      <Table head={['File', 'Nội dung', 'Ai đọc']}>
        <tr>
          <td>
            <code>development-rules.md</code>
          </td>
          <td>
            YAGNI/KISS/DRY, kebab-case cho tên file, giới hạn 200 dòng/file, không
            được mock để qua build, luôn chạy compile sau khi sửa
          </td>
          <td>
            <code>code-reviewer</code>, <code>fullstack-developer</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>primary-workflow.md</code>
          </td>
          <td>
            Vòng chính: plan → code → test → review → docs. Nêu rõ không được bỏ
            qua test fail
          </td>
          <td>Tất cả</td>
        </tr>
        <tr>
          <td>
            <code>orchestration-protocol.md</code>
          </td>
          <td>
            Bắt buộc truyền work context / reports path / plans path khi spawn
            subagent; khi nào chạy tuần tự, khi nào song song
          </td>
          <td>Agent điều phối</td>
        </tr>
        <tr>
          <td>
            <code>team-coordination-rules.md</code>
          </td>
          <td>
            Chỉ áp dụng ở chế độ Agent Team: sở hữu file không chồng lấn, giao thức
            nhắn tin, quy trình shutdown
          </td>
          <td>Teammate trong Agent Team</td>
        </tr>
        <tr>
          <td>
            <code>documentation-management.md</code>
          </td>
          <td>
            Roadmap/changelog phải cập nhật khi nào; cấu trúc thư mục{' '}
            <code>plans/</code> và nội dung bắt buộc của một file phase
          </td>
          <td>
            <code>project-manager</code>, <code>docs-manager</code>,{' '}
            <code>planner</code>
          </td>
        </tr>
      </Table>

      <H2>hooks/ và statusline</H2>
      <p>
        <code>settings.json</code> chỉ nối đúng hai thứ: một statusline và một hook
        nuôi nó. Chín hook khác của bản gốc bị bỏ đi có chủ đích.
      </p>

      <Code lang="bash">{`
🤖 Opus 5  ▰▰▰▰▰▰▰▰▱▱▱▱ 65%  ⌛ 1h 37m left (15% used)  📁 ~/project  📝 +42 -7
           context window          usage limit
`}</Code>

      <Table head={['File', 'Vai trò']}>
        <tr>
          <td>
            <code>hooks/usage-context-awareness.cjs</code>
          </td>
          <td>
            Gọi API usage của Anthropic, ghi cache vào{' '}
            <code>$TMPDIR/ck-usage-limits-cache.json</code>. Cache 60 giây và khai
            báo <code>async</code> nên không chặn lượt nào. Nối vào{' '}
            <code>UserPromptSubmit</code> + <code>PostToolUse</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>statusline.cjs</code>
          </td>
          <td>
            Đọc cache đó và vẽ. Cần <code>hooks/lib/</code>: <code>colors</code>,{' '}
            <code>transcript-parser</code>, <code>config-counter</code>,{' '}
            <code>git-info-cache</code>, <code>ck-config-utils</code>
          </td>
        </tr>
      </Table>

      <p>
        Thiếu hook thì phần quota hiện <code>N/A</code>; thiếu statusline thì không
        ai đọc cache. Tắt việc gọi API: đặt{' '}
        <code>hooks.usage-context-awareness</code> thành <code>false</code> trong{' '}
        <code>.ck.json</code>. Bỏ hẳn statusline: xoá khối <code>statusLine</code>{' '}
        khỏi <code>settings.json</code>.
      </p>

      <H2>scripts/</H2>

      <Table head={['Script', 'Chạy độc lập được?', 'Dùng để']}>
        <tr>
          <td>
            <code>validate-docs.cjs</code>
          </td>
          <td>✓</td>
          <td>Kiểm tra docs hợp lệ</td>
        </tr>
        <tr>
          <td>
            <code>resolve_env.py --show-hierarchy</code>
          </td>
          <td>✓</td>
          <td>Xem thứ tự nạp biến môi trường khi debug key</td>
        </tr>
        <tr>
          <td>
            <code>skills/ck-help/scripts/ck-help.py</code>
          </td>
          <td>✓</td>
          <td>
            Liệt kê skill đã cài — quét <code>.claude/skills/</code> trực tiếp nên
            luôn khớp thực tế
          </td>
        </tr>
        <tr>
          <td>
            <code>set-active-plan.cjs</code>
          </td>
          <td>
            <strong>✕</strong>
          </td>
          <td>Xem cảnh báo bên dưới</td>
        </tr>
      </Table>

      <Callout type="danger" title="set-active-plan.cjs không lưu gì cả">
        <p>
          Script này ghi plan đang hoạt động vào <code>/tmp/ck-session-&#123;id&#125;.json</code>,
          khoá theo biến môi trường <code>CK_SESSION_ID</code>. Biến đó do hook{' '}
          <code>session-init.cjs</code> / <code>subagent-init.cjs</code> của bản gốc
          đặt, và template này <strong>cố ý không mang theo hai hook đó</strong>.
        </p>
        <p style={{ marginBottom: 0 }}>
          Kết quả: skill <code>plan</code> và agent <code>planner</code> vẫn bảo bạn
          chạy nó, nó vẫn in ra như thể thành công, <strong>và không lưu gì</strong>
          . Hoặc chấp nhận truyền đường dẫn plan thẳng trong prompt, hoặc khôi phục{' '}
          <code>hooks/</code> gốc.
        </p>
      </Callout>

      <H2>agent-memory/ — cạm bẫy lớn nhất khi chép sang project mới</H2>
      <p>
        Bốn agent (<code>planner</code>, <code>debugger</code>, <code>tester</code>,{' '}
        <code>code-reviewer</code>) có bộ nhớ dài hạn riêng: một{' '}
        <code>MEMORY.md</code> làm chỉ mục, cộng các file{' '}
        <code>feedback_*.md</code> / <code>project_*.md</code> /{' '}
        <code>reference_*.md</code> có frontmatter.
      </p>

      <Code lang="md" file=".claude/agent-memory/planner/feedback_plan_style.md">{`
---
name: feedback-plan-style
description: Mỗi file phase phải tự đủ cho một agent dev đọc một mình
metadata:
  type: feedback
---

Khi viết plan cho dự án này: mỗi file phase phải để một agent dev đọc
một mình file đó là làm được việc, không cần mở 10 file khác.

**Why:** Plan được giao cho các sub-agent dev thực thi từng phase, có
thể chạy song song.

**How to apply:** ưu tiên bảng và danh sách đánh số; mỗi phase bắt buộc
có bảng file tạo mới/sửa, todo checkbox, success criteria, lệnh compile.
`}</Code>

      <Callout type="danger" title="Xoá agent-memory khi chép sang project mới">
        <p style={{ marginBottom: 0 }}>
          Bộ nhớ nói về <em>codebase cũ</em>. Trong repo mẫu này,{' '}
          <code>planner/MEMORY.md</code> có hẳn một mục cảnh báo rằng ba ghi nhớ
          trong đó thuộc về một project khác đã bị chép nhầm sang. Nếu bạn không xoá
          lúc chép, agent sẽ lên kế hoạch dựa trên ràng buộc của một app không tồn
          tại. Lệnh <code>rsync</code> ở{' '}
          <Link to="/bat-dau-nhanh">Bắt đầu nhanh</Link> đã loại trừ sẵn thư mục
          này.
        </p>
      </Callout>

      <H2>Config: settings.json và .ck.json</H2>

      <H3>settings.json — thứ Claude Code đọc</H3>
      <Code lang="json">{`
{
  "env": { "GEMINI_API_KEY": "…" },
  "statusLine": { "type": "command", "command": "node .claude/statusline.cjs", "padding": 0 },
  "hooks": {
    "UserPromptSubmit": [ { "hooks": [ { "type": "command",
        "command": "node .claude/hooks/usage-context-awareness.cjs",
        "async": true, "timeout": 30 } ] } ],
    "PostToolUse": [ { "matcher": "Bash|Edit|Write|MultiEdit|NotebookEdit",
      "hooks": [ { "type": "command",
        "command": "node .claude/hooks/usage-context-awareness.cjs",
        "async": true, "timeout": 10 } ] } ]
  }
}
`}</Code>

      <H3>.ck.json — thứ các skill đọc</H3>
      <Code lang="json">{`
{
  "plan": {
    "namingFormat": "{date}-{issue}-{slug}",
    "dateFormat": "YYMMDD-HHmm",
    "validation": { "mode": "prompt", "minQuestions": 3, "maxQuestions": 8 }
  },
  "paths":  { "docs": "docs", "plans": "plans" },
  "gemini": { "model": "gemini-3-flash-preview" },
  "hooks":  { "usage-context-awareness": true }
}
`}</Code>
      <p>
        Được đọc bởi <code>research</code>, <code>scout</code>,{' '}
        <code>ai-multimodal</code> và <code>ck-help</code>. Schema không khai báo
        field bắt buộc nào và cho phép field lạ, nên bản rút gọn vẫn hợp lệ và khoá
        bạn thêm vào vẫn được editor gợi ý.
      </p>

      <H2>MCP servers</H2>
      <Code lang="bash">{`cp .claude/.mcp.json.example .mcp.json`}</Code>
      <Table head={['Server', 'Skill cần nó']}>
        <tr>
          <td>
            <code>pencil</code>
          </td>
          <td>
            <code>ui-design-pencil</code> — 71 tham chiếu, phụ thuộc cứng
          </td>
        </tr>
        <tr>
          <td>
            <code>sequential-thinking</code>
          </td>
          <td>
            skill <code>sequential-thinking</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>context7</code>
          </td>
          <td>
            <code>docs-seeker</code> — dán <code>CONTEXT7_API_KEY</code> vào tham số{' '}
            <code>--api-key</code>
          </td>
        </tr>
      </Table>
      <p className="lead-note">
        Mục <code>pencil</code> trỏ tới một binary macOS arm64 cục bộ dưới{' '}
        <code>/Applications/Pen.app/</code>. Trên máy hoặc kiến trúc khác, lấy
        đường dẫn đúng từ bản cài Pencil ở đó trước. Server cũng có thể đăng ký toàn
        cục trong <code>~/.claude.json</code> thay vì theo project.
      </p>
    </>
  )
}

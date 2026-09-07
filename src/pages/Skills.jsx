import { Callout, Code, H2, Table, Tree } from '../components/ui.jsx'
import { SKILL_GROUPS } from '../data/skills.js'

export default function Skills() {
  return (
    <>
      <div className="page-head">
        <div className="page-eyebrow">08 · Vận hành</div>
        <h1>28 skills</h1>
        <p className="page-lede">
          Skill là một gói hướng dẫn cho một loại việc. Khi bạn gọi, nội dung{' '}
          <code>SKILL.md</code> được nạp vào lượt hiện tại và Claude làm theo đó
          thay vì cách mặc định. Template này rút từ 73 skill gốc xuống 28: giữ
          những gì phục vụ app mobile, cộng những gì 16 agent thật sự gọi tới.
        </p>
      </div>

      <Callout type="warn" title="Tiền tố ck:">
        <p style={{ marginBottom: 0 }}>
          Phần lớn skill mang tiền tố <code>ck:</code> trong frontmatter (
          <code>ck:plan</code>, <code>ck:cook</code>, <code>ck:docs</code>…) để không
          đụng tên với skill và lệnh có sẵn của Claude Code.{' '}
          <strong>Phải gọi kèm tiền tố.</strong> Năm skill không có tiền tố vì tên
          của chúng vốn không đụng gì: <code>project-kickoff</code>,{' '}
          <code>product-requirements</code>, <code>qa-uat</code>,{' '}
          <code>ui-design-pencil</code>, <code>ui-ux-pro-max</code>.
        </p>
      </Callout>

      {SKILL_GROUPS.map((g) => (
        <section key={g.title}>
          <H2>{g.title}</H2>
          <p>{g.note}</p>
          <Table head={['Gọi bằng', 'Làm gì', 'Cần gì / ai gọi']}>
            {g.skills.map((s) => (
              <tr key={s.call}>
                <td style={{ whiteSpace: 'nowrap' }}>
                  {s.order && (
                    <span
                      className="badge accent"
                      style={{ marginRight: 6 }}
                    >{`B${s.order}`}</span>
                  )}
                  <code>{s.call}</code>
                </td>
                <td>{s.what}</td>
                <td style={{ color: 'var(--text-muted)', fontSize: '0.94em' }}>
                  {s.dep}
                </td>
              </tr>
            ))}
          </Table>
        </section>
      ))}

      <H2>Bộ gitnexus — thêm ngoài 28 skill</H2>
      <p>
        Thư mục <code>.claude/skills/gitnexus/</code> chứa thêm 9 skill con phục vụ
        knowledge graph của codebase. Chúng không nằm trong con số 28 và không được{' '}
        <code>CLAUDE.md</code> nhắc tới — nếu project mới của bạn không dùng
        GitNexus MCP, bỏ luôn thư mục này.
      </p>
      <Tree>{`
<span class="d">.claude/skills/gitnexus/</span>
├── gitnexus-cli              <span class="n">index repo, sinh wiki</span>
├── gitnexus-exploring        <span class="n">"X hoạt động thế nào?", "cái gì gọi hàm này?"</span>
├── gitnexus-debugging        <span class="n">truy vết lỗi</span>
├── gitnexus-impact-analysis  <span class="n">"đổi X thì hỏng gì?"</span>
├── gitnexus-refactoring      <span class="n">đổi tên / tách / di chuyển an toàn</span>
├── gitnexus-pr-review        <span class="n">review PR</span>
├── gitnexus-pdg-query · gitnexus-taint-analysis · gitnexus-guide
`}</Tree>

      <H2>Gọi skill thế nào</H2>
      <Code lang="bash">{`
# Gọi trực tiếp bằng slash command
/ck:plan thêm màn hình nén video
/ck:debug duplicate không tìm ra file trên Android 14
/ck:git commit

# Skill cũng tự kích hoạt theo ngữ cảnh — cook và fix được đánh dấu "ALWAYS"
# nên chúng chạy trước mọi lần hiện thực hoặc sửa lỗi mà không cần gọi tay.

# Xem danh sách skill thực tế đang có
python3 .claude/skills/ck-help/scripts/ck-help.py
`}</Code>

      <H2>Chạy script của skill</H2>
      <Callout type="danger" title="Đường dẫn tính từ gốc repo">
        <p style={{ marginBottom: 0 }}>
          Mọi đường dẫn script bên trong <code>SKILL.md</code> đều{' '}
          <strong>tính từ thư mục gốc project</strong>, không phải từ trong thư mục
          skill. Chạy từ gốc, nếu không sẽ không tìm thấy file.
        </p>
      </Callout>
      <Code lang="bash">{`
# Tra CSDL thiết kế
python3 ".claude/skills/ui-ux-pro-max/scripts/search.py" "fintech dashboard" --domain style
python3 ".claude/skills/ui-ux-pro-max/scripts/search.py" "cleaner app" --design-system -p "Phone Cleaner"

# Git worktree
node .claude/skills/worktree/scripts/worktree.cjs create feat/video-compression
`}</Code>

      <H2>Bốn sửa đổi so với bản gốc — đừng revert</H2>
      <Table head={['Skill', 'Đã đổi gì', 'Vì sao']}>
        <tr>
          <td>
            <code>ui-ux-pro-max</code>
          </td>
          <td>
            <code>$&#123;CLAUDE_PLUGIN_ROOT&#125;/…</code> → đường dẫn tương đối
            project
          </td>
          <td>
            Biến đó chỉ được đặt khi cài dạng plugin; là project skill thì nó rỗng
            và đường dẫn gãy
          </td>
        </tr>
        <tr>
          <td>
            <code>ui-ux-pro-max</code>, <code>ck-help</code>
          </td>
          <td>
            <code>python</code> → <code>python3</code>
          </td>
          <td>
            Máy này không có <code>python</code> trần
          </td>
        </tr>
        <tr>
          <td>
            <code>ui-design-pencil</code>
          </td>
          <td>
            <code>.claude/skills/.venv/bin/python3</code> → <code>python3</code>
          </td>
          <td>
            venv chung đó không tồn tại; script đích không cần package bên thứ ba
          </td>
        </tr>
        <tr>
          <td>
            <code>qa-uat</code>
          </td>
          <td>
            Thêm frontmatter YAML (<code>name</code>, <code>description</code>)
          </td>
          <td>
            Bản gốc thiếu, nên Claude Code <strong>không phát hiện ra skill</strong>
          </td>
        </tr>
      </Table>
    </>
  )
}

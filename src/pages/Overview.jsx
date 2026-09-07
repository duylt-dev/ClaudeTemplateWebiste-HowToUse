import { Link } from 'react-router-dom'
import { Badge, Callout, Card, Grid, H2, Table, Tree } from '../components/ui.jsx'

export default function Overview() {
  return (
    <>
      <div className="page-head">
        <div className="page-eyebrow">01 · Tổng quan</div>
        <h1>Template Claude cho một project mới</h1>
        <p className="page-lede">
          Template này không phải là code. Nó là <strong>hợp đồng</strong> giữa bạn và
          Claude: ba tài liệu quy định code nằm ở đâu, được viết thế nào, và ai
          trong đội agent chịu trách nhiệm phần nào. Bỏ qua một trong ba, agent sẽ
          tự bịa ra phần còn thiếu.
        </p>
      </div>

      <H2>Ba trụ cột, ba câu hỏi khác nhau</H2>
      <p>
        Mỗi trụ cột trả lời đúng một câu hỏi. Chúng không chồng lấn, và cũng không
        thay thế được nhau.
      </p>

      <Grid cols={3}>
        <Card icon="🗺️" title="LLM.md">
          <strong>Ở ĐÂU.</strong> Bản đồ cấu trúc code: sơ đồ module, layout
          package, ranh giới tầng, file mới đặt vào đâu, và danh sách các chỗ đang
          lệch chuẩn.
        </Card>
        <Card icon="📐" title="docs/">
          <strong>NHƯ THẾ NÀO.</strong> Hợp đồng kiến trúc và cách viết một màn
          hình: base class, quy tắc Contract/ViewModel/Screen, concurrency,
          testing, checklist trước PR.
        </Card>
        <Card icon="🤖" title=".claude/">
          <strong>AI &amp; KHI NÀO.</strong> Bộ não cấu hình: rules, 16 agents, 28
          skills, hooks, statusline, và quy trình plan → cook → test → review.
        </Card>
      </Grid>

      <Table head={['Trụ cột', 'Trả lời', 'Đọc khi nào', 'Ai cập nhật']}>
        <tr>
          <td>
            <code>LLM.md</code>
          </td>
          <td>Code này đi đâu?</td>
          <td>
            <strong>Luôn luôn — trước mọi thay đổi code</strong>, kể cả sửa một
            dòng
          </td>
          <td>Người/agent thay đổi cấu trúc, trong cùng commit</td>
        </tr>
        <tr>
          <td>
            <code>docs/android-mvi-best-practices.md</code>
          </td>
          <td>Code này viết thế nào?</td>
          <td>Khi động vào ViewModel, Contract, hoặc screen composable</td>
          <td>Khi có pattern kiến trúc mới</td>
        </tr>
        <tr>
          <td>
            <code>docs/system-architecture.md</code>
          </td>
          <td>Hệ thống ghép lại ra sao?</td>
          <td>Khi thiết kế feature mới hoặc đổi ranh giới module</td>
          <td>
            <code>docs-manager</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>.claude/</code>
          </td>
          <td>Agent nào làm, theo quy trình nào?</td>
          <td>Claude tự nạp — bạn chỉ chỉnh khi đổi quy ước</td>
          <td>Bạn, khi quy trình của đội thay đổi</td>
        </tr>
      </Table>

      <Callout type="warn" title="Thứ tự đọc là bắt buộc">
        <p style={{ marginBottom: 0 }}>
          <code>LLM.md</code> trước, rồi mới tới mục liên quan của MVI doc.{' '}
          <code>LLM.md</code> nói <em>ở đâu</em>; MVI doc nói <em>thế nào</em>. Đọc
          ngược lại sẽ ra một file đúng chuẩn viết nhưng nằm sai package — và cái
          giá là một vòng review nữa.
        </p>
      </Callout>

      <H2>Vòng đời một thay đổi code</H2>
      <p>
        Đây là đường đi mà template ép mọi thay đổi phải theo. Mỗi mũi tên là một
        cửa kiểm tra, không phải một gợi ý.
      </p>

      <Tree>{`
<span class="n">Yêu cầu từ bạn</span>
  │
  ├─▸ <span class="hl">planner</span>  ──▸ đọc LLM.md §3-§10 + MVI doc ──▸ <span class="d">plans/YYMMDD-HHmm-slug/</span>
  │                                              plan.md + phase-01…N.md
  │
  ├─▸ <span class="hl">cook</span>     ──▸ hiện thực từng phase ──▸ compile sau mỗi file
  │        │
  │        └─ kiểm <span class="d">LLM.md §4</span>  (file này đi đâu?)
  │           kiểm <span class="d">LLM.md §11</span> (đừng copy pattern từ file đang lỗi)
  │           kiểm <span class="d">LLM.md §12</span> (đừng "sửa" thứ cố ý làm vậy)
  │
  ├─▸ <span class="hl">tester</span>   ──▸ chạy test thật ──▸ <span class="n">fail thì quay lại cook</span>
  │
  ├─▸ <span class="hl">code-reviewer</span> ──▸ review + scout tìm edge case
  │
  ├─▸ <span class="hl">docs-manager</span>  ──▸ đồng bộ docs/ và LLM.md <span class="n">(cùng commit)</span>
  │
  └─▸ <span class="hl">git-manager</span>   ──▸ conventional commit
`}</Tree>

      <H2>Hai nguyên tắc chi phối toàn bộ template</H2>

      <div className="two-col">
        <div className="card">
          <div className="card-title">
            <Badge tone="accent">1</Badge> Mỗi luật phải nêu cái giá
          </div>
          <div className="card-body">
            <p>
              Một luật không nói rõ vi phạm thì mất gì sẽ bị agent bỏ qua, rồi
              cuối cùng bị xoá. Trong template này mọi bảng luật đều có cột{' '}
              <em>“cost of deviating”</em>, và cái giá phải là quan sát thật —
              trích dẫn tới file:dòng — chứ không phải giả định.
            </p>
          </div>
        </div>
        <div className="card">
          <div className="card-title">
            <Badge tone="accent">2</Badge> Tài liệu lệch là một defect
          </div>
          <div className="card-body">
            <p>
              Sửa ngay trong <strong>chính commit gây ra lệch</strong>, không bao
              giờ hoãn. Đổi package thì cập nhật <code>LLM.md §3</code>; đổi quy
              ước DI thì <code>§6</code>; đổi quy ước test thì <code>§9</code> và
              MVI §7.
            </p>
          </div>
        </div>
      </div>

      <H2>Cây thư mục sau khi cài</H2>
      <p>
        Ba đường dẫn in đậm là toàn bộ thứ bạn chép sang. Phần còn lại là code
        project của bạn.
      </p>

      <Tree>{`
<span class="d">project-moi/</span>
├── <span class="hl">.claude/</span>                      <span class="n">← cấu hình agent (chép nguyên)</span>
│   ├── CLAUDE.md                 <span class="n">hợp đồng gốc, Claude tự nạp mỗi phiên</span>
│   ├── rules/                    <span class="n">5 file luật</span>
│   ├── agents/                   <span class="n">16 agent</span>
│   ├── skills/                   <span class="n">28 skill</span>
│   ├── hooks/ · scripts/         <span class="n">statusline + tiện ích</span>
│   ├── settings.json · .ck.json  <span class="n">cấu hình</span>
│   └── agent-memory/             <span class="n">bộ nhớ dài hạn theo agent</span>
├── <span class="hl">LLM.md</span>                        <span class="n">← viết lại §2–§12 cho project mới</span>
├── <span class="hl">docs/</span>
│   ├── android-mvi-best-practices.md   <span class="n">chép nguyên, hiếm khi sửa</span>
│   ├── system-architecture.md          <span class="n">viết mới</span>
│   └── screens/                        <span class="n">viết mới</span>
├── plans/                        <span class="n">planner sinh ra, không chép</span>
└── <span class="n">… code project của bạn …</span>
`}</Tree>

      <Callout type="info" title="Trang này nói gì tiếp theo">
        <p style={{ marginBottom: 0 }}>
          Nếu bạn đang dựng project mới ngay bây giờ, nhảy thẳng tới{' '}
          <Link to="/bat-dau-nhanh">Bắt đầu nhanh</Link>. Nếu muốn hiểu vì sao
          từng mục của <code>LLM.md</code> tồn tại trước khi viết, đọc{' '}
          <Link to="/llm-md">LLM.md</Link>.
        </p>
      </Callout>
    </>
  )
}

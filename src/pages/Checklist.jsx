import { Link } from 'react-router-dom'
import { Callout, Code, H2, Table } from '../components/ui.jsx'

export default function Checklist() {
  return (
    <>
      <div className="page-head">
        <div className="page-eyebrow">09 · Kết</div>
        <h1>Checklist &amp; cạm bẫy</h1>
        <p className="page-lede">
          Những chỗ hay sai khi mang template sang project mới. Phần lớn không báo
          lỗi — chúng chỉ khiến agent làm sai một cách im lặng, và bạn phát hiện ra
          ba tuần sau.
        </p>
      </div>

      <H2>Checklist trước khi coi là xong</H2>
      <ul className="check">
        <li>
          <code>.claude/CLAUDE.md</code> nói về project mới, không phải về template
          hay project cũ.
        </li>
        <li>
          <code>LLM.md §1–§10</code> đã viết lại; <code>§11</code> và{' '}
          <code>§12</code> để rỗng.
        </li>
        <li>
          <code>LLM.md §3</code> khớp <strong>chính xác</strong> với module thật
          trong <code>settings.gradle.kts</code>.
        </li>
        <li>
          <code>LLM.md §4</code> có ít nhất một dòng cho mỗi loại file bạn sẽ tạo
          trong tháng đầu.
        </li>
        <li>
          <code>.claude/agent-memory/</code> đã xoá sạch bộ nhớ của project cũ.
        </li>
        <li>
          <code>.claude/settings.json</code> không còn API key viết cứng — đã chuyển
          sang <code>.claude/.env</code>.
        </li>
        <li>
          <code>.mcp.json</code> đã tạo, đường dẫn binary pencil đúng với máy này.
        </li>
        <li>
          Phụ thuộc ngoài đã cài: <code>pip3</code> cho document-skills,{' '}
          <code>brew</code> cho media-processing.
        </li>
        <li>
          Mọi tham chiếu tới <code>reverse-engineering/</code> đã xoá nếu project
          không có phân tích đối thủ.
        </li>
        <li>
          Đã chạy thử một vòng thật và <code>planner</code> trích dẫn đúng mục của{' '}
          <code>LLM.md</code>.
        </li>
      </ul>

      <H2>Cạm bẫy 1 — chép LLM.md mà không viết lại</H2>
      <Callout type="danger" title="Triệu chứng">
        <p style={{ marginBottom: 0 }}>
          Agent tạo file trong package không tồn tại; plan trích dẫn số mục không
          khớp; review nhắc tới module bạn chưa từng có. Nguyên nhân luôn là{' '}
          <code>§3</code> hoặc <code>§4</code> còn tả project cũ.
        </p>
      </Callout>
      <p>
        Cách kiểm nhanh: lấy danh sách module thật rồi đối chiếu với{' '}
        <code>§3.1</code>.
      </p>
      <Code lang="bash">{`
grep -o '":[^"]*"' settings.gradle.kts | sort
grep -n '^:' LLM.md | head -30
`}</Code>

      <H2>Cạm bẫy 2 — agent-memory của project cũ đi theo</H2>
      <p>
        Bốn agent có bộ nhớ dài hạn. Bộ nhớ nói về <em>codebase cũ</em>: quyết định
        đã chốt, ràng buộc nền tảng, tên module. Chép nguyên sang project mới nghĩa
        là <code>planner</code> lập kế hoạch dựa trên ràng buộc của một app không
        tồn tại.
      </p>
      <Callout type="warn" title="Chuyện này đã xảy ra thật trong repo mẫu">
        <p style={{ marginBottom: 0 }}>
          <code>.claude/agent-memory/planner/MEMORY.md</code> có hẳn một mục ghi:{' '}
          <em>“ba ghi nhớ dưới đây nói về codebase của một project khác, không phải
          codebase này”</em> — vì <code>.claude/</code> được chép từ project trước
          mà không dọn bộ nhớ. Ghi chú đó là bản vá thủ công cho một lỗi lẽ ra không
          nên có.
        </p>
      </Callout>
      <Code lang="bash">{`rm -rf .claude/agent-memory/*/`}</Code>

      <H2>Cạm bẫy 3 — script trông như chạy được nhưng không lưu gì</H2>
      <p>
        <code>set-active-plan.cjs</code> cần biến <code>CK_SESSION_ID</code>, do hai
        hook <code>session-init.cjs</code> / <code>subagent-init.cjs</code> của bản
        gốc đặt. Template <strong>cố ý không mang hai hook đó</strong>.
      </p>
      <Code lang="bash">{`
$ node .claude/scripts/set-active-plan.cjs plans/260907-0142-video-compression
Warning: CK_SESSION_ID not set
Would set active plan to: plans/260907-0142-video-compression
$ echo $?
0
`}</Code>
      <p>
        Nó thoát 0. Skill <code>plan</code> và agent <code>planner</code> vẫn bảo bạn
        chạy nó. Bạn có hai lựa chọn: chấp nhận truyền đường dẫn plan thẳng trong
        prompt, hoặc khôi phục <code>hooks/</code> gốc cùng phần tương ứng trong{' '}
        <code>settings.json</code>.
      </p>

      <H2>Cạm bẫy 4 — tham chiếu treo đã biết</H2>
      <p>
        Một số agent và rule vẫn nhắc tới skill đã bị bỏ. Chúng mất năng lực đó
        nhưng <strong>không crash</strong> — nên bạn sẽ không thấy lỗi, chỉ thấy kết
        quả kém hơn.
      </p>
      <Table head={['Tham chiếu', 'Ở đâu', 'Thay bằng']}>
        <tr>
          <td>
            <code>mcp-management</code>
          </td>
          <td>
            <code>agents/mcp-manager.md</code>
          </td>
          <td>Không có — agent đó chạy với năng lực giảm</td>
        </tr>
        <tr>
          <td>
            <code>chrome-devtools</code>
          </td>
          <td>
            <code>agents/debugger.md</code>
          </td>
          <td>Không có — tự động hoá trình duyệt, không áp dụng cho mobile</td>
        </tr>
        <tr>
          <td>
            <code>imagemagick</code>
          </td>
          <td>
            <code>rules/development-rules.md</code>
          </td>
          <td>
            <code>ck:media-processing</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>problem-solving</code>
          </td>
          <td>
            <code>rules/development-rules.md</code>
          </td>
          <td>
            <code>ck:sequential-thinking</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>context-engineering</code>
          </td>
          <td>rules</td>
          <td>Không có</td>
        </tr>
        <tr>
          <td>
            <code>/preview --explain</code>, <code>/mermaidjs-v11</code>
          </td>
          <td>
            <code>rules/development-rules.md</code>,{' '}
            <code>rules/primary-workflow.md</code>
          </td>
          <td>Không có trong bộ 28 skill — bỏ qua hoặc tự viết</td>
        </tr>
      </Table>

      <H2>Cạm bẫy 5 — phụ thuộc ngoài thiếu, skill hỏng lặng lẽ</H2>
      <Table head={['Thiếu', 'Skill hỏng', 'Cài bằng']}>
        <tr>
          <td>
            <code>openpyxl</code>, <code>python-pptx</code>, <code>pypdf</code>,{' '}
            <code>lxml</code>, <code>defusedxml</code>
          </td>
          <td>
            <code>document-skills</code> — và do đó{' '}
            <code>project-kickoff</code> không xuất được file XLSX
          </td>
          <td>
            <code>pip3 install …</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>ffmpeg</code>, <code>imagemagick</code>
          </td>
          <td>
            <code>ck:media-processing</code>
          </td>
          <td>
            <code>brew install ffmpeg imagemagick</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>GEMINI_API_KEY</code>
          </td>
          <td>
            <code>ck:ai-multimodal</code>, <code>ck:research</code> ở chế độ Gemini
          </td>
          <td>
            <code>.claude/.env</code>
          </td>
        </tr>
        <tr>
          <td>MCP server pencil</td>
          <td>
            <code>ui-design-pencil</code> — 71 tham chiếu, phụ thuộc cứng
          </td>
          <td>
            <code>.mcp.json</code>
          </td>
        </tr>
      </Table>

      <H2>Dấu hiệu template đang hoạt động</H2>
      <div className="two-col">
        <div className="card">
          <div className="card-title" style={{ color: 'var(--ok)' }}>
            ✓ Đang hoạt động
          </div>
          <div className="card-body">
            <ul style={{ marginBottom: 0 }}>
              <li>Plan trích dẫn số mục cụ thể của LLM.md</li>
              <li>File mới rơi đúng package mà §4 chỉ</li>
              <li>
                Commit sửa code kèm luôn commit sửa <code>LLM.md</code>
              </li>
              <li>
                <code>§11</code> có dòng mới sau mỗi vài tuần
              </li>
              <li>Review từ chối được vi phạm bằng cách trích dẫn luật</li>
            </ul>
          </div>
        </div>
        <div className="card">
          <div className="card-title" style={{ color: 'var(--danger)' }}>
            ✕ Đang hỏng
          </div>
          <div className="card-body">
            <ul style={{ marginBottom: 0 }}>
              <li>Agent tạo package mới thay vì tra bảng</li>
              <li>
                <code>§11</code> rỗng sau ba tháng
              </li>
              <li>Cùng một pattern sai được “sửa lại” lần thứ ba</li>
              <li>Plan mô tả module không tồn tại</li>
              <li>
                Docs được cập nhật thành một commit riêng, muộn hơn code vài ngày
              </li>
            </ul>
          </div>
        </div>
      </div>

      <H2>Bảo trì</H2>
      <Table head={['Nhịp', 'Việc']}>
        <tr>
          <td>Mỗi commit</td>
          <td>
            Đối chiếu bảng Update rules trong <code>CLAUDE.md</code>. Tài liệu lệch
            là một defect, sửa ngay trong commit đó
          </td>
        </tr>
        <tr>
          <td>Mỗi feature</td>
          <td>
            Thêm dòng mới cho <code>§4</code> nếu gặp loại file chưa có; thêm dòng{' '}
            <code>§11</code> cho deviation phát hiện mà chưa sửa
          </td>
        </tr>
        <tr>
          <td>Mỗi tháng</td>
          <td>
            Rà <code>§11</code>: dòng nào đã đóng thì chuyển sang bảng Fixed kèm
            commit. Rà <code>§12</code>: pattern nào không còn lý do thì gỡ
          </td>
        </tr>
        <tr>
          <td>Khi đổi stack</td>
          <td>
            Viết lại MVI doc và <code>§6</code>, <code>§8</code>. Đây là lúc duy
            nhất file MVI cần sửa
          </td>
        </tr>
      </Table>

      <Callout type="tip" title="Một câu tóm lại cả template">
        <p style={{ marginBottom: 0 }}>
          Template này không làm agent thông minh hơn. Nó làm agent{' '}
          <strong>không phải đoán</strong> — và đoán mới là thứ tạo ra package bịa,
          pattern sao chép từ file đang lỗi, và cùng một cuộc tranh luận review lặp
          lại mỗi tháng. Xem lại{' '}
          <Link to="/">tổng quan</Link> hoặc{' '}
          <Link to="/bat-dau-nhanh">bắt đầu chép</Link>.
        </p>
      </Callout>
    </>
  )
}

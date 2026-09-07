import { Link } from 'react-router-dom'
import { Callout, Code, H2, Step, Steps, Table } from '../components/ui.jsx'

export default function QuickStart() {
  return (
    <>
      <div className="page-head">
        <div className="page-eyebrow">02 · Bắt đầu nhanh</div>
        <h1>Chép template vào một project mới</h1>
        <p className="page-lede">
          Tám bước. Bước 1–4 là thao tác máy móc, mất khoảng 10 phút. Bước 5–6 là
          phần tốn công nhất và cũng là phần quyết định template có tác dụng hay
          không: viết lại <code>LLM.md</code> và <code>docs/</code> cho đúng
          project của bạn.
        </p>
      </div>

      <Callout type="warn" title="Đừng chép rồi dùng luôn">
        <p style={{ marginBottom: 0 }}>
          <code>LLM.md</code> mô tả module graph của <em>project cũ</em>. Chép
          nguyên mà không viết lại thì agent sẽ tạo file theo package không tồn
          tại, và bạn mất nhiều thời gian sửa hơn là tự viết từ đầu.
        </p>
      </Callout>

      <H2>Tám bước</H2>

      <Steps>
        <Step title="Chép ba đường dẫn sang project mới">
          <p>
            Chỉ ba thứ: <code>.claude/</code>, <code>LLM.md</code>, và{' '}
            <code>docs/android-mvi-best-practices.md</code>. Loại trừ bí mật và
            rác của project cũ ngay lúc chép.
          </p>
          <Code lang="bash">{`
CU=~/duong/dan/project-cu
MOI=~/duong/dan/project-moi

# .claude/ — bỏ .env, agent-memory và .DS_Store của project cũ
rsync -a --exclude='.env' --exclude='agent-memory/' --exclude='.DS_Store' \\
      --exclude='__pycache__/' "$CU/.claude/" "$MOI/.claude/"

# LLM.md và MVI doc
mkdir -p "$MOI/docs"
cp "$CU/LLM.md" "$MOI/LLM.md"
cp "$CU/docs/android-mvi-best-practices.md" "$MOI/docs/"
`}</Code>
          <p className="lead-note">
            Không chép <code>plans/</code>: thư mục đó do <code>planner</code> sinh
            ra cho từng feature, không phải một phần của template.
          </p>
        </Step>

        <Step title="Viết lại .claude/CLAUDE.md thành mô tả project mới">
          <p>
            File này là thứ Claude nạp <strong>mỗi phiên</strong>, nên nó phải nói
            về project của bạn, không phải về template. Giữ nguyên bốn khối cấu
            trúc, thay phần mô tả:
          </p>
          <Table head={['Khối', 'Giữ hay sửa']}>
            <tr>
              <td>Tiêu đề + mô tả project</td>
              <td>
                <strong>Sửa</strong> — một đoạn về app bạn đang xây
              </td>
            </tr>
            <tr>
              <td>“MANDATORY: read before writing code”</td>
              <td>
                <strong>Giữ nguyên</strong> — đây là điều khoản ép đọc{' '}
                <code>LLM.md</code>
              </td>
            </tr>
            <tr>
              <td>Bảng “Update rules”</td>
              <td>
                <strong>Giữ</strong>, sửa số mục nếu <code>LLM.md</code> của bạn
                đánh số khác
              </td>
            </tr>
            <tr>
              <td>“Non-negotiable MVI rules”</td>
              <td>
                <strong>Giữ</strong> nếu vẫn là Android/Compose; viết lại nếu đổi
                nền tảng
              </td>
            </tr>
            <tr>
              <td>Skills / Agents / Rules / Config</td>
              <td>
                <strong>Giữ nguyên</strong>
              </td>
            </tr>
          </Table>
        </Step>

        <Step title="Cấu hình bí mật và MCP">
          <Code lang="bash">{`
cd "$MOI"
cp .claude/.env.example .claude/.env      # điền GEMINI_API_KEY, CONTEXT7_API_KEY
cp .claude/.mcp.json.example .mcp.json    # sửa đường dẫn binary pencil cho máy này

# Kiểm thứ tự nạp biến môi trường
python3 .claude/scripts/resolve_env.py --show-hierarchy
`}</Code>
          <Callout type="danger" title="Kiểm settings.json trước khi commit">
            <p style={{ marginBottom: 0 }}>
              <code>.claude/settings.json</code> có khối <code>env</code> và nó có
              thể đang chứa API key thật viết cứng. Chuyển key đó sang{' '}
              <code>.claude/.env</code> (đã nằm trong <code>.gitignore</code>)
              trước khi commit <code>.claude/</code> lên repo mới.
            </p>
          </Callout>
        </Step>

        <Step title="Cài phụ thuộc ngoài">
          <p>
            Skill nào thiếu phụ thuộc sẽ chạy hỏng chứ không cảnh báo trước. Cài
            đủ ngay từ đầu:
          </p>
          <Code lang="bash">{`
# document-skills (xlsx/docx/pptx/pdf) — project-kickoff cần cái này
pip3 install defusedxml openpyxl python-pptx pypdf lxml

# media-processing
brew install ffmpeg imagemagick

# kiểm tra runtime
node -v && python3 -V && git --version
`}</Code>
        </Step>

        <Step title="Viết lại LLM.md §1–§12">
          <p>
            Đây là bước quan trọng nhất. §1 tả app; §2–§10 tả module và quy ước;
            §11 <em>bắt đầu rỗng</em>; §12 rỗng cho tới khi bạn có quyết định đầu
            tiên kiểu “trông sai nhưng cố ý”.
          </p>
          <p>
            Chi tiết từng mục và mẫu viết: <Link to="/llm-md">trang LLM.md</Link>.
          </p>
        </Step>

        <Step title="Dựng docs/ cho project mới">
          <Code lang="bash" file="docs/">{`
docs/
├── android-mvi-best-practices.md   # đã chép ở bước 1 — thường không cần sửa
├── system-architecture.md          # viết mới: module graph, DI graph, nav graph
├── screens/                        # viết mới: mỗi màn hình một file
└── (tuỳ project) reverse-engineering/, development-roadmap.md, project-changelog.md
`}</Code>
          <p>
            Cách nhanh nhất: để Claude đọc codebase rồi sinh khung, sau đó bạn sửa
            lại từng phần.
          </p>
          <Code lang="bash">{`/ck:docs init`}</Code>
        </Step>

        <Step title="Kiểm tra template đã sống">
          <Code lang="bash">{`
# 1. Skill có được nhận diện không (quét .claude/skills/ trực tiếp)
python3 .claude/skills/ck-help/scripts/ck-help.py

# 2. Docs có hợp lệ không
node .claude/scripts/validate-docs.cjs
`}</Code>
          <p>
            Trong Claude Code, gõ <code>/agents</code> để xem 16 agent đã nạp, và{' '}
            <code>/ck:ck-help</code> để liệt kê skill. Thanh statusline dưới cùng
            phải hiện phần trăm context và quota — nếu hiện <code>N/A</code>, hook{' '}
            <code>usage-context-awareness.cjs</code> chưa chạy.
          </p>
        </Step>

        <Step title="Chạy thử một vòng thật">
          <p>
            Đừng nghiệm thu bằng cách nhìn file. Nghiệm thu bằng một feature nhỏ
            chạy trọn quy trình:
          </p>
          <Code lang="bash">{`
# Trong Claude Code
Đọc LLM.md rồi lên kế hoạch cho màn hình Settings.
Dùng agent planner, xuất plan vào plans/.
`}</Code>
          <p style={{ marginBottom: 0 }}>
            Nếu <code>planner</code> tạo ra plan trích dẫn đúng mục của{' '}
            <code>LLM.md</code> và đặt file vào đúng package, template đã hoạt
            động. Nếu nó bịa ra package không có trong <code>§3</code>, quay lại
            bước 5.
          </p>
        </Step>
      </Steps>

      <H2>Quyết định về .gitignore</H2>
      <p>
        Repo mẫu này <strong>không commit</strong> <code>.claude/</code>,{' '}
        <code>docs/</code>, <code>plans/</code> và <code>LLM.md</code> — bốn dòng
        cuối của <code>.gitignore</code>. Đó là một lựa chọn, không phải mặc định
        đúng.
      </p>

      <Table head={['Lựa chọn', 'Được', 'Mất']}>
        <tr>
          <td>
            <strong>Commit</strong> cả bốn
          </td>
          <td>
            Cả đội và CI dùng chung một hợp đồng; thay đổi của <code>LLM.md</code>{' '}
            được review như review code
          </td>
          <td>
            Phải chắc <code>.claude/settings.json</code> không có secret; diff{' '}
            <code>plans/</code> khá ồn
          </td>
        </tr>
        <tr>
          <td>
            Commit <code>LLM.md</code> + <code>docs/</code>, bỏ qua{' '}
            <code>.claude/</code> và <code>plans/</code>
          </td>
          <td>Hợp đồng được chia sẻ, cấu hình agent để mỗi người tự chọn</td>
          <td>Mỗi người một bộ agent — kết quả không đồng nhất</td>
        </tr>
        <tr>
          <td>Bỏ qua cả bốn (như repo mẫu)</td>
          <td>Không rò rỉ key, repo sạch</td>
          <td>
            Người mới clone về <strong>không có hợp đồng nào cả</strong> — agent
            của họ chạy mù
          </td>
        </tr>
      </Table>

      <Callout type="tip" title="Khuyến nghị">
        <p style={{ marginBottom: 0 }}>
          Commit <code>LLM.md</code>, <code>docs/</code> và <code>.claude/</code>{' '}
          (trừ <code>.claude/.env</code>, <code>.claude/agent-memory/</code>,{' '}
          <code>.claude/settings.local.json</code> — template đã ignore sẵn ba
          đường dẫn này). Với <code>plans/</code>, commit markdown và ignore dữ
          liệu nặng, đúng như phần “Plan artifacts” trong <code>.gitignore</code>{' '}
          mẫu.
        </p>
      </Callout>
    </>
  )
}

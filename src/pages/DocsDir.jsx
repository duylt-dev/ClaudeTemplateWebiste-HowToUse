import { Callout, Code, H2, H3, Table, Tree } from '../components/ui.jsx'

const MVI = [
  ['0', 'The one-paragraph version', 'Toàn bộ MVI trong một đoạn — đọc cái này nếu chỉ có 2 phút'],
  ['1', 'The base class', 'MviViewModel<S, I, E>: launchSafely, setState, sendEffect'],
  ['2', 'The Contract file', 'XState / XIntent / XEffect, tất cả trong XContract.kt'],
  ['3', 'The ViewModel', 'onIntent là public method duy nhất; concurrency; sub-job'],
  ['4', 'The screen', 'Thu Effect bằng collect, lifecycle-aware; state nền tảng ở composable'],
  ['5', 'Consuming the domain layer', 'AppResult, không ném exception qua ranh giới'],
  ['6', 'Dependency injection (Koin)', 'viewModel { } và constructor injection'],
  ['7', 'Testing an MVI ViewModel', 'Hình dạng chuẩn của một bài test'],
  ['8', 'Compose performance', 'Phần MVI làm hỏng hoặc cứu — stability, ImmutableList'],
  ['9', 'Checklist trước khi mở PR', 'Chạy checklist này trước khi báo xong việc'],
  ['10', 'Anti-patterns', 'Kèm cái giá thật của từng cái'],
  ['11', 'Screen chrome', 'Header và design token'],
]

const ARCH = [
  ['1', 'What the app is', 'Hình dạng quyết định kiến trúc'],
  ['2', 'Module graph', 'Bản chi tiết của LLM.md §3'],
  ['3', 'The MVI contract', 'Hợp đồng ở mức hệ thống'],
  ['4', 'The shared core', 'Cái gì thuộc core, đã đối chiếu'],
  ['5', 'The Koin module graph', 'Toàn bộ đồ thị DI'],
  ['6', 'The navigation graph', 'Mọi đích đến và cạnh nối'],
  ['7', 'Cross-cutting concerns', 'Log, analytics, quyền, lỗi'],
  ['8', 'File access and storage', 'MediaStore, SAF, scoped storage'],
  ['9', 'What we are deliberately NOT porting', 'Danh sách từ chối, kèm lý do'],
  ['10', 'Open architectural questions', 'Chưa chốt — chốt trước khi code phần liên quan'],
]

export default function DocsDir() {
  return (
    <>
      <div className="page-head">
        <div className="page-eyebrow">05 · Trụ cột 3</div>
        <h1>
          Thư mục <code style={{ fontSize: '0.86em' }}>docs/</code>
        </h1>
        <p className="page-lede">
          <code>LLM.md</code> nói code đi đâu. <code>docs/</code> nói code được viết
          thế nào và hệ thống ghép lại ra sao. Một file trong đây được chép nguyên
          sang mọi project; phần còn lại bạn viết mới.
        </p>
      </div>

      <H2>Bên trong có gì</H2>

      <Tree>{`
<span class="d">docs/</span>
├── <span class="hl">android-mvi-best-practices.md</span>   <span class="n">≈1 200 dòng · CHÉP NGUYÊN · độc lập với project</span>
├── <span class="hl">system-architecture.md</span>          <span class="n">VIẾT MỚI · kiến trúc hệ thống của bạn</span>
├── <span class="hl">screens/</span>                        <span class="n">VIẾT MỚI · mỗi màn hình một file</span>
│   ├── 10-splash-and-onboarding.md
│   ├── 11-home.md
│   └── …
└── <span class="hl">reverse-engineering/</span>            <span class="n">TUỲ CHỌN · chỉ khi có phân tích đối thủ</span>
    ├── 00-overview.md
    ├── deobfuscation-reference.md
    └── 99-corrections-and-open-questions.md
`}</Tree>

      <Callout type="tip" title="Đánh số file theo cụm">
        <p style={{ marginBottom: 0 }}>
          <code>screens/</code> và <code>reverse-engineering/</code> dùng cùng một
          hệ số: <code>10-splash</code>, <code>11-home</code>,{' '}
          <code>12-junk-cleaning</code>… Nhờ vậy đặc tả màn hình và phân tích đối
          thủ của cùng một cụm nằm cạnh nhau khi grep, và một agent đọc{' '}
          <code>screens/13</code> biết ngay tìm bối cảnh ở{' '}
          <code>reverse-engineering/13</code>.
        </p>
      </Callout>

      <H2>android-mvi-best-practices.md</H2>
      <p>
        File duy nhất trong template <strong>không phụ thuộc project</strong>. Nó
        dạy cách viết một màn hình MVI và thường không cần sửa dòng nào khi chuyển
        project — miễn là vẫn Android + Compose.
      </p>

      <Table head={['§', 'Mục', 'Nội dung']}>
        {MVI.map(([n, name, desc]) => (
          <tr key={n}>
            <td>
              <strong>{n}</strong>
            </td>
            <td style={{ whiteSpace: 'nowrap' }}>{name}</td>
            <td>{desc}</td>
          </tr>
        ))}
      </Table>

      <H3>Tám luật không thương lượng</H3>
      <p>
        <code>.claude/CLAUDE.md</code> rút ra tám luật từ file này và ghi rõ:{' '}
        <em>một bản review phải từ chối nếu vi phạm</em>. Đây là những luật đã gây
        ra bug thật.
      </p>
      <ul className="check">
        <li>
          Mọi screen ViewModel kế thừa <code>MviViewModel&lt;S, I, E&gt;</code> —
          không dùng <code>ViewModel</code> trần.
        </li>
        <li>
          <code>onIntent</code> là <strong>public method duy nhất</strong> trên
          ViewModel. Không có cửa thoát.
        </li>
        <li>
          State/Intent/Effect nằm trong <code>XContract.kt</code> — không bao giờ
          viết inline trong file ViewModel.
        </li>
        <li>
          Mọi coroutine đi qua <code>launchSafely</code>;{' '}
          <code>CancellationException</code> được ném lại.
        </li>
        <li>
          Mọi Effect được khai báo đều phải có màn hình thu bằng{' '}
          <code>collect</code> (không phải <code>collectLatest</code>),
          lifecycle-aware.
        </li>
        <li>Điều hướng là một Effect. Không bao giờ là một cờ trong state.</li>
        <li>
          Sub-job là con cấu trúc của job cha, không phải field bị huỷ bằng tay.
        </li>
        <li>Không có import Compose hay platform nào bên trong ViewModel.</li>
      </ul>

      <Callout type="warn" title="Vì sao collect chứ không phải collectLatest">
        <p style={{ marginBottom: 0 }}>
          <code>collectLatest</code> huỷ lượt xử lý trước khi Effect mới tới. Với
          một Effect điều hướng, điều đó nghĩa là lệnh chuyển màn hình bị nuốt khi
          hai Effect phát ra sát nhau. Đây là một bug đã ship, không phải giả định —
          MVI §4 ghi lại nguyên nhân.
        </p>
      </Callout>

      <H2>system-architecture.md</H2>
      <p>
        Bản đầy đủ của kiến trúc. Nếu <code>LLM.md</code> là bản đồ đường phố thì
        đây là bản quy hoạch: vì sao các module được chia như vậy, đồ thị DI toàn
        cục, đồ thị điều hướng, và những gì cố ý <em>không</em> làm.
      </p>

      <Table head={['§', 'Mục', 'Nội dung']}>
        {ARCH.map(([n, name, desc]) => (
          <tr key={n}>
            <td>
              <strong>{n}</strong>
            </td>
            <td style={{ whiteSpace: 'nowrap' }}>{name}</td>
            <td>{desc}</td>
          </tr>
        ))}
      </Table>

      <p>
        Hai mục hay bị bỏ sót nhưng có giá trị cao nhất:{' '}
        <strong>§9 “cố ý không làm”</strong> ngăn agent nhiệt tình thêm lại thứ bạn
        đã từ chối, và <strong>§10 “câu hỏi kiến trúc còn mở”</strong> khiến những
        thứ chưa chốt hiện rõ thay vì được một agent tự quyết giùm.
      </p>

      <H2>screens/ — đặc tả từng màn hình</H2>
      <p>
        Mỗi file mô tả một cụm màn hình ở mức đủ để viết code: state cần gì, intent
        nào, luồng lỗi, quyền cần xin, và điều gì xảy ra khi người dùng từ chối
        quyền. Đây là input trực tiếp của <code>planner</code>.
      </p>

      <Code lang="md" file="docs/screens/12-junk-cleaning.md">{`
## 0. Nguồn và phạm vi
## 1. Luồng màn hình      ← từng bước, kèm điều kiện rẽ nhánh
## 2. State và Intent     ← bảng: field → kiểu → ai đổi nó
## 3. Quyền               ← xin cái gì, khi nào, từ chối thì sao
## 4. Trường hợp lỗi      ← mỗi lỗi → copy hiển thị → hành động khôi phục
## 5. Cái gì KHÔNG làm    ← kèm lý do
`}</Code>

      <H2>reverse-engineering/ — chỉ khi cần</H2>
      <p>
        Thư mục này chỉ có nghĩa khi project của bạn được thông tin bởi phân tích
        một app khác. Nó là <strong>kho yêu cầu và kho rủi ro</strong>, không phải
        kho code để chép: mỗi dòng “đừng làm thế này” đều trích dẫn tới đúng dòng đã
        quan sát được.
      </p>
      <p>
        Nếu project của bạn không có phân tích đối thủ,{' '}
        <strong>bỏ hẳn thư mục này</strong> và xoá mọi tham chiếu tới nó trong{' '}
        <code>LLM.md</code> — tham chiếu treo còn tệ hơn là không có.
      </p>

      <H2>Các file mà rules yêu cầu</H2>
      <p>
        <code>.claude/rules/documentation-management.md</code> nêu tên bốn file và
        thời điểm phải cập nhật. Repo mẫu chưa có đủ bốn — nếu bạn muốn{' '}
        <code>project-manager</code> hoạt động đúng như luật viết, hãy tạo chúng:
      </p>

      <Table head={['File', 'Vai trò', 'Cập nhật khi']}>
        <tr>
          <td>
            <code>docs/development-roadmap.md</code>
          </td>
          <td>Giai đoạn, cột mốc, tiến độ</td>
          <td>Trạng thái một phase đổi; điều chỉnh timeline</td>
        </tr>
        <tr>
          <td>
            <code>docs/project-changelog.md</code>
          </td>
          <td>Ghi nhận thay đổi, feature, fix</td>
          <td>Sau mỗi feature; sau mỗi bug fix, kèm mức độ và ảnh hưởng</td>
        </tr>
        <tr>
          <td>
            <code>docs/system-architecture.md</code>
          </td>
          <td>Kiến trúc hệ thống</td>
          <td>Đổi ranh giới module hoặc thêm cụm mới</td>
        </tr>
        <tr>
          <td>
            <code>docs/code-standards.md</code>
          </td>
          <td>Chuẩn code</td>
          <td>Thêm quy ước mới</td>
        </tr>
      </Table>

      <H2>Giới hạn kích thước</H2>
      <p>
        <code>.ck.json</code> đặt <code>docs.maxLoc: 800</code>. File vượt ngưỡng
        nên được tách theo chủ đề — không phải vì thẩm mỹ, mà vì một file 3 000 dòng
        nạp vào context sẽ đẩy chính đoạn code cần sửa ra ngoài.
      </p>
      <Code lang="bash">{`
# Sinh khung docs từ codebase hiện có
/ck:docs init

# Cập nhật docs sau một loạt thay đổi
/ck:docs update

# Kiểm tra
node .claude/scripts/validate-docs.cjs
`}</Code>
    </>
  )
}

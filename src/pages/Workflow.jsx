import { Callout, Code, H2, H3, Step, Steps, Table, Tree } from '../components/ui.jsx'

export default function Workflow() {
  return (
    <>
      <div className="page-head">
        <div className="page-eyebrow">06 · Vận hành</div>
        <h1>Quy trình làm việc</h1>
        <p className="page-lede">
          Template có hai đường ray: một cho <strong>sản phẩm</strong> (ý tưởng →
          kickoff → PRD → test case → wireframe) và một cho{' '}
          <strong>code</strong> (plan → cook → test → review → docs). Chúng nối
          nhau ở chỗ PRD trở thành input của <code>planner</code>.
        </p>
      </div>

      <H2>Đường ray code — vòng chính</H2>
      <p>
        Định nghĩa ở <code>.claude/rules/primary-workflow.md</code>. Đây là vòng
        Claude chạy mặc định cho mọi yêu cầu thay đổi code.
      </p>

      <Steps>
        <Step title="Plan — trước khi gõ dòng code đầu tiên">
          <p>
            Giao cho <code>planner</code>. Ở giai đoạn nghiên cứu, nhiều{' '}
            <code>researcher</code> chạy <strong>song song</strong> trên các chủ đề
            kỹ thuật khác nhau rồi báo về cho <code>planner</code>.
          </p>
          <Code lang="bash">{`/ck:plan thêm màn hình nén video`}</Code>
        </Step>

        <Step title="Cook — hiện thực">
          <p>
            Skill <code>cook</code> phải được kích hoạt <strong>trước mọi</strong>{' '}
            feature, plan hay fix. Luật kèm theo:
          </p>
          <ul>
            <li>
              Sửa thẳng file đang có —{' '}
              <strong>không tạo file “enhanced” mới</strong>.
            </li>
            <li>
              Chạy lệnh compile <strong>sau mỗi lần tạo hoặc sửa file</strong>,
              không đợi tới cuối.
            </li>
            <li>Không mô phỏng, không mock để cho có — code thật.</li>
          </ul>
        </Step>

        <Step title="Test — trên code đã đơn giản hoá">
          <p>
            Giao cho <code>tester</code>. Test chạy trên code{' '}
            <strong>cuối cùng</strong> — thứ sẽ được review và merge, không phải bản
            nháp.
          </p>
          <Callout type="danger" title="Luật cứng">
            <p style={{ marginBottom: 0 }}>
              Không được bỏ qua test fail để build xanh. Không dữ liệu giả, không
              mock, không mẹo tạm. Sửa theo khuyến nghị rồi giao lại cho{' '}
              <code>tester</code>, và chỉ kết thúc phiên khi tất cả test pass.
            </p>
          </Callout>
        </Step>

        <Step title="Review — sau khi test xanh">
          <p>
            Giao cho <code>code-reviewer</code>, agent này gọi thêm{' '}
            <code>scout</code> để tìm edge case mà bản diff không lộ ra.
          </p>
          <Code lang="bash">{`/ck:code-review`}</Code>
        </Step>

        <Step title="Docs — cùng commit, không hoãn">
          <p>
            Giao cho <code>docs-manager</code>. Đối chiếu bảng Update rules trong{' '}
            <code>.claude/CLAUDE.md</code>: đổi package thì sửa{' '}
            <code>LLM.md §3</code>, đổi quy ước test thì sửa <code>§9</code> và MVI
            §7, v.v.
          </p>
        </Step>
      </Steps>

      <H2>Đường ray sản phẩm — bốn bước BA</H2>
      <p>
        Dùng khi bắt đầu từ một ý tưởng chứ không phải một codebase. Ba bước đầu là
        đúng ba skill mà agent <code>ba-writer</code> khai báo là cần.
      </p>

      <Table head={['Bước', 'Skill', 'Đầu ra', 'Phụ thuộc']}>
        <tr>
          <td>1</td>
          <td>
            <code>project-kickoff</code>
          </td>
          <td>Kickoff XLSX: phân khúc người dùng, đối thủ, phạm vi, timeline</td>
          <td>
            Cần <code>ck:xlsx</code> →{' '}
            <code>pip3 install openpyxl …</code>
          </td>
        </tr>
        <tr>
          <td>2</td>
          <td>
            <code>product-requirements</code>
          </td>
          <td>PRD: user story, đặc tả UI, user flow, remote config</td>
          <td>Sau khi kickoff được duyệt</td>
        </tr>
        <tr>
          <td>3</td>
          <td>
            <code>qa-uat</code>
          </td>
          <td>QA test case và kịch bản UAT</td>
          <td>Sinh từ PRD</td>
        </tr>
        <tr>
          <td>4</td>
          <td>
            <code>ui-design-pencil</code>
          </td>
          <td>
            Wireframe <code>.pen</code>: layout màn hình, luồng điều hướng
          </td>
          <td>Cần MCP server pencil</td>
        </tr>
      </Table>

      <H2>plans/ — nơi kế hoạch sống</H2>
      <p>
        Quy ước đặt tên lấy từ <code>.ck.json</code>:{' '}
        <code>&#123;date&#125;-&#123;issue&#125;-&#123;slug&#125;</code> với{' '}
        <code>dateFormat: YYMMDD-HHmm</code>.
      </p>

      <Tree>{`
<span class="d">plans/</span>
└── <span class="hl">260907-0142-video-compression/</span>
    ├── plan.md                          <span class="n">tổng quan, dưới 80 dòng, link tới từng phase</span>
    ├── phase-01-build-wiring-media3.md
    ├── phase-02-feature-identity-and-locked-tile.md
    ├── phase-03-domain-video-compression.md
    ├── …
    ├── phase-10-documentation-sync.md   <span class="n">phase cuối LUÔN là đồng bộ tài liệu</span>
    ├── research/                        <span class="n">báo cáo của researcher trong lúc lập kế hoạch</span>
    └── reports/                         <span class="n">researcher-01-…md · scout-report.md</span>
`}</Tree>

      <H3>Một file phase phải có gì</H3>
      <p>
        Mục tiêu: <strong>một agent dev đọc riêng file đó là làm được việc</strong>,
        không cần mở mười file khác. Đây là điều kiện để các phase chạy song song.
      </p>
      <Code lang="md">{`
# Phase 04 — Data: Media3 engine

## Context links        → plan.md, docs/screens/13, LLM.md §3.6
## Overview             → độ ưu tiên · trạng thái · mô tả ngắn
## Key insights         → phát hiện từ research, ràng buộc nền tảng
## Requirements         → chức năng và phi chức năng
## Architecture         → thiết kế, tương tác component, luồng dữ liệu
## Related code files   → BẢNG: file tạo mới / sửa / xoá, đường dẫn đầy đủ
## Implementation steps → các bước đánh số, kèm code cụ thể
## Todo list            → checkbox
## Success criteria     → định nghĩa "xong" và cách kiểm chứng
## Risk assessment      → rủi ro và cách giảm thiểu
## Security             → quyền, bảo vệ dữ liệu
## Files owned          → chống hai agent giẫm chân khi chạy song song
## Compile gate         → lệnh build chính xác phải chạy được
`}</Code>

      <H2>Điều phối nhiều agent</H2>

      <Callout type="warn" title="Bắt buộc khi spawn subagent">
        <p>
          <code>orchestration-protocol.md</code> yêu cầu prompt gửi cho subagent{' '}
          <strong>luôn</strong> chứa ba đường dẫn:
        </p>
        <Code lang="bash">{`
Fix parser bug.
Work context: /path/to/project-b
Reports:      /path/to/project-b/plans/reports/
Plans:        /path/to/project-b/plans/
`}</Code>
        <p style={{ marginBottom: 0 }}>
          Nếu thư mục làm việc hiện tại khác với project đang sửa,{' '}
          <strong>dùng đường dẫn của project đang sửa</strong>, không dùng đường dẫn
          hiện tại. Thiếu bước này, subagent ghi báo cáo vào nhầm repo.
        </p>
      </Callout>

      <div className="two-col">
        <div className="card">
          <div className="card-title">Chuỗi tuần tự</div>
          <div className="card-body">
            <p>Khi việc sau cần đầu ra của việc trước.</p>
            <p style={{ marginBottom: 0 }}>
              <code>
                planner → developer → simplifier → tester → reviewer
              </code>
            </p>
          </div>
        </div>
        <div className="card">
          <div className="card-title">Chạy song song</div>
          <div className="card-body">
            <p>Khi các việc độc lập và không chạm cùng file.</p>
            <p style={{ marginBottom: 0 }}>
              Nhiều <code>researcher</code> trên các chủ đề khác nhau; code + test +
              docs cho các component tách biệt. <strong>Phải</strong> chia sở hữu
              file trước khi bắt đầu.
            </p>
          </div>
        </div>
      </div>

      <H2>Khi có bug</H2>
      <Steps>
        <Step title="Giao cho debugger">
          <p>
            Nó chạy test, phân tích log, và xuất một báo cáo tóm tắt. Không tự sửa
            trước khi có nguyên nhân gốc.
          </p>
          <Code lang="bash">{`/ck:debug màn hình duplicate không tìm ra file nào trên Android 14`}</Code>
        </Step>
        <Step title="Đọc báo cáo rồi tự hiện thực bản sửa">
          <p>
            Skill <code>fix</code> phải được kích hoạt trước khi sửa bất kỳ bug, lỗi
            test, lỗi CI, type error hay lint nào.
          </p>
        </Step>
        <Step title="Giao lại cho tester">
          <p style={{ marginBottom: 0 }}>
            Test fail thì sửa theo khuyến nghị và lặp lại — không kết thúc phiên khi
            còn test đỏ.
          </p>
        </Step>
        <Step title="Ghi nhật ký nếu đây là bug khó">
          <p style={{ marginBottom: 0 }}>
            <code>journal-writer</code> dùng cho bug lặp lại nhiều lần, lỗ hổng bảo
            mật, hoặc một hướng tiếp cận phải làm lại từ đầu. Đây là thứ giữ lại bài
            học sau khi context của phiên đã mất.
          </p>
        </Step>
      </Steps>
    </>
  )
}

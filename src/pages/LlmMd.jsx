import { Badge, Callout, Code, H2, H3, Table, Tree } from '../components/ui.jsx'
import { LLM_SECTIONS } from '../data/llm-sections.js'

export default function LlmMd() {
  return (
    <>
      <div className="page-head">
        <div className="page-eyebrow">03 · Trụ cột 1</div>
        <h1>
          <code style={{ fontSize: '0.86em' }}>LLM.md</code> — bản đồ cấu trúc code
        </h1>
        <p className="page-lede">
          Một file duy nhất ở gốc repo, trả lời đúng một câu hỏi:{' '}
          <strong>code này đi đâu?</strong> Nó không dạy viết code — việc đó là của
          MVI doc. Nó nói package nào tồn tại, module nào được thấy module nào, và
          file mới thuộc về chỗ nào.
        </p>
      </div>

      <Callout type="warn" title="Điều khoản ép đọc">
        <p style={{ marginBottom: 0 }}>
          <code>.claude/CLAUDE.md</code> ghi: <em>“Read them BEFORE writing or
          modifying any application code — no exceptions, including for a one-line
          change.”</em>{' '}
          Đây không phải lời khuyên. Nó là lý do agent không tự bịa package: file
          nào cũng có một dòng trong <code>§4</code> chỉ chỗ.
        </p>
      </Callout>

      <H2>Cấu trúc 12 mục</H2>
      <p>
        Cột <em>“Cần làm gì”</em> nói rõ khi mang sang project mới bạn phải viết
        lại mục đó, chỉ sửa, chép nguyên, hay để rỗng.
      </p>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>§</th>
              <th>Mục</th>
              <th>Nội dung</th>
              <th>Cần làm gì</th>
            </tr>
          </thead>
          <tbody>
            {LLM_SECTIONS.map((s) => (
              <tr key={s.n}>
                <td>
                  <strong>{s.n}</strong>
                </td>
                <td style={{ whiteSpace: 'nowrap' }}>{s.name}</td>
                <td>
                  {s.what}
                  <div
                    className="lead-note"
                    style={{ marginTop: 4, fontStyle: 'normal' }}
                  >
                    {s.note}
                  </div>
                </td>
                <td>
                  <Badge tone={s.tone}>{s.action}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <H2>§2 — Ranh giới tầng, viết thế nào</H2>
      <p>
        Bắt đầu bằng một cái thang. Mỗi dòng chỉ được phụ thuộc vào các dòng bên
        dưới nó:
      </p>

      <Tree>{`
<span class="hl">:app</span>                 ← được phụ thuộc mọi thứ
<span class="hl">:feature:*</span>           ← :core:common, :core:mvi, :core:ui, :domain
<span class="hl">:core:ui</span>             ← :core:common, :core:mvi, :domain
<span class="hl">:data</span>                ← :core:common, :domain
<span class="hl">:core:mvi</span>            ← :core:common, :domain
<span class="hl">:domain</span>              ← :core:common          <span class="n">(JVM thuần — không Android, không Compose)</span>
<span class="hl">:core:common</span>         ← không gì cả            <span class="n">(JVM thuần)</span>
`}</Tree>

      <p>
        Rồi liệt kê những cạnh <strong>không bao giờ được tồn tại</strong>, mỗi
        cạnh kèm cái giá đã quan sát:
      </p>

      <Table head={['Cạnh cấm', 'Giá phải trả — quan sát thật, không phải giả định']}>
        <tr>
          <td>
            <code>:domain</code> → bất kỳ thứ gì Android
          </td>
          <td>
            Giữ một <code>Drawable</code> trong model làm <code>equals</code> sai:
            hai dòng giống hệt nhau so ra khác nhau vì image loader trả về instance
            khác. Model không so sánh được thì <code>LazyColumn</code> không diff
            được, và không diff được thì vẽ lại toàn bộ.
          </td>
        </tr>
        <tr>
          <td>
            <code>:feature:*</code> → <code>:data</code>
          </td>
          <td>
            Ranh giới module là thứ duy nhất khiến constructor injection trở thành
            lựa chọn <em>duy nhất có sẵn</em>. Xoá nó đi thì lời gọi{' '}
            <code>AppDatabase.getInstance()</code> đầu tiên trong ViewModel lại hợp
            lệ.
          </td>
        </tr>
        <tr>
          <td>
            <code>:feature:A</code> → <code>:feature:B</code>
          </td>
          <td>
            Sáu màn hình cùng điều hướng tới màn hình kết quả. Một cạnh trực tiếp
            biến mọi defect của màn hình đó thành defect của mười lăm feature cùng
            lúc.
          </td>
        </tr>
      </Table>

      <Callout type="tip" title="Ép bằng CI, không ép bằng kỷ luật">
        <p style={{ marginBottom: 0 }}>
          Một luật phân tầng chỉ nằm trong tài liệu sẽ bị phá lại bởi agent tiếp
          theo thấy rằng thêm một dependency dễ hơn sửa lỗi compile. Thêm một
          dependency check vào CI và liệt kê nó ở <code>§10</code>.
        </p>
      </Callout>

      <H2>§4 — Bảng “file này đi đâu”</H2>
      <p>
        Mục này là thứ agent tra nhiều nhất trong cả file. Nguyên tắc in đậm ngay
        đầu mục: <strong>tìm dòng trước khi tạo file — đừng phát minh package.</strong>
      </p>

      <Table head={['Tôi đang thêm…', 'Nó nằm ở', 'Ghi chú']}>
        <tr>
          <td>Một màn hình mới</td>
          <td>
            <code>:feature:&lt;cluster&gt;/&lt;screen&gt;/</code> — bốn file:{' '}
            <code>XContract.kt</code>, <code>XViewModel.kt</code>,{' '}
            <code>XRoute.kt</code>, <code>XScreen.kt</code>
          </td>
          <td>
            Không bao giờ ít hơn bốn. ViewModel có State viết inline là thứ MVI §2
            cấm đích danh
          </td>
        </tr>
        <tr>
          <td>Composable dùng bởi hai cluster</td>
          <td>
            <code>:core:ui/component/&lt;group&gt;/</code>
          </td>
          <td>Đẩy lên core là cách hợp lệ duy nhất để hai cluster dùng chung UI</td>
        </tr>
        <tr>
          <td>Repository interface / implementation</td>
          <td>
            <code>:domain/repository/</code> · <code>:data/&lt;area&gt;/</code>
          </td>
          <td>
            Interface trả <code>AppResult&lt;T&gt;</code>, không bao giờ ném
            exception qua ranh giới
          </td>
        </tr>
        <tr>
          <td>Một Koin binding</td>
          <td>
            presentation → <code>:feature:&lt;cluster&gt;/di/</code>; data →{' '}
            <code>:data/di/</code>
          </td>
          <td>
            <code>single&lt;X&gt;</code> thứ hai là một lần ghi đè im lặng, không
            phải lỗi compile
          </td>
        </tr>
        <tr>
          <td>
            Bất cứ thứ gì import <code>android.util.Log</code>
          </td>
          <td>
            <code>:data/log/AndroidAppLogger.kt</code> — và không nơi nào khác
          </td>
          <td>Một file sở hữu một phụ thuộc nền tảng</td>
        </tr>
      </Table>

      <H3>Viết bảng này cho project của bạn</H3>
      <p>
        Bắt đầu bằng khoảng 12–15 dòng phủ hết những gì bạn thật sự tạo trong
        tháng đầu. Thêm dòng khi gặp trường hợp mới —{' '}
        <strong>trong cùng commit tạo ra trường hợp đó</strong>.
      </p>

      <H2>§11 — Known deviations, mục sống lâu nhất</H2>
      <p>
        Đây là nơi ghi mọi chỗ code thật khác với tài liệu. Nó có hai bảng:{' '}
        <strong>Open</strong> và <strong>Fixed</strong>. Mỗi dòng Open có bốn cột:
      </p>

      <Code lang="md">{`
| # | Deviation | Why it exists | What closes it |
|---|-----------|---------------|----------------|
| 10 | ScanBigFilesUseCase dedupe MediaStore theo \`path\`, mà trên API 29+ \`path\` là RELATIVE_PATH — một **thư mục** | Cùng một defect một dòng mà Md5DuplicateFinder từng mang: \`putIfAbsent(row.path, row)\` giữ đúng một dòng cho mỗi thư mục, nên màn hình file lớn hiển thị nhiều nhất một file mỗi thư mục. Phát hiện khi sửa duplicate finder; **không sửa ở đây**, vì đó là màn hình khác, có test riêng, và nằm ngoài phạm vi thay đổi được yêu cầu | Đổi khoá đó thành \`row.id\`, cộng thêm một test chứng minh hai dòng cùng RELATIVE_PATH đều sống sót |
`}</Code>

      <Callout type="info" title="Vì sao cột thứ ba quan trọng nhất">
        <p style={{ marginBottom: 0 }}>
          Cột <em>“Why it exists”</em> là thứ ngăn agent tiếp theo lặng lẽ “sửa”
          một deviation đang được cố ý giữ lại vì lý do phạm vi. Không có cột đó,
          mỗi lần review lại là một lần tranh luận từ đầu.
        </p>
      </Callout>

      <H2>§12 — Những pattern trông sai nhưng cố ý</H2>
      <p>
        Ba cột: <em>pattern</em>, <em>vì sao trông sai</em>, <em>vì sao vẫn giữ</em>
        . Mục này tồn tại vì một lý do rất cụ thể: quét code chết sẽ xoá đúng những
        thứ này trước tiên.
      </p>

      <Table head={['Pattern', 'Vì sao trông sai', 'Vì sao vẫn giữ']}>
        <tr>
          <td>
            <code>ByteFormatter</code> không nằm trong Koin
          </td>
          <td>Mọi thứ khác đều được inject</td>
          <td>
            Nó không trạng thái, không phụ thuộc, và cần dùng được cả bên trong một{' '}
            <code>RemoteViews</code> lẫn một <code>CoroutineWorker</code> — hai nơi
            không có Koin scope. Inject nó không được gì mà mất hai trong ba chỗ
            gọi
          </td>
        </tr>
        <tr>
          <td>
            <code>ProcStatSampler</code> trả <code>null</code> trên mọi thiết bị
            đang có
          </td>
          <td>Một class luôn đọc lỗi là thứ bị xoá đầu tiên</td>
          <td>
            Nó là con số <em>chính xác</em> ở bất cứ đâu SELinux cho đọc{' '}
            <code>/proc/stat</code>. Giá phải trả để giữ là hai lần <code>open</code>{' '}
            thất bại, vài micro giây mỗi lần mở màn hình. Xoá đi là đánh đổi một
            phép đo lấy một phép xấp xỉ trên mọi bản build có quyền đọc
          </td>
        </tr>
      </Table>

      <H2>Quy tắc cập nhật — lệch là lỗi</H2>
      <p>
        <code>.claude/CLAUDE.md</code> gắn từng loại thay đổi với đúng một mục phải
        cập nhật, <strong>trong cùng commit</strong>:
      </p>

      <Table head={['Bạn vừa làm gì', 'Cập nhật cái gì']}>
        <tr>
          <td>Thêm/đổi/xoá package, module, source set</td>
          <td>
            <code>LLM.md §3</code>
          </td>
        </tr>
        <tr>
          <td>Đổi ranh giới tầng hoặc chiều phụ thuộc</td>
          <td>
            <code>§2</code>
          </td>
        </tr>
        <tr>
          <td>Đổi quy ước DI</td>
          <td>
            <code>§6</code>
          </td>
        </tr>
        <tr>
          <td>Đổi quy ước điều hướng / route</td>
          <td>
            <code>§7</code>
          </td>
        </tr>
        <tr>
          <td>
            Đổi <code>compose-stability.conf</code> hoặc cổng stability
          </td>
          <td>
            <code>§8</code> <strong>và</strong> MVI doc §8
          </td>
        </tr>
        <tr>
          <td>Đổi quy ước test</td>
          <td>
            <code>§9</code> <strong>và</strong> MVI doc §7
          </td>
        </tr>
        <tr>
          <td>Sửa xong một deviation ở §11</td>
          <td>Chuyển dòng đó từ Open sang Fixed, kèm commit</td>
        </tr>
        <tr>
          <td>Phát hiện deviation mới mà chưa sửa</td>
          <td>
            Thêm một dòng vào <code>§11</code> Open
          </td>
        </tr>
      </Table>

      <H2>Ba lỗi hay gặp khi tự viết LLM.md</H2>
      <ul className="check x">
        <li>
          <strong>Viết luật mà không nêu giá.</strong> “Không được import Android
          vào domain” bị bỏ qua. “Import Android vào domain làm{' '}
          <code>equals</code> sai và <code>LazyColumn</code> vẽ lại toàn bộ” thì
          không.
        </li>
        <li>
          <strong>Dùng ví dụ bịa.</strong> Snippet phải là code thật trong codebase.
          Ví dụ bịa sẽ lệch khỏi thực tế trong vòng một sprint và agent học theo cái
          lệch đó.
        </li>
        <li>
          <strong>Để §11 rỗng mãi.</strong> Một project ba tháng mà không có
          deviation nào nghĩa là không ai ghi, chứ không phải không có. Và agent
          tiếp theo sẽ copy pattern từ đúng file đang lỗi.
        </li>
      </ul>
    </>
  )
}

import { useState } from 'react'

/* ---------- headings with anchors ---------- */
export const slug = (s) =>
  String(s)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/đ/g, 'd')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')

export function H2({ children, id }) {
  const anchor = id || slug(children)
  return (
    <h2 id={anchor} className="anchor-h">
      {children}
      <a className="anchor" href={`#${anchor}`} aria-label="Liên kết mục">
        #
      </a>
    </h2>
  )
}

export function H3({ children, id }) {
  const anchor = id || slug(children)
  return (
    <h3 id={anchor} className="anchor-h">
      {children}
    </h3>
  )
}

/* ---------- callout ---------- */
const CALLOUT_ICON = { tip: '✓', warn: '⚠', danger: '✕', info: 'i', note: '·' }

export function Callout({ type = 'note', title, children }) {
  return (
    <div className={`callout ${type}`}>
      {title && (
        <div className="callout-title">
          <span aria-hidden="true">{CALLOUT_ICON[type]}</span>
          {title}
        </div>
      )}
      {children}
    </div>
  )
}

/* ---------- code block ---------- */
const esc = (s) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')

function highlight(src, lang) {
  const out = esc(src)
  if (lang === 'bash' || lang === 'sh') {
    return out
      .replace(/(^|\n)(\s*#[^\n]*)/g, '$1<span class="c">$2</span>')
      .replace(/('[^'\n]*'|"[^"\n]*")/g, '<span class="s">$1</span>')
  }
  if (lang === 'json') {
    return out
      .replace(/("(?:[^"\\]|\\.)*")(\s*:)/g, '<span class="p">$1</span>$2')
      .replace(/:\s*("(?:[^"\\]|\\.)*")/g, ': <span class="s">$1</span>')
  }
  if (lang === 'md' || lang === 'markdown') {
    return out
      .replace(/(^|\n)(#{1,6} [^\n]*)/g, '$1<span class="k">$2</span>')
      .replace(/(`[^`\n]+`)/g, '<span class="s">$1</span>')
  }
  return out
}

export function Code({ children, lang = 'bash', file }) {
  const [copied, setCopied] = useState(false)
  const text = String(children).replace(/^\n/, '').replace(/\n\s*$/, '')

  const copy = () => {
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    })
  }

  return (
    <div className="code">
      <div className="code-bar">
        <span>{file || lang}</span>
        <span className="grow" />
        <button type="button" className="copy-btn" onClick={copy}>
          {copied ? 'đã chép' : 'chép'}
        </button>
      </div>
      <pre>
        <code dangerouslySetInnerHTML={{ __html: highlight(text, lang) }} />
      </pre>
    </div>
  )
}

/* ---------- layout primitives ---------- */
export const Grid = ({ cols = 2, children }) => (
  <div className={`grid g${cols}`}>{children}</div>
)

export const Card = ({ icon, title, children }) => (
  <div className="card">
    {icon && <span className="card-ico">{icon}</span>}
    <div className="card-title">{title}</div>
    <div className="card-body">{children}</div>
  </div>
)

export const Steps = ({ children }) => <div className="steps">{children}</div>

export const Step = ({ title, children }) => (
  <div className="step">
    <div className="step-title">{title}</div>
    {children}
  </div>
)

export const Badge = ({ tone = '', children }) => (
  <span className={`badge ${tone}`}>{children}</span>
)

export const Table = ({ head, children }) => (
  <div className="table-wrap">
    <table>
      {head && (
        <thead>
          <tr>
            {head.map((h) => (
              <th key={h}>{h}</th>
            ))}
          </tr>
        </thead>
      )}
      <tbody>{children}</tbody>
    </table>
  </div>
)

export const Tree = ({ children }) => (
  <div className="tree" dangerouslySetInnerHTML={{ __html: String(children).trim() }} />
)

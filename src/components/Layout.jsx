import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { NAV, FLAT } from '../data/nav.js'

/* ---------- theme ---------- */
function useTheme() {
  const [theme, setTheme] = useState(() => {
    try {
      return localStorage.getItem('ck-theme') || 'light'
    } catch {
      return 'light'
    }
  })
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem('ck-theme', theme)
    } catch {
      /* trình duyệt chặn site data — vẫn đổi được theme trong phiên */
    }
  }, [theme])
  return [theme, () => setTheme((t) => (t === 'light' ? 'dark' : 'light'))]
}

export function Header({ onBurger }) {
  const [theme, toggle] = useTheme()
  return (
    <header className="hdr">
      <button
        type="button"
        className="icon-btn burger"
        onClick={onBurger}
        aria-label="Mở menu"
      >
        ☰
      </button>
      <Link to="/" className="hdr-brand">
        <span className="hdr-mark" aria-hidden="true">
          ✦
        </span>
        Claude Template
      </Link>
      <span className="hdr-sub">LLM.md · .claude · docs</span>
      <span className="hdr-spacer" />
      <button
        type="button"
        className="icon-btn"
        onClick={toggle}
        aria-label="Đổi giao diện sáng/tối"
      >
        {theme === 'light' ? '◐' : '◑'}
      </button>
    </header>
  )
}

export function Sidebar({ open, onClose }) {
  return (
    <nav className={`sidebar${open ? ' open' : ''}`}>
      {NAV.map((group) => (
        <div className="nav-group" key={group.title}>
          <div className="nav-title">{group.title}</div>
          {group.items.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              className="nav-link"
              onClick={onClose}
            >
              <span className="nav-num">{item.num}</span>
              {item.name}
            </NavLink>
          ))}
        </div>
      ))}
    </nav>
  )
}

/* ---------- on-page table of contents ---------- */
export function Toc() {
  const { pathname } = useLocation()
  const [heads, setHeads] = useState([])
  const [active, setActive] = useState('')

  useEffect(() => {
    const nodes = [...document.querySelectorAll('.content h2[id]')]
    setHeads(
      nodes.map((n) => ({
        id: n.id,
        text: [...n.childNodes]
          .filter((c) => !c.classList?.contains('anchor'))
          .map((c) => c.textContent)
          .join('')
          .trim(),
      })),
    )
    setActive(nodes[0]?.id || '')

    const obs = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting)
        if (hit.length) setActive(hit[0].target.id)
      },
      { rootMargin: '-70px 0px -72% 0px' },
    )
    nodes.forEach((n) => obs.observe(n))
    return () => obs.disconnect()
  }, [pathname])

  if (heads.length < 2) return <aside className="toc" />

  return (
    <aside className="toc">
      <div className="toc-title">Trên trang này</div>
      {heads.map((h) => (
        <a
          key={h.id}
          href={`#${h.id}`}
          className={h.id === active ? 'active' : undefined}
        >
          {h.text}
        </a>
      ))}
    </aside>
  )
}

export function Pager() {
  const { pathname } = useLocation()
  const i = FLAT.findIndex((p) => p.path === pathname)
  if (i === -1) return null
  const prev = FLAT[i - 1]
  const next = FLAT[i + 1]
  return (
    <div className="pager">
      {prev && (
        <Link to={prev.path} className="pager-link">
          <span className="pager-dir">← Trước</span>
          <span className="pager-name">{prev.name}</span>
        </Link>
      )}
      {next && (
        <Link to={next.path} className="pager-link next">
          <span className="pager-dir">Tiếp →</span>
          <span className="pager-name">{next.name}</span>
        </Link>
      )}
    </div>
  )
}

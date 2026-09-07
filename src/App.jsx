import { useEffect, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { Header, Pager, Sidebar, Toc } from './components/Layout.jsx'
import Overview from './pages/Overview.jsx'
import QuickStart from './pages/QuickStart.jsx'
import LlmMd from './pages/LlmMd.jsx'
import ClaudeDir from './pages/ClaudeDir.jsx'
import DocsDir from './pages/DocsDir.jsx'
import Workflow from './pages/Workflow.jsx'
import Agents from './pages/Agents.jsx'
import Skills from './pages/Skills.jsx'
import Checklist from './pages/Checklist.jsx'

function ScrollTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) return
    window.scrollTo(0, 0)
  }, [pathname, hash])
  return null
}

export default function App() {
  const [menu, setMenu] = useState(false)
  const close = () => setMenu(false)

  return (
    <div className="app">
      <Header onBurger={() => setMenu((v) => !v)} />
      <div className="shell">
        <Sidebar open={menu} onClose={close} />
        {menu && <div className="scrim" onClick={close} />}
        <div className="main">
          <main className="content">
            <ScrollTop />
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/bat-dau-nhanh" element={<QuickStart />} />
              <Route path="/llm-md" element={<LlmMd />} />
              <Route path="/thu-muc-claude" element={<ClaudeDir />} />
              <Route path="/thu-muc-docs" element={<DocsDir />} />
              <Route path="/quy-trinh" element={<Workflow />} />
              <Route path="/agents" element={<Agents />} />
              <Route path="/skills" element={<Skills />} />
              <Route path="/checklist" element={<Checklist />} />
              <Route path="*" element={<Overview />} />
            </Routes>
            <Pager />
          </main>
          <Toc />
        </div>
      </div>
    </div>
  )
}

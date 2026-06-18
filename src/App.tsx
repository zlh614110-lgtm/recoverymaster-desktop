import { useState, useEffect } from 'react'
import './index.css'

interface Tool {
  id: string
  name: string
  description: string
  icon: string
  tokenCost: number
}

const tools: Tool[] = [
  { id: 'image-gen', name: 'AI Image Generation', description: 'Generate HD images from text prompts', icon: '🎨', tokenCost: 500 },
  { id: 'video-edit', name: 'AI Video Editing', description: 'Smart editing, style transfer, auto subtitles', icon: '🎬', tokenCost: 2000 },
  { id: 'doc-analysis', name: 'Document Analysis', description: 'Parse PDF/Word/Excel, extract key info', icon: '📄', tokenCost: 300 },
  { id: 'code-assist', name: 'Code Assistant', description: 'Code completion, bug detection, refactoring', icon: '💻', tokenCost: 200 },
  { id: 'translate', name: 'Translation', description: '100+ languages with context awareness', icon: '🌐', tokenCost: 150 },
  { id: 'speech', name: 'Speech to Text', description: 'High-precision voice recognition', icon: '🎙️', tokenCost: 400 },
  { id: 'data-viz', name: 'Data Visualization', description: 'Auto charts, trend analysis from CSV', icon: '📊', tokenCost: 350 },
  { id: 'more', name: 'More Tools', description: '3D modeling, music, PPT and more', icon: '🧰', tokenCost: 0 },
]

const recentFiles = [
  { name: 'project_proposal.pdf', type: 'PDF', date: '2025-06-18', size: '2.4 MB' },
  { name: 'meeting_recording.mp3', type: 'Audio', date: '2025-06-17', size: '15.8 MB' },
  { name: 'sales_data_q2.csv', type: 'CSV', date: '2025-06-16', size: '856 KB' },
  { name: 'promo_video.mp4', type: 'Video', date: '2025-06-15', size: '128 MB' },
]

function App() {
  const [tokenBalance, setTokenBalance] = useState(0)
  const [activeTab, setActiveTab] = useState<'dashboard' | 'tools' | 'files' | 'settings'>('dashboard')
  const [appVersion, setAppVersion] = useState('1.0.0')
  const [userEmail, setUserEmail] = useState('')

  useEffect(() => {
    // Load from localStorage (same key as web app)
    const auth = localStorage.getItem('rm_auth')
    if (auth) {
      try {
        const parsed = JSON.parse(auth)
        setTokenBalance(parsed.tokenBalance || 0)
        setUserEmail(parsed.userEmail || '')
      } catch { /* ignore */ }
    }

    // Listen for storage changes (sync across windows)
    const onStorage = (e: StorageEvent) => {
      if (e.key === 'rm_auth' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue)
          setTokenBalance(parsed.tokenBalance || 0)
        } catch { /* ignore */ }
      }
    }
    window.addEventListener('storage', onStorage)

    // Get app version from Electron
    if (window.electronAPI) {
      window.electronAPI.getAppVersion().then(setAppVersion)
    }

    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const navItems = [
    { id: 'dashboard' as const, label: 'Dashboard', icon: '◆' },
    { id: 'tools' as const, label: 'AI Tools', icon: '◇' },
    { id: 'files' as const, label: 'My Files', icon: '◈' },
    { id: 'settings' as const, label: 'Settings', icon: '◉' },
  ]

  const openExternal = (url: string) => {
    if (window.electronAPI) {
      window.electronAPI.openExternal(url)
    } else {
      window.open(url, '_blank')
    }
  }

  return (
    <div className="app-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <div className="logo-icon">R</div>
            <span>RecoveryMaster</span>
          </div>
          <div className="version">v{appVersion}</div>
        </div>

        <nav className="sidebar-nav">
          {navItems.map(item => (
            <button
              key={item.id}
              className={`nav-item ${activeTab === item.id ? 'active' : ''}`}
              onClick={() => setActiveTab(item.id)}
            >
              <span className="nav-icon">{item.icon}</span>
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="token-card">
          <div className="token-label">Token Balance</div>
          <div className="token-value">{tokenBalance.toLocaleString()}</div>
          <button
            className="buy-tokens-btn"
            onClick={() => openExternal('https://x5yjdwq2biex2.kimi.app/#/pricing')}
          >
            Buy Tokens
          </button>
        </div>

        <div className="sidebar-footer">
          {userEmail && (
            <div className="user-badge">
              <div className="user-avatar">{userEmail.charAt(0).toUpperCase()}</div>
              <span className="user-email">{userEmail}</span>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Dashboard */}
        {activeTab === 'dashboard' && (
          <div className="page">
            <header className="page-header">
              <h1>Dashboard</h1>
              <p className="subtitle">Welcome back{userEmail ? `, ${userEmail.split('@')[0]}` : ''}. Ready to create?</p>
            </header>

            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-icon">🎨</div>
                <div>
                  <div className="stat-value">1,240</div>
                  <div className="stat-label">Images Generated</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">📄</div>
                <div>
                  <div className="stat-value">86</div>
                  <div className="stat-label">Documents Analyzed</div>
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-icon">⏱️</div>
                <div>
                  <div className="stat-value">3.2s</div>
                  <div className="stat-label">Avg. Processing</div>
                </div>
              </div>
            </div>

            <section className="section">
              <h2>Quick Access</h2>
              <div className="tools-grid">
                {tools.slice(0, 6).map(tool => (
                  <button key={tool.id} className="tool-card">
                    <span className="tool-icon">{tool.icon}</span>
                    <div className="tool-name">{tool.name}</div>
                    <div className="tool-desc">{tool.description}</div>
                    <div className="tool-cost">{tool.tokenCost.toLocaleString()} Tokens</div>
                  </button>
                ))}
              </div>
            </section>

            <section className="section">
              <h2>Recent Files</h2>
              <div className="file-list">
                {recentFiles.map((file, i) => (
                  <div key={i} className="file-item">
                    <div className="file-info">
                      <span className="file-name">{file.name}</span>
                      <span className="file-meta">{file.type} &middot; {file.size} &middot; {file.date}</span>
                    </div>
                    <button className="file-action">Open</button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {/* AI Tools */}
        {activeTab === 'tools' && (
          <div className="page">
            <header className="page-header">
              <h1>AI Tools</h1>
              <p className="subtitle">All {tools.length} AI-powered creation tools. Select one to begin.</p>
            </header>
            <div className="tools-grid full">
              {tools.map(tool => (
                <button key={tool.id} className="tool-card large">
                  <span className="tool-icon large">{tool.icon}</span>
                  <div className="tool-name">{tool.name}</div>
                  <div className="tool-desc">{tool.description}</div>
                  <div className="tool-cost">{tool.tokenCost > 0 ? `${tool.tokenCost.toLocaleString()} Tokens` : 'Coming Soon'}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* My Files */}
        {activeTab === 'files' && (
          <div className="page">
            <header className="page-header">
              <h1>My Files</h1>
              <p className="subtitle">Manage your local files. Drag and drop to upload.</p>
            </header>
            <div className="drop-zone">
              <div className="drop-icon">📁</div>
              <p>Drag files here or click to browse</p>
              <button className="browse-btn">Browse Files</button>
            </div>
            <div className="file-list">
              {recentFiles.map((file, i) => (
                <div key={i} className="file-item">
                  <div className="file-info">
                    <span className="file-name">{file.name}</span>
                    <span className="file-meta">{file.type} &middot; {file.size} &middot; {file.date}</span>
                  </div>
                  <div className="file-actions">
                    <button className="file-action">Open</button>
                    <button className="file-action secondary">Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Settings */}
        {activeTab === 'settings' && (
          <div className="page">
            <header className="page-header">
              <h1>Settings</h1>
              <p className="subtitle">Configure your RecoveryMaster experience.</p>
            </header>
            <div className="settings-list">
              <div className="setting-item">
                <div>
                  <div className="setting-name">Account</div>
                  <div className="setting-desc">{userEmail || 'Not signed in'}</div>
                </div>
                <button
                  className="setting-action"
                  onClick={() => openExternal('https://x5yjdwq2biex2.kimi.app/#/account')}
                >
                  Manage
                </button>
              </div>
              <div className="setting-item">
                <div>
                  <div className="setting-name">Theme</div>
                  <div className="setting-desc">Light / Dark mode</div>
                </div>
                <span className="setting-badge">Auto</span>
              </div>
              <div className="setting-item">
                <div>
                  <div className="setting-name">Auto Update</div>
                  <div className="setting-desc">Automatically download and install updates</div>
                </div>
                <span className="setting-badge enabled">Enabled</span>
              </div>
              <div className="setting-item">
                <div>
                  <div className="setting-name">Version</div>
                  <div className="setting-desc">RecoveryMaster Desktop v{appVersion}</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  )
}

export default App

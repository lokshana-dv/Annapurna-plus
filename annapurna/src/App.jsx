import React from 'react'
import { useApp } from './context/AppContext'
import { ToastContainer, Modal } from './components/UI'
import LoginPage from './pages/LoginPage'
import Dashboard from './pages/Dashboard'
import { DonatePage, RequestPage, TrackingPage } from './pages/FoodPages'
import { VolunteerPage, RoutingPage, LeaderboardPage } from './pages/VolunteerPages'
import { AnalyticsPage, MapPage, ProfilePage, AdminPage, FeedbackPage, NotificationsPage } from './pages/OtherPages'

const PAGE_MAP = {
  dashboard:     <Dashboard />,
  donate:        <DonatePage />,
  request:       <RequestPage />,
  tracking:      <TrackingPage />,
  volunteer:     <VolunteerPage />,
  routing:       <RoutingPage />,
  leaderboard:   <LeaderboardPage />,
  analytics:     <AnalyticsPage />,
  map:           <MapPage />,
  profile:       <ProfilePage />,
  admin:         <AdminPage />,
  feedback:      <FeedbackPage />,
  notifications: <NotificationsPage />,
}

const NAV_SECTIONS = [
  {
    label: 'Main',
    items: [
      { page:'dashboard',     icon:'📊', label:'Dashboard' },
      { page:'donate',        icon:'🍽️', label:'Donate Food' },
      { page:'request',       icon:'🙏', label:'Request Food' },
      { page:'tracking',      icon:'🔍', label:'Track Donation' },
    ]
  },
  {
    label: 'Volunteer',
    items: [
      { page:'volunteer',     icon:'🚴', label:'Deliveries', badge:3 },
      { page:'routing',       icon:'🗺️', label:'Route Engine' },
      { page:'leaderboard',   icon:'🏆', label:'Leaderboard' },
    ]
  },
  {
    label: 'Analytics',
    items: [
      { page:'analytics',     icon:'📈', label:'Impact Analytics' },
      { page:'map',           icon:'🗾', label:'Live Map' },
    ]
  },
  {
    label: 'Account',
    items: [
      { page:'profile',       icon:'👤', label:'My Profile' },
      { page:'admin',         icon:'🛡️', label:'Admin Panel' },
      { page:'feedback',      icon:'⭐', label:'Feedback' },
      { page:'notifications', icon:'🔔', label:'Notifications' },
    ]
  },
]

function Sidebar() {
  const { currentPage, navigate, sidebarOpen, state } = useApp()
  const unread = state.notifications.filter(n=>n.unread).length

  return (
    <div style={{
      width:230, background:'var(--surface)', borderRight:'1px solid var(--border)',
      display:'flex', flexDirection:'column', padding:'12px 8px',
      overflowY:'auto', flexShrink:0, transition:'transform .3s ease',
      position: window.innerWidth < 700 ? 'fixed' : 'relative',
      left: window.innerWidth < 700 ? (sidebarOpen?0:-230) : 'auto',
      top: window.innerWidth < 700 ? 60 : 'auto',
      bottom: window.innerWidth < 700 ? 0 : 'auto',
      zIndex: window.innerWidth < 700 ? 200 : 'auto',
    }}>
      {NAV_SECTIONS.map(section => (
        <div key={section.label} style={{ marginBottom:6 }}>
          <div className="sidebar-label">{section.label}</div>
          {section.items.map(item => (
            <div key={item.page}
              className={`nav-item ${currentPage === item.page ? 'active' : ''}`}
              onClick={() => navigate(item.page)}>
              <span style={{ fontSize:16, width:20, textAlign:'center' }}>{item.icon}</span>
              {item.label}
              {item.badge && <span className="nav-badge">{item.page==='notifications'?unread:item.badge}</span>}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

function Topbar() {
  const { state, navigate, logout, notifOpen, setNotifOpen, markAllRead } = useApp()
  const { setSidebarOpen } = useApp()
  const unread = state.notifications.filter(n=>n.unread).length
  const u = state.user

  return (
    <div style={{
      height:60, background:'var(--surface)', borderBottom:'1px solid var(--border)',
      display:'flex', alignItems:'center', justifyContent:'space-between',
      padding:'0 20px', position:'sticky', top:0, zIndex:100,
    }}>
      <div style={{ display:'flex', alignItems:'center', gap:14 }}>
        <button onClick={() => setSidebarOpen(o=>!o)}
          style={{ background:'none', border:'none', color:'var(--text)', fontSize:22, cursor:'pointer', display:'none' }}
          className="hamburger-btn">☰</button>
        <div style={{ fontFamily:'Sora,sans-serif', fontWeight:800, fontSize:17 }}>
          ANNAPURNA<span style={{ color:'var(--green)' }}>+</span>
        </div>
        <span className="badge badge-green">
          <span className="pulse-dot" /> Live
        </span>
      </div>

      <div style={{ display:'flex', alignItems:'center', gap:12 }}>
        {/* Notification button */}
        <div style={{ position:'relative' }}>
          <button className="btn btn-ghost btn-sm" onClick={() => setNotifOpen(o=>!o)}
            style={{ position:'relative', fontSize:18 }}>🔔
            {unread > 0 && (
              <div style={{ position:'absolute', top:2, right:2, width:8, height:8, background:'var(--red)', borderRadius:'50%', border:'2px solid var(--surface)' }} />
            )}
          </button>
          {notifOpen && (
            <div style={{
              position:'absolute', top:42, right:0, width:340, background:'var(--surface)',
              border:'1px solid var(--border)', borderRadius:'var(--radius)', boxShadow:'var(--shadow)',
              zIndex:500, animation:'modalIn .2s ease',
            }}>
              <div style={{ padding:'14px 16px', borderBottom:'1px solid var(--border)', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontWeight:700, fontSize:14 }}>Notifications</span>
                <button className="btn btn-ghost btn-sm" onClick={markAllRead}>Mark all read</button>
              </div>
              <div style={{ maxHeight:360, overflowY:'auto' }}>
                {state.notifications.map(n=>(
                  <div key={n.id} style={{
                    padding:'12px 16px', borderBottom:'1px solid var(--border)',
                    display:'flex', gap:10, cursor:'pointer',
                    background: n.unread?'rgba(61,220,132,.04)':'transparent',
                  }}>
                    <span style={{ fontSize:18 }}>{n.icon}</span>
                    <div>
                      <div style={{ fontSize:12, lineHeight:1.5 }}>{n.text}</div>
                      <div style={{ fontSize:10, color:'var(--text-muted)', marginTop:3 }}>{n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User chip */}
        <div onClick={() => navigate('profile')} style={{
          display:'flex', alignItems:'center', gap:8,
          background:'var(--surface2)', border:'1px solid var(--border)',
          borderRadius:99, padding:'5px 14px 5px 5px', cursor:'pointer',
          transition:'border-color var(--transition)',
        }} onMouseEnter={e=>e.currentTarget.style.borderColor='var(--green)'}
           onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}>
          <div style={{ width:30, height:30, borderRadius:'50%', background:'var(--green)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:13, fontWeight:700, color:'#0a0f0d' }}>
            {u.avatar}
          </div>
          <div>
            <div style={{ fontSize:13, fontWeight:600 }}>{u.name.split(' ')[0]} {u.name.split(' ')[1]?.[0]}.</div>
            <div style={{ fontSize:10, color:'var(--text-dim)' }}>{u.role}</div>
          </div>
        </div>

        <button className="btn btn-ghost btn-sm" onClick={logout} title="Logout">⏻</button>
      </div>
    </div>
  )
}

export default function App() {
  const { isLoggedIn, currentPage, notifOpen, setNotifOpen } = useApp()

  function handleBackdropClick() {
    if (notifOpen) setNotifOpen(false)
  }

  return (
    <>
      {!isLoggedIn ? (
        <LoginPage />
      ) : (
        <div style={{ display:'flex', flexDirection:'column', height:'100vh' }} onClick={handleBackdropClick}>
          <Topbar />
          <div style={{ display:'flex', flex:1, overflow:'hidden' }}>
            <Sidebar />
            <div style={{ flex:1, overflowY:'auto', padding:24 }}>
              {PAGE_MAP[currentPage] || <div style={{ textAlign:'center', padding:48, color:'var(--text-dim)' }}>🚧 Page coming soon</div>}
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
      <Modal />
    </>
  )
}

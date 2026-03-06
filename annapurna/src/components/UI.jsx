import React, { useEffect } from 'react'
import { useApp } from '../context/AppContext'

/* ─── STATUS BADGE ─── */
export function StatusBadge({ status }) {
  const map = {
    pending:    ['badge-amber','⏳ Pending'],
    accepted:   ['badge-blue', '✓ Accepted'],
    'in-transit':['badge-blue','🚴 In Transit'],
    delivered:  ['badge-green','✅ Delivered'],
    cancelled:  ['badge-red',  '✕ Cancelled'],
  }
  const [cls, label] = map[status] || ['badge-amber', status]
  return <span className={`badge ${cls}`}>{label}</span>
}

/* ─── KPI CARD ─── */
export function KpiCard({ label, value, icon, bgIcon, change, changeUp, barPct, barColor, prefix='' }) {
  const bgMap = {
    green: 'rgba(61,220,132,0.15)',
    amber: 'rgba(245,166,35,0.15)',
    blue:  'rgba(90,180,255,0.12)',
    red:   'rgba(255,90,90,0.12)',
  }
  const numColor = { green:'var(--green)', amber:'var(--amber)', blue:'var(--blue)', red:'var(--red)' }
  return (
    <div className="kpi-card">
      <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <div>
          <div className="text-dim text-xs" style={{ textTransform:'uppercase', fontWeight:700, letterSpacing:'.06em', marginBottom:4 }}>{label}</div>
          <div className="kpi-num" style={{ color: numColor[bgIcon] || 'var(--green)' }}>{prefix}{value}</div>
        </div>
        <div className="kpi-icon" style={{ background: bgMap[bgIcon] || bgMap.green }}>
          <span style={{ fontSize:18 }}>{icon}</span>
        </div>
      </div>
      {change && (
        <div style={{ fontSize:11, fontWeight:600, color: changeUp ? 'var(--green)' : 'var(--red)' }}>
          {changeUp ? '↑' : '↓'} {change}
        </div>
      )}
      {barPct !== undefined && (
        <div className="progress-wrap" style={{ marginTop:4 }}>
          <div className={`progress-bar prog-${barColor || bgIcon}`} style={{ width:`${barPct}%` }} />
        </div>
      )}
    </div>
  )
}

/* ─── TOAST CONTAINER ─── */
export function ToastContainer() {
  const { toasts } = useApp()
  const icons = { success:'✅', error:'❌', info:'ℹ️' }
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast-${t.type}`}>
          <span>{icons[t.type]}</span>
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  )
}

/* ─── MODAL ─── */
export function Modal() {
  const { modal, closeModal } = useApp()
  if (!modal) return null
  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && closeModal()}>
      <div className="modal">
        <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:20 }}>
          <h3 style={{ fontSize:18, fontWeight:700 }}>{modal.title}</h3>
          <button onClick={closeModal} style={{ background:'none', border:'none', color:'var(--text-dim)', cursor:'pointer', fontSize:20 }}>✕</button>
        </div>
        {modal.content}
      </div>
    </div>
  )
}

/* ─── PROGRESS BAR ─── */
export function ProgressRow({ label, pct, color, right }) {
  return (
    <div style={{ marginBottom:14 }}>
      <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, marginBottom:4 }}>
        <span>{label}</span>
        <span style={{ fontWeight:600 }}>{right || `${pct}%`}</span>
      </div>
      <div className="progress-wrap">
        <div className={`progress-bar prog-${color}`} style={{ width:`${pct}%` }} />
      </div>
    </div>
  )
}

/* ─── MAP DOTS ─── */
export function MapPlaceholder({ height = 300 }) {
  const dots = [
    { top:'25%', left:'40%', size:12, color:'var(--green)', delay:0 },
    { top:'60%', left:'65%', size:12, color:'var(--green)', delay:.3 },
    { top:'35%', left:'70%', size:10, color:'var(--amber)', delay:.6 },
    { top:'70%', left:'30%', size:8,  color:'var(--red)',   delay:.9 },
    { top:'45%', left:'55%', size:12, color:'var(--green)', delay:1.2 },
    { top:'20%', left:'80%', size:10, color:'var(--amber)', delay:.2 },
    { top:'80%', left:'50%', size:12, color:'var(--green)', delay:.8 },
    { top:'50%', left:'20%', size:8,  color:'var(--red)',   delay:.4 },
  ]
  return (
    <div className="map-placeholder" style={{ height }}>
      {dots.map((d,i) => (
        <div key={i} className="map-dot" style={{
          top:d.top, left:d.left, width:d.size, height:d.size,
          background:d.color, animationDelay:`${d.delay}s`
        }} />
      ))}
      <div style={{ textAlign:'center', zIndex:1 }}>
        <div style={{ fontSize:32, marginBottom:8 }}>🗺️</div>
        <div style={{ fontSize:14, fontWeight:600, color:'var(--text-dim)' }}>Interactive Live Map</div>
        <div style={{ fontSize:12, color:'var(--text-muted)', marginTop:4 }}>Showing donations · volunteers · NGOs</div>
        <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:6 }}>Add Google Maps API key to enable full map</div>
      </div>
    </div>
  )
}

/* ─── DATA TABLE WRAPPER ─── */
export function TableWrap({ children }) {
  return (
    <div style={{ background:'var(--surface)', border:'1px solid var(--border)', borderRadius:'var(--radius)', overflow:'hidden' }}>
      {children}
    </div>
  )
}

/* ─── STAR RATING ─── */
export function StarRating({ value, onChange }) {
  return (
    <div style={{ display:'flex', gap:4 }}>
      {[1,2,3,4,5].map(i => (
        <span key={i} className={`star ${i <= value ? 'filled' : ''}`} onClick={() => onChange?.(i)}>★</span>
      ))}
    </div>
  )
}

/* ─── ACTIVITY ITEM ─── */
export function ActivityItem({ icon, bg, text, time }) {
  return (
    <div style={{ display:'flex', alignItems:'flex-start', gap:12, padding:'12px 0', borderBottom:'1px solid var(--border)' }}>
      <div style={{ width:32, height:32, borderRadius:8, background:bg, display:'flex', alignItems:'center', justifyContent:'center', fontSize:14, flexShrink:0 }}>{icon}</div>
      <div>
        <div style={{ fontSize:13, lineHeight:1.5 }} dangerouslySetInnerHTML={{ __html: text }} />
        <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:2 }}>{time}</div>
      </div>
    </div>
  )
}

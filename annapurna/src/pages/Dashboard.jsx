import React from 'react'
import { useApp } from '../context/AppContext'
import { KpiCard, StatusBadge, ActivityItem, ProgressRow, MapPlaceholder } from '../components/UI'

export default function Dashboard() {
  const { state, navigate, openModal, toast } = useApp()

  function showDetail(d) {
    openModal(`Donation ${d.id}`, (
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {[
          ['Food', d.food], ['Donor', d.donor], ['Location', d.location],
          ['Matched To', d.matched], ['Volunteer', d.vol], ['Expiry', d.expiry],
          ['Posted', d.time],
        ].map(([l,v]) => (
          <div key={l} style={{ display:'flex', justifyContent:'space-between', fontSize:14 }}>
            <span style={{ color:'var(--text-dim)' }}>{l}</span>
            <span style={{ fontWeight:600 }}>{v}</span>
          </div>
        ))}
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:14 }}>
          <span style={{ color:'var(--text-dim)' }}>Status</span>
          <StatusBadge status={d.status} />
        </div>
        <div className="divider" />
        <button className="btn btn-primary w-full" onClick={() => { navigate('tracking'); }}>
          Track This Donation
        </button>
      </div>
    ))
  }

  const activities = [
    { icon:'🟢', bg:'var(--green-glow)', text:'<strong>Hotel Spice Garden</strong> donated 10kg Biryani', time:'2 min ago' },
    { icon:'🚴', bg:'var(--blue-dim)',   text:'<strong>Ravi Kumar</strong> accepted delivery to Asha NGO', time:'8 min ago' },
    { icon:'✅', bg:'var(--green-glow)', text:'<strong>Donation #D001</strong> delivered to 65 beneficiaries', time:'45 min ago' },
    { icon:'⚠️', bg:'var(--red-dim)',    text:'<strong>Alert:</strong> Donation #D004 expiring in 1hr', time:'1 hr ago' },
    { icon:'🏆', bg:'var(--amber-dim)',  text:'<strong>Meena Latha</strong> crossed 500 delivery points!', time:'2 hrs ago' },
  ]

  const categories = [
    { label:'Human Consumption', pct:68, color:'green', icon:'🍽️' },
    { label:'Animal Feed',        pct:18, color:'amber', icon:'🐄' },
    { label:'Cattle Feed',        pct:9,  color:'blue',  icon:'🌾' },
    { label:'Composting/Biogas',  pct:5,  color:'red',   icon:'♻️' },
  ]

  return (
    <div>
      <div className="page-header">
        <h2>Good morning, {state.user.name.split(' ')[0]} 👋</h2>
        <p>Live food rescue status across your network.</p>
      </div>

      {/* KPIs */}
      <div className="grid-4" style={{ marginBottom:20 }}>
        <KpiCard label="Meals Rescued Today" value="284" icon="🍽️" bgIcon="green" change="18% vs yesterday" changeUp barPct={71} />
        <KpiCard label="Active Volunteers"    value="47"  icon="🚴" bgIcon="blue"  change="5 online now"      changeUp barPct={62} />
        <KpiCard label="Food Saved (kg)"      value="1,240" icon="📦" bgIcon="amber" change="12% this week"   changeUp barPct={84} />
        <KpiCard label="Urgent Donations"     value="6"   icon="⚡" bgIcon="red"   change="3 expiring soon"   changeUp={false} barPct={30} />
      </div>

      {/* Mid row */}
      <div className="grid-2" style={{ marginBottom:20 }}>
        {/* Recent Donations */}
        <div className="card">
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:16 }}>
            <div className="section-title" style={{ marginBottom:0 }}>Recent Donations</div>
            <button className="btn btn-outline btn-sm" onClick={() => navigate('donate')}>+ New</button>
          </div>
          <table className="data-table">
            <thead>
              <tr><th>ID</th><th>Food</th><th>Status</th><th>Expiry</th></tr>
            </thead>
            <tbody>
              {state.donations.map(d => (
                <tr key={d.id} onClick={() => showDetail(d)}>
                  <td><span className="chip">{d.id}</span></td>
                  <td style={{ maxWidth:130, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{d.food}</td>
                  <td><StatusBadge status={d.status} /></td>
                  <td><span style={{ color: d.urgency==='high'?'var(--red)':d.urgency==='medium'?'var(--amber)':'var(--green)', fontWeight:600, fontSize:13 }}>{d.expiry}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Activity Feed */}
        <div className="card">
          <div className="section-title">Live Activity Feed</div>
          {activities.map((a,i) => <ActivityItem key={i} {...a} />)}
        </div>
      </div>

      {/* Bottom row */}
      <div className="grid-3">
        {/* Categories */}
        <div className="card">
          <div className="section-title">Food Categories</div>
          {categories.map(c => (
            <ProgressRow key={c.label} label={`${c.icon} ${c.label}`} pct={c.pct} color={c.color} />
          ))}
        </div>

        {/* Top Volunteers */}
        <div className="card">
          <div className="section-title">Top Volunteers</div>
          {state.volunteers.slice(0,4).map((v,i) => (
            <div key={v.name} className="lb-row">
              <div className={`lb-rank ${i===0?'gold':i===1?'silver':i===2?'bronze':''}`}>{i+1}</div>
              <div className="lb-avatar" style={{ background:v.color }}>{v.name[0]}</div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:600 }}>{v.name}</div>
                <div style={{ fontSize:11, color:'var(--text-dim)' }}>{v.deliveries} deliveries · ⭐ {v.rating}</div>
              </div>
              <span className={`badge ${v.status==='active'?'badge-green':'badge-amber'}`}>{v.status}</span>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="card">
          <div className="section-title">Quick Actions</div>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {[
              ['🍽️ Donate Food Now', 'donate', 'btn-primary'],
              ['🙏 Request Food',    'request', 'btn-outline'],
              ['🚴 View Deliveries', 'volunteer','btn-outline'],
              ['🔍 Track Donation',  'tracking', 'btn-outline'],
              ['🗺️ Routing Engine',  'routing',  'btn-outline'],
            ].map(([label, page, cls]) => (
              <button key={page} className={`btn ${cls} w-full`} onClick={() => navigate(page)}>{label}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

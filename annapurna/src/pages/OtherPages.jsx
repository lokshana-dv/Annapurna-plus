import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { KpiCard, ProgressRow, StarRating, StatusBadge, MapPlaceholder } from '../components/UI'

/* ══════════════════════════════════
   ANALYTICS PAGE
══════════════════════════════════ */
export function AnalyticsPage() {
  const bars = [60,85,70,110,95,120,100]
  const days = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun']
  const max = Math.max(...bars)

  const heatData = Array.from({length:35},()=>Math.random())

  return (
    <div>
      <div className="page-header">
        <h2>📈 Impact Analytics</h2>
        <p>Comprehensive metrics tracking social and environmental impact.</p>
      </div>

      <div className="grid-4" style={{ marginBottom:20 }}>
        <KpiCard label="Total Meals Served" value="12,847" icon="🍽️" bgIcon="green" change="23% this month" changeUp />
        <KpiCard label="Food Saved (kg)"    value="4,280"  icon="📦" bgIcon="amber" change="18% this month" changeUp />
        <KpiCard label="CO₂ Prevented (kg)" value="4,200"  icon="🌱" bgIcon="blue"  change="Emissions avoided" changeUp />
        <KpiCard label="Cities Covered"     value="12"     icon="🏙️" bgIcon="green" change="3 new this month" changeUp />
      </div>

      <div className="grid-2" style={{ marginBottom:20 }}>
        {/* Bar Chart */}
        <div className="card">
          <div className="section-title">Weekly Donations (kg)</div>
          <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
            <div className="bar-chart">
              {bars.map((h,i) => (
                <div key={i} className="bar" style={{
                  height:`${(h/max*100)}%`,
                  background: i===5?'var(--green)':'var(--border)',
                  opacity: i===5?1:0.6,
                }} />
              ))}
            </div>
            <div className="bar-labels">
              {days.map(d => <div key={d} className="bar-label">{d}</div>)}
            </div>
          </div>
          <div style={{ fontSize:11, color:'var(--text-dim)', marginTop:8 }}>Peak: Saturday (120 kg)</div>
        </div>

        {/* Heatmap */}
        <div className="card">
          <div className="section-title">Monthly Heatmap (Donations)</div>
          <div className="heatmap-grid">
            {heatData.map((v,i) => (
              <div key={i} className="heatmap-cell"
                style={{ background:`rgba(61,220,132,${(0.1+v*0.9).toFixed(2)})` }}
                title={`${Math.floor(v*50)} donations`} />
            ))}
          </div>
          <div style={{ display:'flex', alignItems:'center', gap:8, marginTop:10 }}>
            <span style={{ fontSize:11, color:'var(--text-dim)' }}>Low</span>
            {[0.1,0.3,0.5,0.7,0.9].map(a=>(
              <div key={a} style={{ width:14,height:14,borderRadius:3,background:`rgba(61,220,132,${a})` }} />
            ))}
            <span style={{ fontSize:11, color:'var(--text-dim)' }}>High</span>
          </div>
        </div>
      </div>

      <div className="grid-3">
        <div className="card">
          <div className="section-title">By Food Category</div>
          {[
            { label:'Human Consumption', pct:68, color:'green', right:'8,738 meals' },
            { label:'Animal Feed',        pct:18, color:'amber', right:'2,312 meals' },
            { label:'Cattle Feed',        pct:9,  color:'blue',  right:'1,156 meals' },
            { label:'Composting',         pct:5,  color:'red',   right:'641 meals'   },
          ].map(c=><ProgressRow key={c.label} {...c} />)}
        </div>

        <div className="card">
          <div className="section-title">Top Donor Organizations</div>
          {[
            ['Hotel Spice Garden','340 kg',1],
            ['Raj Caterers','280 kg',2],
            ['Green Leaf Hotel','210 kg',3],
            ['Bakery Fresh','140 kg',4],
            ['Individual Donors','95 kg',5],
          ].map(([n,kg,r])=>(
            <div key={n} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10, fontSize:13 }}>
              <span>{r}. {n}</span>
              <span style={{ fontWeight:600, color:'var(--green)' }}>{kg}</span>
            </div>
          ))}
        </div>

        <div className="card">
          <div className="section-title">Key Performance</div>
          {[
            ['Delivery Success Rate','96.4%','green'],
            ['Avg Pickup Time','14 min','blue'],
            ['Food Utilization Rate','98.2%','green'],
            ['Volunteer Retention','89%','amber'],
            ['NGO Satisfaction','4.8/5','green'],
            ['Waste Reduction','68%','green'],
          ].map(([l,v,c])=>(
            <div key={l} style={{ display:'flex', justifyContent:'space-between', marginBottom:10, fontSize:13 }}>
              <span style={{ color:'var(--text-dim)' }}>{l}</span>
              <span style={{ fontWeight:700, color:`var(--${c})` }}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════
   MAP PAGE
══════════════════════════════════ */
export function MapPage() {
  const { state, toast } = useApp()
  return (
    <div>
      <div className="page-header">
        <h2>🗾 Live Donation Map</h2>
        <p>Real-time geographic visualization of food donations, volunteers, and NGOs.</p>
      </div>
      <div className="card" style={{ marginBottom:16 }}>
        <div style={{ display:'flex', gap:10, marginBottom:14, flexWrap:'wrap' }}>
          {[`🟢 Donations (${state.donations.length})`, '🔵 Volunteers (12)','🟡 NGOs (8)','🔴 Urgent (3)'].map(c=>(
            <span key={c} className="chip">{c}</span>
          ))}
          <button className="btn btn-outline btn-sm" onClick={()=>toast('Map refreshed','success')}>🔄 Refresh</button>
        </div>
        <MapPlaceholder height={320} />
      </div>
      <div className="grid-3">
        <div className="card">
          <div className="section-title">Donation Zones</div>
          {[['Koramangala',8,'high'],['Indiranagar',5,'medium'],['HSR Layout',4,'high'],['Whitefield',3,'low'],['JP Nagar',2,'medium']].map(([z,c,u])=>(
            <div key={z} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:10 }}>
              <span style={{ fontSize:13 }}>📍 {z}</span>
              <div style={{ display:'flex', gap:8, alignItems:'center' }}>
                <span style={{ fontSize:13, fontWeight:600 }}>{c}</span>
                <span className={`badge ${u==='high'?'badge-red':u==='medium'?'badge-amber':'badge-green'}`}>{u}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="section-title">Active Volunteers (GPS)</div>
          {state.volunteers.filter(v=>v.status==='active').map(v=>(
            <div key={v.name} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:14 }}>
              <div style={{ display:'flex', gap:10, alignItems:'center' }}>
                <div className="lb-avatar" style={{ background:v.color, width:30, height:30, fontSize:13 }}>{v.name[0]}</div>
                <div>
                  <div style={{ fontSize:13, fontWeight:600 }}>{v.name}</div>
                  <div style={{ fontSize:11, color:'var(--text-dim)' }}><span className="pulse-dot" /> Live tracking</div>
                </div>
              </div>
              <span className="badge badge-green">active</span>
            </div>
          ))}
        </div>
        <div className="card">
          <div className="section-title">Registered NGOs</div>
          {[['Asha NGO','Koramangala',100],['Hope Foundation','Indiranagar',60],['Street Connect','JP Nagar',40],['Sneha Home','Marathahalli',80]].map(([n,l,c])=>(
            <div key={n} style={{ marginBottom:14 }}>
              <div style={{ fontSize:13, fontWeight:600 }}>{n}</div>
              <div style={{ fontSize:12, color:'var(--text-dim)' }}>{l} · Capacity: {c}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════
   PROFILE PAGE
══════════════════════════════════ */
export function ProfilePage() {
  const { state, logout, toast } = useApp()
  const u = state.user

  return (
    <div>
      <div className="page-header">
        <h2>👤 My Profile</h2>
        <p>Manage your ANNAPURNA+ account details.</p>
      </div>
      <div className="grid-2">
        <div>
          <div className="card" style={{ textAlign:'center', padding:32, marginBottom:16 }}>
            <div style={{ width:80,height:80,borderRadius:'50%',background:'var(--green)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:32,fontWeight:800,color:'#0a0f0d',margin:'0 auto 16px' }}>{u.avatar}</div>
            <div style={{ fontSize:20,fontWeight:700 }}>{u.name}</div>
            <div style={{ fontSize:13,color:'var(--text-dim)',marginTop:4 }}>{u.email}</div>
            <div style={{ display:'flex',gap:8,justifyContent:'center',marginTop:12 }}>
              <span className="badge badge-green">{u.role}</span>
              <span className="badge badge-blue">✅ Verified</span>
            </div>
            <button className="btn btn-outline btn-sm" style={{ marginTop:16 }} onClick={()=>toast('Photo upload coming soon','info')}>📸 Change Photo</button>
          </div>

          <div className="card" style={{ marginBottom:16 }}>
            <div className="section-title">My Impact Stats</div>
            <div className="grid-2" style={{ gap:12 }}>
              {[['24','Donations Made','green'],['1,280','Meals Contributed','amber'],['342','Points Earned','blue'],['3','Badges Won','green']].map(([n,l,c])=>(
                <div key={l} style={{ textAlign:'center' }}>
                  <div style={{ fontSize:36,fontWeight:800,color:`var(--${c})`,fontFamily:'Sora,sans-serif' }}>{n}</div>
                  <div style={{ fontSize:11,color:'var(--text-dim)',marginTop:4 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="section-title">My Badges</div>
            <div style={{ display:'flex',gap:8,flexWrap:'wrap' }}>
              {['🌿 First Rescue','🔟 Ten Donations','🌟 Food Hero'].map(b=><span key={b} className="chip">{b}</span>)}
            </div>
          </div>
        </div>

        <div>
          <div className="card" style={{ marginBottom:16 }}>
            <div className="form-section-title">Edit Profile</div>
            <div style={{ display:'flex',flexDirection:'column',gap:14 }}>
              <div className="grid-2" style={{ gap:12 }}>
                <div className="input-group"><label>First Name</label><input className="input" defaultValue="Priya" /></div>
                <div className="input-group"><label>Last Name</label><input className="input" defaultValue="Sharma" /></div>
              </div>
              <div className="input-group"><label>Email</label><input className="input" type="email" defaultValue={u.email} /></div>
              <div className="input-group"><label>Phone</label><input className="input" defaultValue="+91 98765 43210" /></div>
              <div className="input-group"><label>City</label><input className="input" defaultValue={u.city} /></div>
              <div className="input-group"><label>Address</label><textarea className="input" defaultValue="123, 5th Cross, Koramangala, Bangalore - 560034" /></div>
              <div className="input-group">
                <label>Role</label>
                <select className="input"><option>Food Donor</option><option>Volunteer</option><option>NGO</option></select>
              </div>
              <button className="btn btn-primary" onClick={()=>toast('Profile updated successfully!','success')}>Save Changes</button>
            </div>
          </div>

          <div className="card">
            <div className="form-section-title">Security</div>
            <div style={{ display:'flex',flexDirection:'column',gap:12 }}>
              <div className="input-group"><label>Current Password</label><input className="input" type="password" placeholder="••••••••" /></div>
              <div className="input-group"><label>New Password</label><input className="input" type="password" placeholder="Min 8 characters" /></div>
              <div className="input-group"><label>Confirm New Password</label><input className="input" type="password" placeholder="Re-enter" /></div>
              <button className="btn btn-outline" onClick={()=>toast('Password changed!','success')}>Update Password</button>
              <div className="divider" />
              <button className="btn btn-danger" onClick={logout}>⏻ Logout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════
   ADMIN PAGE
══════════════════════════════════ */
export function AdminPage() {
  const { state, toast } = useApp()

  return (
    <div>
      <div className="page-header">
        <h2>🛡️ Admin Dashboard</h2>
        <p>System management, user verification, and platform oversight.</p>
      </div>

      <div className="grid-4" style={{ marginBottom:20 }}>
        <KpiCard label="Total Users"          value="1,284" icon="👥" bgIcon="green" />
        <KpiCard label="Pending Verifications" value="14"   icon="⏳" bgIcon="amber" />
        <KpiCard label="Active Donations"      value="47"   icon="🍽️" bgIcon="blue" />
        <KpiCard label="Flagged Reports"       value="3"    icon="🚩" bgIcon="red" />
      </div>

      <div className="grid-2" style={{ marginBottom:20 }}>
        <div className="card">
          <div className="section-title">User Management</div>
          <div style={{ display:'flex',gap:10,marginBottom:14 }}>
            <input className="input" placeholder="Search users..." style={{ flex:1 }} />
            <select className="input" style={{ width:'auto' }}><option>All Roles</option><option>Donors</option><option>Volunteers</option><option>NGOs</option></select>
          </div>
          <table className="data-table">
            <thead><tr><th>Name</th><th>Role</th><th>Status</th><th>Action</th></tr></thead>
            <tbody>
              {[
                ['Priya Sharma','Donor','verified'],
                ['Ravi Kumar','Volunteer','verified'],
                ['Asha NGO','NGO','pending'],
                ['Meena Latha','Volunteer','verified'],
                ['New Restaurant','Donor','pending'],
              ].map(([name,role,status])=>(
                <tr key={name}>
                  <td style={{ fontWeight:600,fontSize:13 }}>{name}</td>
                  <td><span className={`badge ${role==='Donor'?'badge-green':role==='Volunteer'?'badge-blue':'badge-purple'}`}>{role}</span></td>
                  <td><span className={`badge ${status==='verified'?'badge-green':'badge-amber'}`}>{status}</span></td>
                  <td>{status==='pending'
                    ? <button className="btn btn-primary btn-sm" onClick={()=>toast(`${name} verified!`,'success')}>Verify</button>
                    : <button className="btn btn-ghost btn-sm" onClick={()=>toast(`Viewing ${name}`,'info')}>View</button>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div>
          <div className="card" style={{ marginBottom:16 }}>
            <div className="section-title">System Health</div>
            {[
              ['API Response Time','142ms','good'],
              ['Database','Healthy','good'],
              ['Notification Service','Active','good'],
              ['GPS Tracking','Active','good'],
              ['Payment Gateway','Degraded','warn'],
            ].map(([l,v,s])=>(
              <div key={l} style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:10 }}>
                <span style={{ fontSize:13 }}>{l}</span>
                <span className={`badge ${s==='good'?'badge-green':'badge-amber'}`}>{v}</span>
              </div>
            ))}
          </div>
          <div className="card">
            <div className="section-title">Flagged Reports</div>
            {[
              ['D003','Suspected expired food posted','high'],
              ['R002','Duplicate request submission','medium'],
              ['U041','Fake donor account suspected','high'],
            ].map(([id,issue,sev])=>(
              <div key={id} style={{ background:'var(--red-dim)',border:'1px solid rgba(255,90,90,.2)',borderRadius:'var(--radius-sm)',padding:12,marginBottom:10 }}>
                <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center' }}>
                  <div>
                    <div style={{ fontSize:13,fontWeight:600 }}>{id}</div>
                    <div style={{ fontSize:12,color:'var(--text-dim)' }}>{issue}</div>
                  </div>
                  <div style={{ display:'flex',gap:6 }}>
                    <button className="btn btn-outline btn-sm" onClick={()=>toast(`Reviewing ${id}`,'info')}>Review</button>
                    <button className="btn btn-danger btn-sm" onClick={()=>toast(`${id} removed`,'success')}>Remove</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="section-title">All Donations Overview</div>
        <table className="data-table">
          <thead><tr><th>ID</th><th>Food</th><th>Donor</th><th>Matched To</th><th>Status</th><th>Urgency</th><th>Actions</th></tr></thead>
          <tbody>
            {state.donations.map(d=>(
              <tr key={d.id}>
                <td><span className="chip">{d.id}</span></td>
                <td>{d.food}</td>
                <td style={{ color:'var(--text-dim)',fontSize:12 }}>{d.donor}</td>
                <td style={{ color:'var(--text-dim)',fontSize:12 }}>{d.matched}</td>
                <td><StatusBadge status={d.status} /></td>
                <td><span className={`badge ${d.urgency==='high'?'badge-red':d.urgency==='medium'?'badge-amber':'badge-green'}`}>{d.urgency}</span></td>
                <td style={{ display:'flex',gap:4 }}>
                  <button className="btn btn-ghost btn-sm" onClick={()=>toast(`Viewing ${d.id}`,'info')}>View</button>
                  <button className="btn btn-danger btn-sm" onClick={()=>toast(`${d.id} removed`,'success')}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ══════════════════════════════════
   FEEDBACK PAGE
══════════════════════════════════ */
export function FeedbackPage() {
  const { toast } = useApp()
  const [ratings, setRatings] = useState({ overall:4, volunteer:5, platform:4 })

  return (
    <div>
      <div className="page-header">
        <h2>⭐ Feedback & Ratings</h2>
        <p>Help us improve by sharing your experience.</p>
      </div>
      <div className="grid-2">
        <div>
          <div className="card" style={{ marginBottom:16 }}>
            <div className="form-section-title">Rate Your Recent Delivery</div>
            <div style={{ background:'var(--surface2)',border:'1px solid var(--border)',borderRadius:'var(--radius-sm)',padding:14,marginBottom:20 }}>
              <div style={{ fontWeight:600 }}>Donation #D001 — Biryani 10kg</div>
              <div style={{ fontSize:12,color:'var(--text-dim)' }}>Delivered by Ravi Kumar to Asha NGO</div>
            </div>
            {[
              ['overall','Overall Experience'],
              ['volunteer','Volunteer Performance'],
              ['platform','Platform Ease of Use'],
            ].map(([key,label])=>(
              <div key={key} style={{ marginBottom:18 }}>
                <div style={{ fontSize:13,fontWeight:600,marginBottom:8 }}>{label}</div>
                <StarRating value={ratings[key]} onChange={v=>{setRatings(r=>({...r,[key]:v}));toast(`Rated ${v}/5 ★`,'info')}} />
              </div>
            ))}
            <div className="input-group" style={{ marginBottom:16 }}>
              <label>Your Comments</label>
              <textarea className="input" placeholder="Tell us about your experience..." />
            </div>
            <button className="btn btn-primary w-full" onClick={()=>toast('Thank you for your feedback! ⭐','success')}>Submit Feedback</button>
          </div>
        </div>

        <div>
          <div className="card" style={{ marginBottom:16 }}>
            <div className="section-title">Platform Ratings</div>
            {[
              ['Overall Platform',4.7,'2,841 reviews'],
              ['Volunteer Performance',4.8,'1,920 reviews'],
              ['Food Quality',4.6,'2,100 reviews'],
              ['Delivery Speed',4.5,'1,800 reviews'],
            ].map(([l,v,c])=>(
              <div key={l} style={{ marginBottom:16 }}>
                <div style={{ display:'flex',justifyContent:'space-between',fontSize:13,marginBottom:4 }}>
                  <span>{l}</span>
                  <span style={{ fontWeight:700,color:'var(--amber)' }}>{v} ★ <span style={{ color:'var(--text-dim)',fontWeight:400 }}>({c})</span></span>
                </div>
                <div className="progress-wrap"><div className="progress-bar prog-amber" style={{ width:`${(v/5*100).toFixed(0)}%` }} /></div>
              </div>
            ))}
          </div>

          <div className="card">
            <div className="section-title">Recent Reviews</div>
            {[
              ['Meena S.',5,'Seamless experience! Volunteer was prompt and food was fresh.','2 days ago'],
              ['Raj NGO',4,'Great platform, minor app lag during peak hours.','3 days ago'],
              ['Anita K.',5,'Donated for the first time, process was super easy!','5 days ago'],
            ].map(([name,rating,text,date])=>(
              <div key={name} style={{ padding:'14px 0',borderBottom:'1px solid var(--border)' }}>
                <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:4 }}>
                  <div style={{ fontWeight:600,fontSize:13 }}>{name}</div>
                  <div style={{ color:'var(--amber)',fontSize:13 }}>{'★'.repeat(rating)}{'☆'.repeat(5-rating)}</div>
                </div>
                <div style={{ fontSize:12,color:'var(--text-dim)' }}>{text}</div>
                <div style={{ fontSize:11,color:'var(--text-muted)',marginTop:4 }}>{date}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════
   NOTIFICATIONS PAGE
══════════════════════════════════ */
export function NotificationsPage() {
  const { state, markAllRead } = useApp()
  return (
    <div>
      <div className="page-header">
        <h2>🔔 Notifications</h2>
        <p>All your alerts, updates, and system messages.</p>
      </div>
      <div className="card">
        <div style={{ display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:16 }}>
          <div style={{ display:'flex',gap:8 }}>
            <button className="btn btn-outline btn-sm">All</button>
            <button className="btn btn-outline btn-sm">Unread ({state.notifications.filter(n=>n.unread).length})</button>
            <button className="btn btn-outline btn-sm">⚠️ Alerts</button>
          </div>
          <button className="btn btn-ghost btn-sm" onClick={markAllRead}>Mark all read</button>
        </div>
        {state.notifications.map(n=>(
          <div key={n.id} style={{
            display:'flex',alignItems:'flex-start',gap:12,padding:'14px 16px',
            background: n.unread?'rgba(61,220,132,.04)':'transparent',
            borderRadius:'var(--radius-sm)',marginBottom:4,
            borderLeft: n.unread?'3px solid var(--green)':'3px solid transparent',
            cursor:'pointer',transition:'background var(--transition)',
          }}>
            <div style={{ fontSize:20 }}>{n.icon}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13,lineHeight:1.5 }}>{n.text}</div>
              <div style={{ fontSize:11,color:'var(--text-muted)',marginTop:3 }}>{n.time}</div>
            </div>
            {n.unread && <div style={{ width:8,height:8,borderRadius:'50%',background:'var(--green)',flexShrink:0,marginTop:6 }} />}
          </div>
        ))}
      </div>
    </div>
  )
}

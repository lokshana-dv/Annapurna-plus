import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { StatusBadge, KpiCard } from '../components/UI'

/* ══════════════════════════════════
   VOLUNTEER PAGE
══════════════════════════════════ */
export function VolunteerPage() {
  const { state, toast, navigate, updateDonationStatus } = useApp()
  const active = state.donations.filter(d => d.status !== 'delivered')

  return (
    <div>
      <div className="page-header">
        <h2>🚴 Volunteer Deliveries</h2>
        <p>Accept and manage food delivery assignments.</p>
      </div>

      <div className="grid-3" style={{ marginBottom:20 }}>
        <KpiCard label="Today's Deliveries" value="7"    icon="✅" bgIcon="green" />
        <KpiCard label="Points Earned"       value="140"  icon="🏆" bgIcon="amber" />
        <KpiCard label="Distance (km)"       value="32.4" icon="🗺️" bgIcon="blue" />
      </div>

      <div style={{ display:'flex', alignItems:'center', gap:10, marginBottom:16 }}>
        <div className="section-title" style={{ marginBottom:0 }}>Open Delivery Requests</div>
        <span className="badge badge-red">3 urgent</span>
      </div>

      {active.map(d => (
        <div key={d.id} className="card" style={{ marginBottom:14 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:12 }}>
            <div>
              <div style={{ fontWeight:600, fontSize:15 }}>{d.food}</div>
              <div style={{ fontSize:13, color:'var(--text-dim)' }}>From {d.donor} · {d.location}</div>
            </div>
            <div style={{ display:'flex', gap:8, alignItems:'center' }}>
              <span className={`badge ${d.urgency==='high'?'badge-red':d.urgency==='medium'?'badge-amber':'badge-green'}`}>{d.urgency} priority</span>
              <StatusBadge status={d.status} />
            </div>
          </div>

          <div className="grid-3" style={{ marginBottom:12 }}>
            {[['Matched To',d.matched],['Expires In',d.expiry],['Posted',d.time]].map(([l,v])=>(
              <div key={l}>
                <div style={{ fontSize:10, color:'var(--text-muted)', textTransform:'uppercase', fontWeight:700, marginBottom:3 }}>{l}</div>
                <div style={{ fontWeight:600, fontSize:13, color: l==='Expires In'?(d.urgency==='high'?'var(--red)':d.urgency==='medium'?'var(--amber)':'var(--green)'):'var(--text)' }}>{v}</div>
              </div>
            ))}
          </div>

          <div style={{ display:'flex', gap:8 }}>
            {d.status === 'pending' && <>
              <button className="btn btn-primary btn-sm" onClick={() => { updateDonationStatus(d.id,'accepted'); toast('Delivery accepted! Route optimized 🚴','success') }}>Accept Delivery</button>
              <button className="btn btn-outline btn-sm" onClick={() => navigate('routing')}>View Route</button>
            </>}
            {d.status === 'accepted' && <>
              <button className="btn btn-primary btn-sm" onClick={() => { updateDonationStatus(d.id,'in-transit'); toast('Marked as picked up! 📦','success') }}>Mark Picked Up</button>
              <button className="btn btn-outline btn-sm" onClick={() => navigate('routing')}>Navigate</button>
            </>}
            {d.status === 'in-transit' && <>
              <button className="btn btn-primary btn-sm" onClick={() => { updateDonationStatus(d.id,'delivered'); toast('Delivery confirmed! +20 pts 🏆','success') }}>Confirm Delivery</button>
              <button className="btn btn-outline btn-sm" onClick={() => navigate('routing')}>Navigate</button>
            </>}
          </div>
        </div>
      ))}

      <div className="card">
        <div className="section-title">My Delivery History</div>
        <table className="data-table">
          <thead><tr><th>Donation</th><th>Pickup</th><th>Delivered To</th><th>Distance</th><th>Points</th><th>Time</th></tr></thead>
          <tbody>
            {[
              ['Biryani 10kg','Hotel Spice Garden','Asha NGO','3.2 km','+40','10:20 AM'],
              ['Milk 20L','Green Dairy','Sneha Home','1.8 km','+20','09:00 AM'],
              ['Bread 30pcs','Bakery Fresh','Street Connect','4.1 km','+40','08:30 AM'],
            ].map((r,i)=>(
              <tr key={i}>
                <td>{r[0]}</td><td>{r[1]}</td><td>{r[2]}</td><td>{r[3]}</td>
                <td style={{ color:'var(--green)', fontWeight:600 }}>{r[4]}</td>
                <td style={{ color:'var(--text-dim)' }}>{r[5]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ══════════════════════════════════
   ROUTING ENGINE PAGE
══════════════════════════════════ */
export function RoutingPage() {
  const { toast } = useApp()
  const [result, setResult] = useState(false)

  function runRouting() {
    toast('⚡ Running routing algorithm...','info')
    setTimeout(() => { setResult(true); toast('✅ Optimal route computed! Match score: 94/100','success') }, 1800)
  }

  const steps = [
    { n:1, title:'Food Classification & Assessment', desc:'AI evaluates food type, quantity, expiry risk, and safety status in real-time.' },
    { n:2, title:'Recipient Suitability Analysis',   desc:'Algorithm matches food characteristics with NGO needs, dietary requirements & capacity.' },
    { n:3, title:'Urgency Calculation',              desc:'Dynamic priority scoring: time-to-expiry × distance × recipient availability.' },
    { n:4, title:'Route Optimization',               desc:'Multi-point logistics minimizes travel time with real-time volunteer tracking.' },
    { n:5, title:'Adaptive Learning',                desc:'System improves through feedback loops, donation patterns, and success rates.' },
  ]

  const queue = [
    { rank:1, food:'Vegetable Curry 6kg', exp:'1h',  score:97, vol:'Ravi Kumar',  status:'pending' },
    { rank:2, food:'Biryani 10kg',        exp:'2h',  score:91, vol:'Meena Latha', status:'accepted' },
    { rank:3, food:'Bread 15pcs',         exp:'5h',  score:87, vol:'Meena Latha', status:'in-transit' },
    { rank:4, food:'Rice & Dal 8kg',      exp:'12h', score:72, vol:'Amit Verma',  status:'accepted' },
  ]

  return (
    <div>
      <div className="page-header">
        <h2>🗺️ Smart Food Routing Engine</h2>
        <p>AI-powered matching and route optimization for food rescue missions.</p>
      </div>

      <div className="grid-2" style={{ marginBottom:20 }}>
        <div className="card">
          <div className="section-title">Routing Algorithm Steps</div>
          {steps.map(s => (
            <div key={s.n} className="routing-step">
              <div className="routing-num">{s.n}</div>
              <div>
                <div style={{ fontWeight:600, fontSize:13 }}>{s.title}</div>
                <div style={{ fontSize:12, color:'var(--text-dim)', marginTop:3 }}>{s.desc}</div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="card" style={{ marginBottom:16 }}>
            <div className="section-title">Run Route Optimization</div>
            <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
              <div className="input-group"><label>Donation ID</label><input className="input" defaultValue="D004" /></div>
              <div className="input-group"><label>Max Volunteer Distance (km)</label><input className="input" type="number" defaultValue={5} /></div>
              <div className="input-group">
                <label>Priority Mode</label>
                <select className="input">
                  <option>⚡ Expiry-first (fastest)</option>
                  <option>📍 Distance-optimized</option>
                  <option>👥 Capacity-matched</option>
                  <option>⚖️ Balanced</option>
                </select>
              </div>
              <button className="btn btn-primary" onClick={runRouting}>Run Routing Engine ⚡</button>
            </div>
          </div>

          {result && (
            <div className="card" style={{ animation:'modalIn .3s ease' }}>
              <div className="section-title" style={{ color:'var(--green)' }}>✅ Route Computed</div>
              {[
                ['Best Match NGO','Asha NGO'],
                ['Nearest Volunteer','Ravi Kumar (1.2 km)'],
                ['Total Route','4.8 km'],
                ['Estimated Time','~22 minutes'],
                ['Match Score','94/100'],
              ].map(([l,v]) => (
                <div key={l} style={{ display:'flex', justifyContent:'space-between', fontSize:13, marginBottom:10 }}>
                  <span style={{ color:'var(--text-dim)' }}>{l}</span>
                  <span style={{ fontWeight:600, color: l==='Estimated Time'?'var(--green)':l==='Match Score'?'var(--green)':'var(--text)' }}>{v}</span>
                </div>
              ))}
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:13, marginBottom:16 }}>
                <span style={{ color:'var(--text-dim)' }}>Expiry Safety</span>
                <span className="badge badge-green">✅ Safe</span>
              </div>
              <button className="btn btn-primary w-full" onClick={() => toast('Volunteer Ravi Kumar notified!','success')}>Dispatch Volunteer</button>
            </div>
          )}
        </div>
      </div>

      <div className="card">
        <div className="section-title">Priority Queue — Active Donations</div>
        <table className="data-table">
          <thead><tr><th>Rank</th><th>Donation</th><th>Expiry</th><th>Match Score</th><th>Best Volunteer</th><th>Status</th><th>Action</th></tr></thead>
          <tbody>
            {queue.map(r => (
              <tr key={r.rank}>
                <td><span style={{ fontWeight:800, color: r.rank===1?'var(--red)':r.rank===2?'var(--amber)':'var(--text-dim)' }}>#{r.rank}</span></td>
                <td>{r.food}</td>
                <td><span style={{ fontWeight:600, color: r.exp==='1h'?'var(--red)':r.exp==='2h'?'var(--amber)':'var(--green)' }}>{r.exp}</span></td>
                <td><span className={`badge ${r.score>90?'badge-green':r.score>75?'badge-amber':'badge-red'}`}>{r.score}</span></td>
                <td>{r.vol}</td>
                <td><StatusBadge status={r.status} /></td>
                <td><button className="btn btn-ghost btn-sm" onClick={()=>toast('Re-routing...','info')}>Re-route</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

/* ══════════════════════════════════
   LEADERBOARD PAGE
══════════════════════════════════ */
export function LeaderboardPage() {
  const { state, toast } = useApp()
  const v = state.volunteers
  const colors = ['#3ddc84','#5ab4ff','#f5a623','#b07fff','#ff5a5a']

  const badges = [
    { icon:'🌿', name:'First Rescue',    desc:'First successful donation' },
    { icon:'🔟', name:'Ten Deliveries',  desc:'10 successful pickups' },
    { icon:'⚡', name:'Rapid Responder', desc:'Accept within 5 min' },
    { icon:'🌟', name:'Food Hero',       desc:'50+ deliveries' },
    { icon:'🏙️', name:'City Champion',   desc:'Deliveries across 5 zones' },
    { icon:'❤️', name:'Community Heart', desc:'Serve 500 beneficiaries' },
    { icon:'🚀', name:'Speed Demon',     desc:'Deliver within 30 min' },
    { icon:'♻️', name:'Zero Waste',      desc:'All food utilized' },
  ]

  return (
    <div>
      <div className="page-header">
        <h2>🏆 Volunteer Leaderboard</h2>
        <p>Top volunteers ranked by deliveries, points, and impact.</p>
      </div>

      {/* Podium */}
      <div className="grid-3" style={{ marginBottom:20 }}>
        {[1,0,2].map(idx => {
          const vol = v[idx]
          const isFirst = idx === 0
          return (
            <div key={vol.name} className="card" style={{
              textAlign:'center', padding:24,
              borderColor: isFirst ? 'rgba(61,220,132,.4)' : idx===1?'rgba(192,192,192,.3)':'rgba(205,127,50,.3)',
              transform: isFirst ? 'scale(1.04)' : 'none',
              boxShadow: isFirst ? '0 0 0 1px rgba(61,220,132,.2),0 4px 24px rgba(61,220,132,.1)' : 'none',
            }}>
              <div style={{ fontSize:36, marginBottom:8 }}>{idx===0?'🥇':idx===1?'🥈':'🥉'}</div>
              <div className="lb-avatar" style={{ background:colors[idx], width:54, height:54, fontSize:22, margin:'0 auto 10px' }}>{vol.name[0]}</div>
              <div style={{ fontWeight:700, color: isFirst?'var(--green)':'var(--text)' }}>{vol.name}</div>
              <div style={{ fontSize:12, color:'var(--text-dim)', marginTop:2 }}>{vol.deliveries} deliveries · ⭐ {vol.rating}</div>
              <div style={{ fontSize:30, fontWeight:800, fontFamily:'Sora,sans-serif', color: isFirst?'var(--green)':idx===1?'var(--blue)':'var(--amber)', marginTop:8 }}>{vol.pts}</div>
              <div style={{ fontSize:11, color:'var(--text-dim)' }}>points</div>
              {isFirst && <span className="badge badge-green" style={{ marginTop:8 }}>🌟 Food Hero</span>}
            </div>
          )
        })}
      </div>

      {/* Full Rankings */}
      <div className="card" style={{ marginBottom:20 }}>
        <div className="section-title">Full Rankings</div>
        {v.map((vol, i) => (
          <div key={vol.name} className="lb-row">
            <div className={`lb-rank ${i===0?'gold':i===1?'silver':i===2?'bronze':''}`}>{i+1}</div>
            <div className="lb-avatar" style={{ background:colors[i] || '#3ddc84' }}>{vol.name[0]}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:13, fontWeight:600 }}>{vol.name}</div>
              <div style={{ fontSize:11, color:'var(--text-dim)', marginBottom:4 }}>{vol.deliveries} deliveries · ⭐ {vol.rating}</div>
              <div className="progress-wrap" style={{ height:4 }}>
                <div className="progress-bar prog-green" style={{ width:`${(vol.pts/940*100).toFixed(0)}%` }} />
              </div>
            </div>
            <span className={`badge ${vol.status==='active'?'badge-green':'badge-amber'}`}>{vol.status}</span>
            <div className="lb-pts">{vol.pts}</div>
          </div>
        ))}
      </div>

      {/* Badges */}
      <div className="card">
        <div className="section-title">🏅 Badges & Achievements</div>
        <div className="grid-4">
          {badges.map(b => (
            <div key={b.name} className="card" style={{ textAlign:'center', cursor:'pointer', padding:16 }}
              onClick={() => toast(`Badge: ${b.name}`,'info')}>
              <div style={{ fontSize:28, marginBottom:6 }}>{b.icon}</div>
              <div style={{ fontWeight:600, fontSize:12 }}>{b.name}</div>
              <div style={{ fontSize:11, color:'var(--text-dim)', marginTop:2 }}>{b.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

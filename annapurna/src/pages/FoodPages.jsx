import React, { useState, useEffect, useRef } from 'react'
import { useApp } from '../context/AppContext'
import { StatusBadge, MapPlaceholder } from '../components/UI'

/* ══════════════════════════════════
   DONATE PAGE
══════════════════════════════════ */
export function DonatePage() {
  const { toast, navigate } = useApp()
  const [selectedCat, setSelectedCat] = useState(null)
  const categories = [
    { id:'cooked',    icon:'🥘', label:'Cooked Food' },
    { id:'packaged',  icon:'🥖', label:'Packaged Food' },
    { id:'raw',       icon:'🥦', label:'Raw Vegetables' },
    { id:'baked',     icon:'🍰', label:'Baked Goods' },
  ]

  function submit(e) {
    e.preventDefault()
    toast('🌿 Donation submitted! Smart routing engine is matching...','success')
    setTimeout(()=>toast('✅ Matched to Asha NGO · Volunteer notified','success'),2000)
    setTimeout(()=>navigate('tracking'),3000)
  }

  return (
    <div>
      <div className="page-header">
        <h2>🍽️ Donate Food</h2>
        <p>Upload surplus food for intelligent matching and safe redistribution.</p>
      </div>
      <form onSubmit={submit}>
        <div className="grid-2">
          {/* LEFT */}
          <div>
            <div className="card" style={{ marginBottom:16 }}>
              <div className="form-section-title">Food Details</div>
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                <div className="input-group">
                  <label>Food Name / Description</label>
                  <input className="input" placeholder="e.g. Chicken Biryani, Vegetable Curry..." required />
                </div>
                <div className="input-group">
                  <label>Food Category</label>
                  <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginTop:4 }}>
                    {categories.map(c => (
                      <div key={c.id} className={`cat-card ${selectedCat===c.id?'selected':''}`}
                        onClick={() => setSelectedCat(c.id)}>
                        <div className="cat-icon">{c.icon}</div>
                        <div className="cat-label">{c.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="grid-2" style={{ gap:12 }}>
                  <div className="input-group">
                    <label>Food Type</label>
                    <select className="input">
                      <option>🌿 Vegetarian</option>
                      <option>🍗 Non-Vegetarian</option>
                      <option>🥛 Contains Dairy</option>
                      <option>🌾 Vegan</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Quantity</label>
                    <input className="input" type="number" placeholder="e.g. 10" required />
                  </div>
                </div>
                <div className="grid-2" style={{ gap:12 }}>
                  <div className="input-group">
                    <label>Unit</label>
                    <select className="input">
                      <option>kg</option><option>liters</option><option>pieces</option><option>packets</option><option>servings</option>
                    </select>
                  </div>
                  <div className="input-group">
                    <label>Serves (people)</label>
                    <input className="input" type="number" placeholder="e.g. 50" />
                  </div>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="form-section-title">Expiry & Safety</div>
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                <div className="input-group"><label>Prepared / Packed At</label><input className="input" type="datetime-local" /></div>
                <div className="input-group"><label>Safe Until (Best Before)</label><input className="input" type="datetime-local" /></div>
                <div className="input-group">
                  <label>Food Safety Status</label>
                  <select className="input">
                    <option>✅ Fresh — Prepared today</option>
                    <option>⚠️ Near Expiry — Use within 2–4 hrs</option>
                    <option>🧊 Refrigerated & Safe</option>
                    <option>📦 Sealed Packaged Food</option>
                  </select>
                </div>
                <div className="input-group">
                  <label>Allergen Info / Notes</label>
                  <textarea className="input" placeholder="Contains nuts, gluten, etc. Any special handling notes..." />
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <div className="card" style={{ marginBottom:16 }}>
              <div className="form-section-title">Pickup Details</div>
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                <div className="input-group"><label>Pickup Address</label><input className="input" placeholder="Full address" required /></div>
                <div className="grid-2" style={{ gap:12 }}>
                  <div className="input-group"><label>City</label><input className="input" placeholder="Bangalore" /></div>
                  <div className="input-group"><label>Pincode</label><input className="input" placeholder="560001" /></div>
                </div>
                <div className="input-group">
                  <label>Pickup Window</label>
                  <select className="input">
                    <option>Immediately available</option>
                    <option>Within 1 hour</option>
                    <option>Within 2 hours</option>
                    <option>Schedule specific time</option>
                  </select>
                </div>
                <div className="input-group"><label>Donor Contact</label><input className="input" placeholder="+91 98765 43210" /></div>
              </div>
            </div>

            <div className="card" style={{ marginBottom:16 }}>
              <div className="form-section-title">Photo Upload</div>
              <div onClick={() => toast('Photo upload — select files','info')}
                style={{
                  border:'2px dashed var(--border)', borderRadius:'var(--radius)',
                  padding:32, textAlign:'center', cursor:'pointer', transition:'border-color var(--transition)',
                }}
                onMouseEnter={e=>e.currentTarget.style.borderColor='var(--green)'}
                onMouseLeave={e=>e.currentTarget.style.borderColor='var(--border)'}>
                <div style={{ fontSize:32, marginBottom:8 }}>📸</div>
                <div style={{ fontSize:14, color:'var(--text-dim)' }}>Click to upload food photos</div>
                <div style={{ fontSize:11, color:'var(--text-muted)', marginTop:4 }}>JPG, PNG — Max 5MB each</div>
              </div>
            </div>

            <div className="card" style={{ marginBottom:16 }}>
              <div className="form-section-title">Recipient Preference</div>
              {[
                { icon:'🏠', label:'Any NGO (auto-matched)' },
                { icon:'🏥', label:'Hospitals / Care Homes' },
                { icon:'📚', label:'Schools / Orphanages' },
                { icon:'🏚️', label:'Homeless Shelters' },
              ].map((r,i) => (
                <label key={r.label} style={{ display:'flex', alignItems:'center', gap:10, cursor:'pointer', fontSize:13, marginBottom:10 }}>
                  <input type="radio" name="recipient" defaultChecked={i===0} /> {r.icon} {r.label}
                </label>
              ))}
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-full">🌿 Submit Donation</button>
          </div>
        </div>
      </form>
    </div>
  )
}

/* ══════════════════════════════════
   REQUEST PAGE
══════════════════════════════════ */
export function RequestPage() {
  const { state, toast } = useApp()

  function handleSubmit(e) {
    e.preventDefault()
    toast('🙏 Request submitted! Matching donors...','success')
    setTimeout(()=>toast('✅ Matched with donor — Volunteer assigned','success'),2000)
  }

  return (
    <div>
      <div className="page-header">
        <h2>🙏 Request Food</h2>
        <p>NGOs and individuals can submit food requests for matching.</p>
      </div>
      <div className="grid-2">
        <div className="card">
          <div className="form-section-title">New Food Request</div>
          <form onSubmit={handleSubmit} style={{ display:'flex', flexDirection:'column', gap:14 }}>
            <div className="input-group"><label>Organization / Name</label><input className="input" placeholder="Asha NGO / Your name" required /></div>
            <div className="input-group"><label>Number of Beneficiaries</label><input className="input" type="number" placeholder="e.g. 80" required /></div>
            <div className="input-group">
              <label>Food Type Required</label>
              <select className="input">
                <option>Any available food</option>
                <option>🌿 Vegetarian only</option>
                <option>🍗 Non-veg acceptable</option>
                <option>🥛 No dairy (allergy)</option>
                <option>🌾 Gluten-free required</option>
              </select>
            </div>
            <div className="input-group">
              <label>Urgency Level</label>
              <select className="input">
                <option>🔴 High — Need within 2 hours</option>
                <option>🟡 Medium — Need within 6 hours</option>
                <option>🟢 Low — Need by end of day</option>
              </select>
            </div>
            <div className="input-group"><label>Pickup / Delivery Location</label><input className="input" placeholder="Full address" required /></div>
            <div className="input-group"><label>Contact Number</label><input className="input" placeholder="+91 98765 43210" /></div>
            <div className="input-group">
              <label>Additional Notes</label>
              <textarea className="input" placeholder="Any dietary restrictions, special requirements..." />
            </div>
            <button type="submit" className="btn btn-primary btn-lg w-full">Submit Request</button>
          </form>
        </div>

        <div>
          <div className="card">
            <div className="section-title">Active Requests</div>
            {state.requests.map(r => (
              <div key={r.id} className="card" style={{ background:'var(--surface2)', marginBottom:12 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:8 }}>
                  <div style={{ fontWeight:600, fontSize:14 }}>{r.org}</div>
                  <span className={`badge ${r.urgency==='high'?'badge-red':r.urgency==='medium'?'badge-amber':'badge-green'}`}>{r.urgency}</span>
                </div>
                <div style={{ fontSize:13, color:'var(--text-dim)', marginBottom:2 }}>🍽️ {r.food} · 👥 {r.people} people</div>
                <div style={{ fontSize:13, color:'var(--text-dim)', marginBottom:12 }}>📍 {r.location} · 🕐 {r.time}</div>
                <div style={{ display:'flex', gap:8 }}>
                  <button className="btn btn-primary btn-sm" onClick={()=>toast(`Matching donor to ${r.org}...`,'success')}>Match Donor</button>
                  <button className="btn btn-outline btn-sm" onClick={()=>toast(`Viewing ${r.id}`,'info')}>Details</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

/* ══════════════════════════════════
   TRACKING PAGE
══════════════════════════════════ */
export function TrackingPage() {
  const { state } = useApp()
  const [seconds, setSeconds] = useState(4*3600+47*60+32)
  const timerRef = useRef(null)

  useEffect(() => {
    timerRef.current = setInterval(() => setSeconds(s => s > 0 ? s - 1 : 0), 1000)
    return () => clearInterval(timerRef.current)
  }, [])

  const h = String(Math.floor(seconds/3600)).padStart(2,'0')
  const m = String(Math.floor((seconds%3600)/60)).padStart(2,'0')
  const s = String(seconds%60).padStart(2,'0')

  const steps = [
    { label:'Donated', done:true, active:false, icon:'✓' },
    { label:'Matched',  done:true, active:false, icon:'✓' },
    { label:'Accepted', done:true, active:false, icon:'✓' },
    { label:'In Transit',done:true,active:true,  icon:'🚴' },
    { label:'Delivered', done:false,active:false, icon:'📦' },
  ]

  const timeline = [
    { dot:'var(--green)', title:'Food Donated',          desc:'Bread & Fruits uploaded by Priya Sharma · 11:05 AM', done:true },
    { dot:'var(--blue)',  title:'Smart Routing Activated',desc:'AI matched to Hope Foundation (4.8⭐) · 11:07 AM',    done:true },
    { dot:'var(--green)', title:'Volunteer Assigned',     desc:'Meena Latha accepted pickup request · 11:10 AM',      done:true },
    { dot:'var(--amber)', title:'Pickup In Progress',     desc:'En route to donor location · ETA 5 min · 11:25 AM',  done:true },
    { dot:'var(--border)',title:'Delivery In Progress',   desc:'In transit to Hope Foundation · Current',             done:false },
    { dot:'var(--border)',title:'Delivered',              desc:'Awaiting confirmation from recipient',                done:false },
  ]

  return (
    <div>
      <div className="page-header">
        <h2>🔍 Track Donation</h2>
        <p>Real-time lifecycle tracking of your food donation.</p>
      </div>

      {/* Search */}
      <div className="card" style={{ marginBottom:16 }}>
        <div style={{ display:'flex', gap:10, marginBottom:20 }}>
          <input className="input" defaultValue="D002" placeholder="Enter Donation ID (e.g. D002)" style={{ maxWidth:280 }} />
          <button className="btn btn-primary">Track</button>
        </div>

        {/* Donation info */}
        <div style={{ background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:20, marginBottom:20 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
            <div>
              <div style={{ fontWeight:700, fontSize:15 }}>Donation #D002</div>
              <div style={{ fontSize:13, color:'var(--text-dim)', marginTop:2 }}>Bread & Fruits (15 pcs) · Indiranagar → Hope Foundation</div>
            </div>
            <StatusBadge status="in-transit" />
          </div>

          {/* Stepper */}
          <div className="track-steps" style={{ marginBottom:20 }}>
            {steps.map((step, i) => (
              <React.Fragment key={step.label}>
                <div className="track-step">
                  <div className={`track-dot ${step.done?'done':''} ${step.active?'active':''}`}>{step.icon}</div>
                  <div className={`track-label ${step.active?'active':''}`}>{step.label}</div>
                </div>
                {i < steps.length - 1 && (
                  <div className={`track-connector ${steps[i+1].done||steps[i].done?'done':''}`} />
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Stats */}
          <div className="grid-3">
            <div>
              <div style={{ fontSize:11, color:'var(--text-muted)', textTransform:'uppercase', fontWeight:700, marginBottom:4 }}>Volunteer</div>
              <div style={{ fontWeight:600 }}>Meena Latha</div>
              <div style={{ fontSize:12, color:'var(--text-dim)' }}>⭐ 4.8 · 39 deliveries</div>
            </div>
            <div>
              <div style={{ fontSize:11, color:'var(--text-muted)', textTransform:'uppercase', fontWeight:700, marginBottom:4 }}>ETA</div>
              <div style={{ fontWeight:600, color:'var(--green)' }}>~18 minutes</div>
              <div style={{ fontSize:12, color:'var(--text-dim)' }}>2.4 km remaining</div>
            </div>
            <div>
              <div style={{ fontSize:11, color:'var(--text-muted)', textTransform:'uppercase', fontWeight:700, marginBottom:4 }}>Expiry Timer</div>
              <div style={{ fontWeight:700, color:'var(--amber)', fontSize:18, fontFamily:'Sora,sans-serif' }}>{h}:{m}:{s}</div>
              <div style={{ fontSize:12, color:'var(--text-dim)' }}>Time remaining</div>
            </div>
          </div>
        </div>

        {/* Timeline */}
        <div className="section-title">Donation Journey</div>
        <div style={{ display:'flex', flexDirection:'column' }}>
          {timeline.map((t,i) => (
            <div key={i} className="timeline-item">
              <div style={{ display:'flex', flexDirection:'column', alignItems:'center' }}>
                <div className="timeline-dot" style={{ background: t.dot }} />
                {i < timeline.length-1 && <div className="timeline-connector" style={{ flex:1, width:2, background:'var(--border)', marginTop:4 }} />}
              </div>
              <div style={{ flex:1 }}>
                <div style={{ fontSize:13, fontWeight:600, color: t.done?'var(--text)':'var(--text-muted)' }}>{t.title}</div>
                <div style={{ fontSize:12, color:'var(--text-dim)', marginTop:2 }}>{t.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="section-title">All My Donations</div>
          <table className="data-table">
            <thead><tr><th>ID</th><th>Food</th><th>Status</th></tr></thead>
            <tbody>
              {state.donations.map(d => (
                <tr key={d.id}>
                  <td><span className="chip">{d.id}</span></td>
                  <td style={{ maxWidth:150, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>{d.food}</td>
                  <td><StatusBadge status={d.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="card">
          <div className="section-title">Delivery Map</div>
          <MapPlaceholder height={260} />
        </div>
      </div>
    </div>
  )
}

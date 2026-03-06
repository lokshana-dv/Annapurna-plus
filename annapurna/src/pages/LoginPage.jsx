import React, { useState } from 'react'
import { useApp } from '../context/AppContext'

const ROLES = [
  { key:'donor',     icon:'🍽️', label:'Donor' },
  { key:'volunteer', icon:'🚴', label:'Volunteer' },
  { key:'ngo',       icon:'🏢', label:'NGO' },
  { key:'admin',     icon:'🛡️', label:'Admin' },
]

export default function LoginPage() {
  const { login, toast } = useApp()
  const [view, setView]     = useState('login')   // 'login' | 'register'
  const [role, setRole]     = useState('donor')
  const [email, setEmail]   = useState('demo@annapurna.org')
  const [pass, setPass]     = useState('demo1234')

  function handleLogin(e) {
    e.preventDefault()
    if (!email || !pass) { toast('Please fill all fields', 'error'); return }
    login(email, role)
    toast(`Welcome back! 🌿`, 'success')
  }

  function handleRegister(e) {
    e.preventDefault()
    toast('Account created! Please verify your email.', 'success')
    setView('login')
  }

  const stats = [
    { num:'12,847', lbl:'Meals Rescued' },
    { num:'342',    lbl:'Active Volunteers' },
    { num:'89',     lbl:'Partner NGOs' },
    { num:'4.2T',   lbl:'CO₂ Saved (kg)' },
  ]

  const steps = [
    { n:1, t:'Donate', d:'Upload surplus food with photos & expiry' },
    { n:2, t:'Match',  d:'AI routes to best NGO / beneficiary' },
    { n:3, t:'Deliver',d:'Volunteer picks up and tracks delivery' },
    { n:4, t:'Impact', d:'Analytics confirm meals saved' },
  ]

  return (
    <div style={{
      minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center',
      background:'radial-gradient(ellipse at 30% 20%, rgba(61,220,132,.07) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(90,180,255,.05) 0%, transparent 60%), var(--bg)',
      padding:20
    }}>
      <div style={{
        display:'flex', width:'100%', maxWidth:940,
        background:'var(--surface)', border:'1px solid var(--border)', borderRadius:20,
        overflow:'hidden', boxShadow:'0 40px 80px rgba(0,0,0,.5)',
      }}>
        {/* LEFT */}
        <div style={{
          flex:1, padding:48,
          background:'linear-gradient(145deg, rgba(61,220,132,.08), rgba(90,180,255,.04))',
          borderRight:'1px solid var(--border)',
          display:'flex', flexDirection:'column', justifyContent:'center',
        }} className="login-left-panel">
          {/* Logo */}
          <div style={{ display:'flex', alignItems:'center', gap:14, marginBottom:28 }}>
            <div style={{ width:50, height:50, borderRadius:13, background:'var(--green)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:26 }}>🌿</div>
            <div>
              <h1 style={{ fontSize:22, fontWeight:800 }}>ANNAPURNA<span style={{ color:'var(--green)' }}>+</span></h1>
              <div style={{ fontSize:13, color:'var(--text-dim)', marginTop:2 }}>Smart Food Rescue Network</div>
            </div>
          </div>

          <p style={{ color:'var(--text-dim)', fontSize:14, lineHeight:1.7, marginBottom:24 }}>
            Bridging the gap between food surplus and hunger using intelligent routing, real-time tracking, and community-driven coordination.
          </p>

          {/* Stats */}
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10, marginBottom:24 }}>
            {stats.map(s => (
              <div key={s.lbl} style={{ background:'var(--surface2)', border:'1px solid var(--border)', borderRadius:'var(--radius-sm)', padding:14 }}>
                <div style={{ fontSize:22, fontWeight:800, color:'var(--green)', fontFamily:'Sora,sans-serif' }}>{s.num}</div>
                <div style={{ fontSize:11, color:'var(--text-dim)', marginTop:2 }}>{s.lbl}</div>
              </div>
            ))}
          </div>

          {/* Steps */}
          {steps.map(s => (
            <div key={s.n} className="routing-step">
              <div className="routing-num">{s.n}</div>
              <div>
                <div style={{ fontSize:13, fontWeight:600 }}>{s.t}</div>
                <div style={{ fontSize:12, color:'var(--text-dim)', marginTop:2 }}>{s.d}</div>
              </div>
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div style={{ flex:1, padding:48, display:'flex', flexDirection:'column', justifyContent:'center', minWidth:0 }}>
          {view === 'login' ? (
            <>
              <h2 style={{ fontSize:24, fontWeight:700, marginBottom:6 }}>Welcome back</h2>
              <p style={{ color:'var(--text-dim)', fontSize:14, marginBottom:24 }}>Sign in to your ANNAPURNA+ account</p>

              {/* Role tabs */}
              <div style={{ display:'flex', gap:6, marginBottom:20 }}>
                {ROLES.map(r => (
                  <button key={r.key} onClick={() => setRole(r.key)}
                    style={{
                      flex:1, padding:'8px 4px', borderRadius:'var(--radius-sm)',
                      fontSize:12, fontWeight:600, cursor:'pointer',
                      border: role === r.key ? 'none' : '1px solid var(--border)',
                      background: role === r.key ? 'var(--green)' : 'transparent',
                      color: role === r.key ? '#0a0f0d' : 'var(--text-dim)',
                      transition:'all var(--transition)',
                    }}>{r.icon} {r.label}</button>
                ))}
              </div>

              <form onSubmit={handleLogin} style={{ display:'flex', flexDirection:'column', gap:14 }}>
                <div className="input-group">
                  <label>Email address</label>
                  <input className="input" type="email" placeholder="you@example.com"
                    value={email} onChange={e => setEmail(e.target.value)} />
                </div>
                <div className="input-group">
                  <label>Password</label>
                  <input className="input" type="password" placeholder="••••••••"
                    value={pass} onChange={e => setPass(e.target.value)} />
                </div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                  <label style={{ display:'flex', alignItems:'center', gap:6, fontSize:13, cursor:'pointer' }}>
                    <input type="checkbox" defaultChecked /> Remember me
                  </label>
                  <span style={{ fontSize:13, color:'var(--green)', cursor:'pointer' }}>Forgot password?</span>
                </div>
                <button type="submit" className="btn btn-primary btn-lg w-full">Sign In →</button>
              </form>

              <div style={{ display:'flex', alignItems:'center', gap:12, color:'var(--text-muted)', fontSize:12, margin:'16px 0' }}>
                <div style={{ flex:1, height:1, background:'var(--border)' }} />
                or continue with
                <div style={{ flex:1, height:1, background:'var(--border)' }} />
              </div>
              <div className="grid-2" style={{ gap:10 }}>
                <button className="btn btn-outline" onClick={() => toast('Google auth — demo mode','info')}>🌐 Google</button>
                <button className="btn btn-outline" onClick={() => toast('OTP — demo mode','info')}>📱 OTP</button>
              </div>
              <p style={{ textAlign:'center', fontSize:13, color:'var(--text-dim)', marginTop:16 }}>
                Don't have an account?{' '}
                <span onClick={() => setView('register')} style={{ color:'var(--green)', cursor:'pointer', fontWeight:600 }}>Create one</span>
              </p>
            </>
          ) : (
            <>
              <h2 style={{ fontSize:24, fontWeight:700, marginBottom:6 }}>Create account</h2>
              <p style={{ color:'var(--text-dim)', fontSize:14, marginBottom:20 }}>Join the ANNAPURNA+ network</p>
              <form onSubmit={handleRegister} style={{ display:'flex', flexDirection:'column', gap:12 }}>
                <div className="grid-2" style={{ gap:12 }}>
                  <div className="input-group"><label>First Name</label><input className="input" placeholder="Priya" required /></div>
                  <div className="input-group"><label>Last Name</label><input className="input" placeholder="Sharma" required /></div>
                </div>
                <div className="input-group"><label>Email</label><input className="input" type="email" placeholder="you@example.com" required /></div>
                <div className="input-group"><label>Phone</label><input className="input" type="tel" placeholder="+91 98765 43210" /></div>
                <div className="input-group">
                  <label>I am a</label>
                  <select className="input">
                    <option>Food Donor (Individual / Restaurant / Hotel)</option>
                    <option>Volunteer (Delivery)</option>
                    <option>NGO / Organization</option>
                  </select>
                </div>
                <div className="input-group"><label>Password</label><input className="input" type="password" placeholder="Min 8 characters" required /></div>
                <div className="input-group"><label>Confirm Password</label><input className="input" type="password" placeholder="Re-enter" required /></div>
                <button type="submit" className="btn btn-primary btn-lg w-full">Create Account →</button>
              </form>
              <p style={{ textAlign:'center', fontSize:13, color:'var(--text-dim)', marginTop:12 }}>
                Already have an account?{' '}
                <span onClick={() => setView('login')} style={{ color:'var(--green)', cursor:'pointer', fontWeight:600 }}>Sign in</span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

import React, { createContext, useContext, useState, useCallback } from 'react'

const AppContext = createContext(null)

export const INITIAL_STATE = {
  user: { name: 'Priya Sharma', email: 'demo@annapurna.org', role: 'Donor', city: 'Bangalore', avatar: 'P' },
  donations: [
    { id:'D001', food:'Biryani (10 kg)', donor:'Hotel Spice Garden', status:'delivered', urgency:'high', expiry:'2h', location:'Koramangala', matched:'Asha NGO', vol:'Ravi K.', time:'10:20 AM' },
    { id:'D002', food:'Bread & Fruits (15 pcs)', donor:'Priya Sharma', status:'in-transit', urgency:'medium', expiry:'5h', location:'Indiranagar', matched:'Hope Foundation', vol:'Meena L.', time:'11:05 AM' },
    { id:'D003', food:'Rice & Dal (8 kg)', donor:'Raj Caterers', status:'accepted', urgency:'low', expiry:'12h', location:'Whitefield', matched:'Pending', vol:'Assigned', time:'12:30 PM' },
    { id:'D004', food:'Vegetable Curry (6 kg)', donor:'Green Leaf Hotel', status:'pending', urgency:'high', expiry:'1h', location:'HSR Layout', matched:'Pending', vol:'Pending', time:'01:00 PM' },
    { id:'D005', food:'Milk (20L)', donor:'Priya Sharma', status:'delivered', urgency:'low', expiry:'24h', location:'Marathahalli', matched:'Sneha Home', vol:'Amit V.', time:'09:00 AM' },
  ],
  notifications: [
    { id:1, icon:'🚴', text:'Volunteer Ravi K. has picked up your donation #D002', time:'5 min ago', unread:true },
    { id:2, icon:'✅', text:'Donation #D001 successfully delivered to Asha NGO', time:'45 min ago', unread:true },
    { id:3, icon:'⚠️', text:'Donation #D004 expiring in 1 hour! Urgent routing active.', time:'1 hr ago', unread:true },
    { id:4, icon:'🏆', text:'You earned the "Food Hero" badge for 10 donations!', time:'3 hrs ago', unread:false },
    { id:5, icon:'🙏', text:'Hope Foundation accepted your food request', time:'1 day ago', unread:false },
  ],
  volunteers: [
    { name:'Ravi Kumar',  deliveries:47, pts:940, rating:4.9, status:'active', color:'#3ddc84' },
    { name:'Meena Latha', deliveries:39, pts:780, rating:4.8, status:'active', color:'#5ab4ff' },
    { name:'Amit Verma',  deliveries:34, pts:680, rating:4.7, status:'busy',   color:'#f5a623' },
    { name:'Sunita Rao',  deliveries:28, pts:560, rating:4.9, status:'active', color:'#b07fff' },
    { name:'Karthik M.',  deliveries:22, pts:440, rating:4.6, status:'active', color:'#ff5a5a' },
  ],
  requests: [
    { id:'R001', org:'Asha NGO', food:'Rice & Curry', people:80, urgency:'high', location:'Koramangala', time:'2h ago' },
    { id:'R002', org:'Hope Foundation', food:'Any cooked food', people:45, urgency:'medium', location:'Indiranagar', time:'4h ago' },
    { id:'R003', org:'Street Connect', food:'Bread / Tiffin', people:30, urgency:'low', location:'JP Nagar', time:'6h ago' },
  ],
}

export function AppProvider({ children }) {
  const [state, setState] = useState(INITIAL_STATE)
  const [toasts, setToasts] = useState([])
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [modal, setModal] = useState(null)

  const toast = useCallback((msg, type = 'success') => {
    const id = Date.now()
    setToasts(prev => [...prev, { id, msg, type }])
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3500)
  }, [])

  const navigate = useCallback((page) => {
    setCurrentPage(page)
    setSidebarOpen(false)
  }, [])

  const login = useCallback((email, role) => {
    const roleNames = { donor:'Donor', volunteer:'Volunteer', ngo:'NGO Manager', admin:'Administrator' }
    setState(prev => ({
      ...prev,
      user: {
        ...prev.user,
        role: roleNames[role] || 'Donor',
        name: email === 'demo@annapurna.org' ? 'Priya Sharma' : email.split('@')[0],
        email,
        avatar: email === 'demo@annapurna.org' ? 'P' : email[0].toUpperCase(),
      }
    }))
    setIsLoggedIn(true)
    setCurrentPage('dashboard')
  }, [])

  const logout = useCallback(() => {
    setIsLoggedIn(false)
    setCurrentPage('dashboard')
  }, [])

  const markAllRead = useCallback(() => {
    setState(prev => ({
      ...prev,
      notifications: prev.notifications.map(n => ({ ...n, unread: false }))
    }))
    setNotifOpen(false)
    toast('All notifications marked as read', 'info')
  }, [toast])

  const openModal = useCallback((title, content) => setModal({ title, content }), [])
  const closeModal = useCallback(() => setModal(null), [])

  const updateDonationStatus = useCallback((id, status) => {
    setState(prev => ({
      ...prev,
      donations: prev.donations.map(d => d.id === id ? { ...d, status } : d)
    }))
  }, [])

  return (
    <AppContext.Provider value={{
      state, setState, toasts, currentPage, isLoggedIn,
      sidebarOpen, setSidebarOpen, notifOpen, setNotifOpen,
      modal, toast, navigate, login, logout, markAllRead,
      openModal, closeModal, updateDonationStatus,
    }}>
      {children}
    </AppContext.Provider>
  )
}

export const useApp = () => useContext(AppContext)

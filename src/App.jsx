import React, { useState } from 'react'
import Navbar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import Menu from './pages/Menu/Menu'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import About from './pages/About/About'
import PrivacyPolicy from './pages/PrivacyPolicy/PrivacyPolicy'
import HelpSupport from './pages/HelpSupport/HelpSupport'
import EmergencyReport from './pages/EmergencyReport/EmergencyReport'
import Delivery from './pages/Delivery/Delivery'
import Footer from './components/Footer/Footer'
import { OrderStatusProvider } from './context/OrderStatusContext'
import LoginPopup from './components/LoginPopup/LoginPopup'
import RoleSelect from './components/LoginPopup/RoleSelect'
import ScrollToTop from './components/ScrollToTop'
import { AdminAuthProvider } from './admin/auth/AdminAuthContext'
import AdminGuard from './admin/AdminGuard'
import AdminLayout from './admin/AdminLayout'
import AdminLogin from './admin/pages/Login/Login'
import Dashboard from './admin/pages/Dashboard/Dashboard'
import Orders from './admin/pages/Orders/Orders'
import Catalog from './admin/pages/Catalog/Catalog'
import Users from './admin/pages/Users/Users'
import Support from './admin/pages/Support/Support'
import Emergency from './admin/pages/Emergency/Emergency'
import Promotions from './admin/pages/Promotions/Promotions'
import Content from './admin/pages/Content/Content'
import Reports from './admin/pages/Reports/Reports'
import Settings from './admin/pages/Settings/Settings'
import Profile from './pages/Profile/Profile'
import EditProfile from './pages/Profile/EditProfile'
import AdminProfile from './admin/pages/Profile/Profile'

const App = () => {

  const [showLogin, setShowLogin] = useState(false)
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [showRoleSelect, setShowRoleSelect] = useState(false)

  return (
    <>
    {showRoleSelect && (
      <RoleSelect
        onClose={() => setShowRoleSelect(false)}
        onSelectUser={() => { setShowRoleSelect(false); setShowLogin(true); }}
        onSelectAdmin={() => { setShowRoleSelect(false); window.location.href = '/admin/login'; }}
      />
    )}
    {showLogin?<LoginPopup setShowLogin={setShowLogin} onLoginSuccess={() => setIsUserLoggedIn(true)}/>:<></>}
      <ScrollToTop />
      <div className='app'>
        <OrderStatusProvider>
        <AdminAuthProvider>
        <Navbar setShowLogin={setShowLogin} openRoleSelect={() => setShowRoleSelect(true)} isUserLoggedIn={isUserLoggedIn} onUserLogout={() => setIsUserLoggedIn(false)}/>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/order' element={<PlaceOrder />} />
          <Route path='/profile' element={<Profile onLogout={() => setIsUserLoggedIn(false)} />} />
          <Route path='/profile/edit' element={<EditProfile />} />
          <Route path='/about' element={<About />} />
          <Route path='/privacy-policy' element={<PrivacyPolicy />} />
          <Route path='/help-support' element={<HelpSupport />} />
          <Route path='/emergency-report' element={<EmergencyReport />} />
          <Route path='/delivery' element={<Delivery />} />
          <Route path='/admin/login' element={<AdminLogin />} />
          <Route path='/admin' element={<AdminGuard><AdminLayout /></AdminGuard>}>
            <Route index element={<Dashboard />} />
            <Route path='orders' element={<Orders />} />
            <Route path='catalog' element={<Catalog />} />
            <Route path='users' element={<Users />} />
            <Route path='support' element={<Support />} />
            <Route path='emergency' element={<Emergency />} />
            <Route path='promotions' element={<Promotions />} />
            <Route path='content' element={<Content />} />
            <Route path='reports' element={<Reports />} />
            <Route path='settings' element={<Settings />} />
            <Route path='profile' element={<AdminProfile />} />
          </Route>
        </Routes>
        </AdminAuthProvider>
        </OrderStatusProvider>
      </div>
      <Footer />
    </>
  )
}

export default App
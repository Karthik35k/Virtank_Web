import React, { useState, useContext, useEffect } from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { useAdminAuth } from '../../admin/auth/AdminAuthContext';

const Navbar = ({setShowLogin, openRoleSelect, isUserLoggedIn, onUserLogout}) => {

    const [menu,setMenu]= useState("home");
    const [scrollToFooter, setScrollToFooter] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const {getTotalCartAmount} = useContext(StoreContext);

    // Sync menu state with current route
    useEffect(() => {
        if (location.pathname === '/') {
            setMenu("home");
            // If we need to scroll to footer after navigation
            if (scrollToFooter) {
                // Use requestAnimationFrame for reliable timing after render
                requestAnimationFrame(() => {
                    setTimeout(() => {
                        const footer = document.getElementById('footer');
                        if (footer) {
                            footer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                            setScrollToFooter(false);
                        }
                    }, 50);
                });
            }
        } else if (location.pathname === '/menu') {
            setMenu("menu");
        } else if (location.pathname === '/delivery') {
            setMenu("delivery");
        }
    }, [location.pathname, scrollToFooter]);

    const handleContactClick = (e) => {
        e.preventDefault();
        setMenu("contact-us");
        if (location.pathname !== '/') {
            setScrollToFooter(true);
            navigate('/');
        } else {
            document.getElementById('footer')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

  return (
    <div className='navbar'>
        <Link to='/'><img src={assets.logo} alt="" className="logo" /></Link>
        <ul className="navbar-menu">
            <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active":""}>Home</Link>
            <Link to='/menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active":""}>Menu</Link>
            <Link to='/delivery' onClick={()=>setMenu("delivery")} className={menu==="delivery"?"active":""}>Orders</Link>
            <a href="#" onClick={handleContactClick} className={menu==="contact-us"?"active":""}>Contact us</a>
        </ul>
        <div className="navbar-right">
            <img src={assets.search_icon} alt="" />
            <div className="navbar-search-icon">
               <Link to='/cart'> <img src={assets.basket_icon} alt="" /></Link>
                <div className={getTotalCartAmount()===0?"":"dot"}></div>
            </div>
            {(() => {
                try {
                    const { isAuthenticated } = useAdminAuth();
                    if (isAuthenticated) {
                        return (
                            <Link to='/admin'>
                              <img src={assets.profile_icon} alt="Admin Profile" className="profile-icon" />
                            </Link>
                        )
                    }
                } catch {}
                return isUserLoggedIn ? (
                    <img src={assets.profile_icon} alt="User Profile" className="profile-icon" onClick={()=>navigate('/profile')} />
                ) : (
                    <button onClick={()=> {
                        // On delivery/order pages, directly show login for users
                        if (location.pathname === '/delivery' || location.pathname === '/order' || location.pathname === '/cart') {
                            setShowLogin(true);
                        } else {
                            openRoleSelect ? openRoleSelect() : setShowLogin(true);
                        }
                    }}>sign in</button>
                )
            })()}
        </div>
    </div>
  )
}

export default Navbar

import style from './Navbar.module.css'

import x from '../assets/icons8-cart-48.png'
import { Link, NavLink } from 'react-router-dom'

function Navbar() {

    return <>
        <div className={style.navbar}>
            <Link to={'/'} className={style.wearx}>wearx</Link>
            <div className={style.category}>
                <NavLink to={'/men'} className={style.menWomen}>Men</NavLink>
                <NavLink to={'/women'} className={style.menWomen}>Women</NavLink>
            </div>
            <img src={x} alt="Cart" style={{ width: '40px', height: '40px' }} />
        </div>
    </>
}


export default Navbar
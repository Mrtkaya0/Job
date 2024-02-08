import { NavLink } from "react-router-dom";


const Header =() => {
    return (
        <header>
            <h2>İş<span>Takip</span></h2>
            <nav>
                <NavLink to={'/'}>Arama Listem</NavLink>
                <NavLink to={'/add'}>İş Ekle</NavLink>

            </nav>
        </header>
    )
};


export default Header ;
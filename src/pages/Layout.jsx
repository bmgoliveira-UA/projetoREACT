import { Outlet, Link } from "react-router-dom"



const Layout = () => {
    
    
    
    return <div>
        <header>
            Cabeçalho
        </header>
        <main>
            <Outlet />
        </main>
        <footer>
            Rodapé
        </footer>
    </div>
}

export default Layout
import React from 'react'
import { NavLink } from 'react-router-dom';


const linkCorrente = ({isActive}) =>({
    color: isActive? " #027399":"inherit",
    fontWeight: isActive? "bold": "normal",
});

const Navegacao = () => (
   
    <nav className='principal'aria-label='Navegação Principal'>
        <ul style={
            {
                listStyle:"none",
                padding: 0,
                display:"flex",
                gap:"1rem",
                margin:0
            }}>
                <li>
                    <NavLink to='/'
                    style={linkCorrente}
                    >
                    Home
                    </NavLink>
        
                </li>
                <li>
                    <NavLink to='/frontend'
                    style={linkCorrente}
                    >
                    Frontend
                    </NavLink>
        
                </li>
                 <li>
                    <NavLink to='/programacao'
                    style={linkCorrente}
                    >
                    Programação
                    </NavLink>
        
                </li>
                <li>
                    <NavLink to='/design'
                    style={linkCorrente}
                    >
                    Design
                    </NavLink>
        
                </li>
                <li>
                    <NavLink to='/catalogo'
                    style={linkCorrente}
                    >
                    Catálogo
                    </NavLink>
        
                </li>  
                 <li>
                    <NavLink to='/carrinho'
                    style={linkCorrente}
                    >
                    Carrinho <img src=<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="9" cy="21" r="1"></circle>
  <circle cx="20" cy="21" r="1"></circle>
  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
</svg> style={{
                        width:'1rem',
                        height:'1rem',
                    }} alt="" />
                    </NavLink>
        
                </li>



        </ul>
    </nav>
    
        );

export default Navegacao;
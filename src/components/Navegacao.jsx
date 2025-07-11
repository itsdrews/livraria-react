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
                    Carrinho <img src="/imgs/carrinho.png" style={{
                        width:'1rem',
                        height:'1rem',
                    }} alt="" />
                    </NavLink>
        
                </li>



        </ul>
    </nav>
    
        );

export default Navegacao;
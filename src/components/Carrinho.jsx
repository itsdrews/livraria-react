
import React from 'react'
import { NavLink,useNavigate } from 'react-router-dom';
import {toast,ToastContainer} from 'react-toast'

const Carrinho = ({itens,aumentarQuantidade,diminuirQuantidade,livros}) => {

    
    const navigate = useNavigate();
    const total = itens.reduce((soma, item) => {
    const livro = livros.find(l => l.id === item.id);
    return soma + (livro?.preco || 0) * item.quantidade;
  }, 0);

    const itensComDetalhes = itens.map(item => {
        const livroInfo = livros.find(livro => livro.id===item.id);
        return {...item,...livroInfo};
    })
    const mostrarToast = (msg) =>{
        toast.error(msg,{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,   
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
    }
    const handlePayment = () => {
        if(itens.length>0){
            navigate('/pagamento',{
                state:{
                    total:total
                }
            });
        }else{
            mostrarToast('Não há itens a serem pagos!');
        }
    }
    const handleAumentar = (livro) =>{
        if(livro.estoque <=0){
            mostrarToast('Não há mais exemplares disponíveis!');
        }
        aumentarQuantidade(livro);
    }
   
    return(
        <div className="carrinho">
            <h2>Seu Carrinho</h2>
          {itensComDetalhes.map(item => (
            <div key={item.id} className='item-carrinho'>
                <div className='titulo-capa'>
                    <h3>{item.titulo}</h3>
                    <img src={"/imgs/Capas/" + item.id +".jpg"} alt={"Thumbnail para o livro " + item.titulo} style={{width:'5rem', height:'auto'}} />
                </div>
                <div className="quantidade-subtotal">
                    <p>Preço unitário: R$ {Number(item.preco).toFixed(2)}</p>
                    <button className='quantidade-botao' onClick={() => handleAumentar(item)}>+</button>
                    <span style={{ margin: "0 auto" }}>{item.quantidade}</span>
                    <button className ='quantidade-botao'onClick={() => diminuirQuantidade(item)}>-</button>
                    
                    
                </div>
                </div>
    
            ))}
            <div className='total-pay'>
                 <p className='total'>Total: R$ {total.toFixed(2)}</p>
                <button className='payment' onClick={handlePayment}>Finalizar Compra</button>
                <ToastContainer/>
            </div>
            </div>

    )
}
  


export default Carrinho;

import React from 'react'
import {toast } from 'react-toastify';






const Livro = ({livro,adicionarLivro}) => {
    const mostrarToast = () => {
        if(livro.estoque>1){ toast.success("Livro adicionado com sucesso", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,   
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        })
        return true;

        }else{
          toast.error("Perdão, não há mais exemplares em estoque!",{
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,   
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          
        })
        return false;
        }
       
      }
   
      const handleAdicionar= () =>{
       
        if(mostrarToast()){adicionarLivro(livro)};
        ;
          
      }
      
  return(


    <main className='principal'>
        <div className="pag-livro">
            <h2>{livro.titulo}</h2>
            <div className="livro">
                <img src={"/imgs/Capas/" + livro.id+".jpg"} alt="Thumbnail da capa do livro..." />
                <ul>
                    <li>ISBN: {livro.isbn}</li>
                    <li>Ano: {livro.ano}</li>
                    <li>Páginas: {livro.paginas}</li>
                    <li>Preço: R$ {livro.preco}</li>
                    
                </ul>
                <h3>Descrição do livro</h3>
                <p>{livro.descricao}</p>
                <div>
                <button className='payment' onClick={() =>handleAdicionar()}>Adicionar ao Carrinho</button>
                </div>
            </div>
        </div>
    </main>

)
}
export default Livro;


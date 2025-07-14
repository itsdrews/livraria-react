
import React from 'react'

const Carrinho = ({itens,removerLivro,livros}) => {
    console.log(itens)
    const totalItens = itens.reduce((soma,livro) => soma + Number(livro.preco)|| 0, 0)
    const itensAgrupados = itens.reduce((acc,item) => {
        if(acc[item.id]){
            acc[item.id].push(item);
        }
        else{
            acc[item.id]=[item];
        }
        return acc;
    },{});
    const itensParaExibir = Object.entries(itensAgrupados).map(([id,itens]) => ({
        id,
        ...itens[0],
        quantidade:itens.length,
        subtotal: itens.reduce((soma,livro) => soma + Number(livro.preco)||0,0) 
    }))
   
    return(
        <div className="carrinho">
            <h2>Seu Carrinho</h2>
          {itensParaExibir.map(item => (
            <div key={item.id} className='item-carrinho'>
                <div className='titulo-capa'>
                    <h3>{item.titulo}</h3>
                    <img src={"/imgs/Capas/" + item.id +".jpg"} alt={"Thumbnail para o livro " + item.titulo} style={{width:'5rem', height:'auto'}} />

                </div>
                <div className="quantidade-subtotal">
                    <p>Preço unitário: R$ {Number(item.preco).toFixed(2)}</p>
                    <p>Quantidade: {item.quantidade}</p>
                    <p>Subtotal: R$ {item.subtotal.toFixed(2)}</p>
                    <button>Remover livro</button>
                    
                </div>
               
            </div>
            ))}
            
            <p className='total'>Total: R$ {totalItens.toFixed(2)}
                 <button>Opção de pagamento</button>
            </p>
           
        </div>

    )
}
  


export default Carrinho

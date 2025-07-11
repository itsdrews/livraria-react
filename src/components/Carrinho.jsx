
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
        <div className="principal">
            <h2>Seu Carrinho</h2>

          {itensParaExibir.map(item => (
            <div key={item.id}>
                <h3>{item.titulo}</h3>
                <img src="" alt="" />
                <p>Preço unitário: R$ {Number(item.preco).toFixed(2)}</p>
                <p>Quantidade: {item.quantidade}</p>
                <p>Subtotal: R$ {item.subtotal.toFixed(2)}</p>
            </div>
            ))}
            
            <p>Total: R$ {totalItens.toFixed(2)}</p>
        </div>

    )
}
  


export default Carrinho

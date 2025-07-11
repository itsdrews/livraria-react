import React from 'react'



const Livro = ({livro,adicionarLivro}) => (
  
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
                <button onClick={() =>adicionarLivro(livro)}>Adicionar ao Carrinho</button>
            </div>
        </div>
    </main>

)

export default Livro;


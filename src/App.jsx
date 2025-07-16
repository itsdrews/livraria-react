import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

import Topo from './components/Topo'
import Home from './components/Home'
import Catalogo from './components/Catalogo'
import Design from './components/Design'
import Frontend from './components/Frontend'
import Programacao from './components/Programacao'
import NotFound from './components/NotFound'
import Rodape from './components/Rodape'
import Livro from './components/Livro'
import Carrinho from './components/Carrinho'
import Pagamento from './components/Pagamento'
 

import { Route, Routes, useParams } from 'react-router-dom'
const App = () => {
  const [livros, setLivros] = useState([]);
  const [erro, setErro] = useState(null);

  const[carrinho,setCarrinho] = useState(() =>{
    const carrinhoSalvo = localStorage.getItem('carrinho');
    return carrinhoSalvo? JSON.parse(carrinhoSalvo): [];
  })

  useEffect(() =>{
    console.log("carrinho atualizado!")
    localStorage.setItem('carrinho',JSON.stringify(carrinho));
  },[carrinho]);

  const adicionarLivro = (livro) => {
    setCarrinho(prevCarrinho => {
      const itemExistente =prevCarrinho.find(item =>item.id===livro.id);

      if (itemExistente){
        return prevCarrinho.map(item =>
          item.id === livro.id
          ? {...item,quantidade:(item.quantidade || 1)}
          :item
        );
      }else{
        return [...prevCarrinho,{...livro,quantidade:livro.quantidade|| 1}]
      }
    })
      
  };
 // Versão corrigida - aumentando quantidade
const aumentarQuantidade = (id) => {
  setCarrinho(prevCarrinho => 
    prevCarrinho.map(item =>
      item.id === id
        ? { ...item, quantidade: item.quantidade + 1 }
        : item
    )
  );
};

// Versão corrigida - diminuindo quantidade (com remoção quando chega a zero)
const diminuirQuantidade = (id) => {
  setCarrinho(prevCarrinho => 
    prevCarrinho
      .map(item =>
        item.id === id
          ? { ...item, quantidade: item.quantidade - 1 }
          : item
      )
      .filter(item => item.quantidade > 0)
  );
};
  useEffect(() => {
  const carregarLivros = async () => {
    try {
      const response = await axios.get("/api/todosOsLivros.json");
      setLivros(response.data);
      console.log("Livros carregados!");
    } catch (error) {
      console.error("Erro ao carregar livros: ", error);
      setErro("Falha ao carregar os livros. Tente novamente mais tarde!");
    }
  };
  carregarLivros();
  }, []);  
  const LivroRouterHandler = ({livros,adicionarLivro}) => {
 
  const {livroSlug} = useParams();
  const livro = livros.find(l => l.slug === livroSlug);
  
  if(!livro) return <NotFound/>;
  return <Livro livro = {livro} adicionarLivro={adicionarLivro}/>
}

  return (
    <>
     <Topo/>
      <main className="principal">
        {erro && <p className='erro'>{erro}</p>}
      <Routes>
        <Route path='/' element={<Home livros={livros}/>}/>
        <Route path='/frontend' element={<Frontend livros={livros}/>}/>
        <Route path='/programacao' element={<Programacao livros={livros}/>}/>
        <Route path='/design' element={<Design livros={livros}/>}/>
        <Route path='/catalogo' element={<Catalogo livros={livros}/>}/>
        <Route path='/livro/:livroSlug' element={<LivroRouterHandler livros={livros} adicionarLivro= {adicionarLivro}/>}/>
        <Route path='/notfound' element={<NotFound/>}/>
        <Route path='/carrinho' element = {<Carrinho livros = {livros} itens = 
        {carrinho} aumentarQuantidade={aumentarQuantidade} diminuirQuantidade= {diminuirQuantidade}/>}/>
        <Route path = '/pagamento' element={<Pagamento carrinho={carrinho}/>}/>
  
      </Routes>
      </main>
      <Rodape/>
    </>
  )
}

export default App;

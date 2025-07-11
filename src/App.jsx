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

import { Route, Routes, useParams } from 'react-router-dom'
 
const App = () => {
  const [livros, setLivros] = useState([]);
  const [erro, setErro] = useState(null);

  const[carrinho,setCarrinho] = useState(() =>{
    const carrinhoSalvo = localStorage.getItem('carrinho');
    return carrinhoSalvo? JSON.parse(carrinhoSalvo): [];
  })

  useEffect(() =>{
    localStorage.setItem('carrinho',JSON.stringify(carrinho));
  },[carrinho]);

  const adicionarLivro = (livro) => {
    console.log("Livro adicionado!");
    setCarrinho([...carrinho,livro]);
  };

  const removerLivro = (livro) => {
    setCarrinho(carrinho.filter((item) => item.id !==livro.id));
  }
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
        {carrinho} removerLivro = {removerLivro} />}/>
  
      </Routes>
      </main>
      <Rodape/>
    </>
  )
}

export default App;

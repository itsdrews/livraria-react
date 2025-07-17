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
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const App = () => {
  const [livros, setLivros] = useState([]);
  const [erro, setErro] = useState(null);
  const [controleEstoque,setControleEstoque]= useState([]);

  const[carrinho,setCarrinho] = useState(() =>{
    const carrinhoSalvo = localStorage.getItem('carrinho');
    return carrinhoSalvo? JSON.parse(carrinhoSalvo): [];
  })
  useEffect(() => {
  const carregarLivros = async () => {
    try {
      const response = await axios.get("/api/todosOsLivros.json");
      const arrayModificado = response.data.map(item =>{
        return{
          ...item,
          estoque:Math.floor(Math.random()*10) +1
        };
      });
      setLivros(arrayModificado);
      setControleEstoque( arrayModificado.map(({id,estoque}) =>({id,estoque})))
      console.log("Livros carregados!");
    } catch (error) {
      console.error("Erro ao carregar livros: ", error);
      setErro("Falha ao carregar os livros. Tente novamente mais tarde!");
    }
  };
  carregarLivros();
  
  }, []);  
  console.log(controleEstoque)
 
  useEffect(() =>{
    localStorage.setItem('carrinho',JSON.stringify(carrinho));
  },[carrinho]);

  const adicionarLivro = (livro) => {
    setControleEstoque(prevEstoque => {
      const estoqueAtualizado = prevEstoque.map(item => {
        if(item.id===idLivro){
          if(item.estoque<1){
            setErro(`Estoque insuficiente para o livro ${idLivro}`)
            return item
          }
        }
      })
    })
    
    setCarrinho(prevCarrinho => {
      const itemExistente =prevCarrinho.find(item =>item.id===livro.id);
      if (itemExistente){
        setControleEtoque()
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

const aumentarQuantidade = (id) => {
  const itemEstoque = controleEstoque.find(item => item.id===livro.id)

    if (!itemEstoque.estoque<=0){
        return
    }
  setCarrinho(prevCarrinho => 
    prevCarrinho.map(item =>
      item.id === id
        ? { ...item, quantidade: item.quantidade + 1 }
        : item
    )
  );
   setControleEstoque(prevEstoque => prevEstoque.map(item => item.id ===livro.id?
       {...item,estoque: item.estoque -1}:item))
  console.log("nova quantidade: ",item.estoque)
};

const diminuirQuantidade = (id) => {
  const itemEstoque = controleEstoque.find(item => item.id===livro.id)
  setCarrinho(prevCarrinho => 
    prevCarrinho
      .map(item =>
        item.id === id
          ? { ...item, quantidade: item.quantidade - 1 }
          : item
      )
      .filter(item => item.quantidade > 0)
  );
  setControleEStoque(prevEstoque => prevEstoque.map(item => item.id ===livro.id?
       {...item,estoque: item.estoque +1}:item))
  console.log("nova quantidade: ",item.estoque)

};
  
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
        <ToastContainer/>
        {erro && <p className='erro'>{erro}</p>}
      <Routes>
        <Route path='/' element={<Home livros={livros}/>}/>
        <Route path='/frontend' element={<Frontend livros={livros}/>}/>
        <Route path='/programacao' element={<Programacao livros={livros}/>}/>
        <Route path='/design' element={<Design livros={livros}/>}/>
        <Route path='/catalogo' element={<Catalogo livros={livros}/>}/>
        <Route path='/livro/:livroSlug' element={<LivroRouterHandler livros={livros} adicionarLivro= {adicionarLivro} />}/>
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

import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import {toast } from 'react-toastify';


const METODOS_PAGAMENTO = [
  { id: 'pix', nome: 'PIX' },
  { id: 'debito', nome: 'Débito'},
  { id: 'credito', nome: 'Crédito' }
];

 const mostrarToast = () => {
        toast.success('Operação realizada com sucesso!');
      }
const Pagamento = () => {
  const { state } = useLocation();
  const { total, itens } = state || {};
  const navigate = useNavigate();
  

  const [metodoSelecionado, setMetodoSelecionado] = useState('pix');
  const [qrCodePix, setQrCodePix] = useState('');
  const [dadosCartao, setDadosCartao] = useState({
    numero: '', nome: '', validade: '', cvv: '', parcelas: 1
  });

  
  useEffect(() => {
    if (metodoSelecionado === 'pix' && total) {
      setQrCodePix(`00020126580014BR.GOV.BCB.PIX0136...VALOR=${total}...`);
    }
  }, [metodoSelecionado, total]);

  const handleSubmit = (e) => {
    e.preventDefault();

    setTimeout(() => {
      navigate('/confirmacao', { 
        state: { total, metodo: metodoSelecionado } 
      });
    }, 1500);
  };
  const handleConfirmacao = () =>{
    mostrarToast();
  }
  if (!total) {
    navigate('/carrinho');
    return null;
  }

  return (
    <div className="pagamento-container">
      <h1>Finalizar Compra</h1>
      
      <div className="resumo-pedido">
        <h3>Seu Pedido</h3>
        <ul>
          {itens?.map(item => (
            <li key={item.id}>
              {item.nome} - {item.quantidade}x R$ {item.preco.toFixed(2)}
            </li>
          ))}
        </ul>
        <div className="total">
          <span>Total:</span>
          <strong>R$ {total?.toFixed(2)}</strong>
        </div>
      </div>

   
      <div className="selecao-metodo">
        <h3>Método de Pagamento</h3>
        <div className="botoes-metodo">
          {METODOS_PAGAMENTO.map(metodo => (
            <button
              key={metodo.id}
              className={`metodo-btn ${metodoSelecionado === metodo.id ? 'ativo' : ''}`}
              onClick={() => setMetodoSelecionado(metodo.id)}
              type="button"
            >
              {metodo.nome}
            </button>
          ))}
        </div>
      </div>

 
      <div className="formulario-pagamento">
        {metodoSelecionado === 'pix' ? (
          <div className="pix-content">
            <QRCodeSVG 
              value={qrCodePix} 
              size={180} 
              level="H" 
              includeMargin 
            />
            <div className="instrucoes">
              <p>1. Abra seu app bancário</p>
              <p>2. Escaneie o QR Code</p>
              <p>3. Confirme o pagamento</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Número do Cartão</label>
              <input
                type="text"
                value={dadosCartao.numero}
                onChange={(e) => 
                  setDadosCartao({
                    ...dadosCartao,
                    numero: e.target.value.replace(/\D/g, '').slice(0, 16)
                  })
                }
                placeholder="1234 5678 9012 3456"
                required
              />
            </div>


            {metodoSelecionado === 'credito' && (
              <div className="input-group">
                <label>Parcelas</label>
                <select
                  value={dadosCartao.parcelas}
                  onChange={(e) => 
                    setDadosCartao({
                      ...dadosCartao,
                      parcelas: parseInt(e.target.value)
                    })
                  }
                >
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <option key={num} value={num}>
                      {num}x de R$ {(total / num).toFixed(2)}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <button onClick={() =>{handleConfirmacao()}}type="submit" className="botao-confirmar">
              Confirmar Pagamento
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
export default Pagamento
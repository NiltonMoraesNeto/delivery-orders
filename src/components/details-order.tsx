import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Order } from '../model/orders';
import { useNavigate } from 'react-router-dom';
import CurrencyFormatter from '../utils/currency-formatter';

interface DetailsOrderProps {
  order: Order | null;
}

export function DetailsOrder({ order }: DetailsOrderProps) {
  const navigate = useNavigate();
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const handleNavigateToHome = () => {
    navigate(`/home`);
  };

  const handleNextItem = () => {
    if (order && currentItemIndex < order.items.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1);
    }
  };

  const handlePreviousItem = () => {
    if (currentItemIndex > 0) {
      setCurrentItemIndex(currentItemIndex - 1);
    }
  };

  const getColorClass = (type?: string) => {
    return type === 'Pendente'
      ? 'text-red-500'
      : type === 'Entregue'
        ? 'text-green-500'
        : 'text-yellow-500';
  };

  return (
    <div className="">
      <div className="flex justify-between mb-8 ml-8">
        <h1 className="font-bold">Detalhes do Pedido</h1>
        <button
          aria-label="backToHome"
          type="button"
          onClick={handleNavigateToHome}
          className="cursor-pointer"
        >
          <span className="flex justify-start text-blue-500">
            <ArrowLeft className=" cursor-pointer" aria-label="backToHome" />
            Voltar
          </span>
        </button>
      </div>

      {order ? (
        <div className="flex justify-between">
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <button
                type="button"
                onClick={handlePreviousItem}
                disabled={currentItemIndex === 0}
                aria-label="itemAnterior"
                className={`cursor-pointer mr-2 ${currentItemIndex === 0 ? 'invisible' : 'visible'}`}
              >
                <ArrowLeft />
              </button>
              <label>Produto: {order.items[currentItemIndex].name}</label>
              <button
                type="button"
                onClick={handleNextItem}
                disabled={currentItemIndex === order.items.length - 1}
                aria-label="proximoItem"
                className={`cursor-pointer ml-2 ${currentItemIndex === order.items.length - 1 ? 'invisible' : 'visible'}`}
              >
                <ArrowRight />
              </button>
            </div>
            <img
              src={order.items[currentItemIndex].imagem}
              width={100}
              alt={order.items[currentItemIndex].name}
            />
            <div className="flex items-center">
              <label>
                Valor:{' '}
                <CurrencyFormatter
                  value={order.items[currentItemIndex].price}
                />
              </label>
              <label className="ml-2">
                Quantidade: {order.items[currentItemIndex].quantity}
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1">
            <label>ID: {order.id}</label>
            <label className={`font-bold ${getColorClass(order.status)}`}>
              Status: {order.status}
            </label>
            <label>
              Total: <CurrencyFormatter value={order.total} />
            </label>
            <label>Cliente: {order.customer.name}</label>
            <label>Endereço: {order.customer.address}</label>
          </div>
        </div>
      ) : (
        <p className="text-red-600">Detalhamento não pode ser carregado...</p>
      )}
    </div>
  );
}

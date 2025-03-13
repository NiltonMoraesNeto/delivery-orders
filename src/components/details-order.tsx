import React, { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Order } from '../model/orders';
import { useNavigate } from 'react-router-dom';
import CurrencyFormatter from './currency-formatter';

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

  return (
    <div className="">
      <div className="flex justify-between mb-8 ml-8">
        <h1 className="font-bold">Detalhes do Pedido</h1>
        <div
          className="flex justify-start text-blue-500 cursor-pointer"
          onClick={handleNavigateToHome}
        >
          <ArrowLeft />
          Voltar
        </div>
      </div>

      {order ? (
        <div className="flex justify-between">
          <div className="flex flex-col items-center">
            <div className="flex items-center">
              <button
                type="button"
                onClick={handlePreviousItem}
                disabled={currentItemIndex === 0}
                aria-label="Item anterior"
                className={`cursor-pointer mr-2 ${currentItemIndex === 0 ? 'invisible' : 'visible'}`}
              >
                <ArrowLeft />
              </button>
              <label>Produto: {order.items[currentItemIndex].name}</label>
              <button
                type="button"
                onClick={handleNextItem}
                disabled={currentItemIndex === order.items.length - 1}
                aria-label="Próximo item"
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
          </div>

          <div className="grid grid-cols-1 md:grid-cols-1">
            <label>ID: {order.id}</label>
            <label>Status: {order.status}</label>
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

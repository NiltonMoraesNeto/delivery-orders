import { ArrowLeft } from "lucide-react";
import { Order } from "../model/orders";
import { useNavigate } from "react-router-dom";
import CurrencyFormatter from "./currency-formatter";

interface DetailsOrderProps {
  order: Order | null;
}

export function DetailsOrder({ order }: DetailsOrderProps) {
  const navigate = useNavigate();

  const handleNavigateToHome = () => {
    navigate(`/home`);
  };

  return (
    <div className="">
      <div className="flex justify-between mb-8">
        <h1>Detalhes do Pedido</h1>
        <div
          className="flex justify-start text-blue-500 cursor-pointer"
          onClick={() => handleNavigateToHome()}
        >
          <ArrowLeft />
          Voltar
        </div>
      </div>

      {order ? (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <label>ID: {order.id}</label>
          <label>Status: {order.status}</label>
          <label>
            Total: <CurrencyFormatter value={order.total} />
          </label>
          <label>Cliente: {order.customer.name}</label>

          {order.items.map((item, index) => (
            <div key={index} className="flex flex-col items-start mb-4">
              <label>Produto: {item.name}</label>
              <img
                src={item.imagem}
                width={200}
                height={200}
                alt={item.name}
                className="rounded-lg"
              />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-red-600">Detalhamento não pode ser carregado...</p>
      )}
    </div>
  );
}

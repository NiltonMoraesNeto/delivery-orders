import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FileSearch } from "lucide-react";
import { Order } from "../model/orders";
import CurrencyFormatter from "./currency-formatter";
import Badge from "./badge";

interface TableOrderListProps {
  orders: Order[];
}

export function TableOrderList({ orders }: TableOrderListProps) {
  const [filter, setFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const navigate = useNavigate();

  const filteredOrders = orders?.filter((order) => {
    return (
      (order.customer.name.toLowerCase().includes(filter.toLowerCase()) ||
        filter === "") &&
      (order.status.toLowerCase().includes(statusFilter.toLowerCase()) ||
        statusFilter === "")
    );
  });

  const formatDateBR = (dateString: string): string => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleNavigateToDetails = (id: string) => {
    navigate(`/order-details/${id}`);
  };

  return (
    <div className="overflow-x-auto">
      <div className="mb-4 flex flex-col md:flex-row justify-between items-center">
        <input
          type="text"
          placeholder="Buscar por nome do cliente"
          className="border border-gray-400 p-2 rounded mb-2 md:mb-0 md:mr-2 flex-1 focus:border-gray-500 focus:outline-none"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
        <input
          type="text"
          placeholder="Buscar por status"
          className="border border-gray-400 p-2 rounded flex-1 focus:border-gray-500 focus:outline-none"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        />
      </div>
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-lg">
        <thead>
          <tr>
            <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-medium text-gray-700 bg-gray-50">
              ID
            </th>
            <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-medium text-gray-700 bg-gray-50">
              Cliente
            </th>
            <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-medium text-gray-700 bg-gray-50">
              Status
            </th>
            <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-medium text-gray-700 bg-gray-50">
              Método de Envio
            </th>
            <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-medium text-gray-700 bg-gray-50">
              Total
            </th>
            <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-medium text-gray-700 bg-gray-50">
              Custo Entrega
            </th>
            <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-medium text-gray-700 bg-gray-50">
              Data Estimada Entrega
            </th>
            <th className="py-3 px-4 border-b border-gray-200 text-left text-sm font-medium text-gray-700 bg-gray-50">
              Detalhes
            </th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders?.map((order) => (
            <tr key={order.uuid} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b border-gray-200 text-left text-sm text-gray-900">
                {order.id}
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-left text-sm text-gray-900">
                {order.customer.name}
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-left text-sm text-gray-900">
                <span>
                  <Badge text={order.status} type={order.status === "Entregue" ? "success" : "error"} className={`text-xs font-bold`}/>
                </span>
                
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-left text-sm text-gray-900">
                {order.shipping_method}
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-left text-sm text-gray-900">
                <CurrencyFormatter value={order.total} />
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-left text-sm text-gray-900">
                <CurrencyFormatter value={order.delivery_cost} />
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-left text-sm text-gray-900">
                {formatDateBR(order.delivery_estimated)}
              </td>
              <td className="py-2 px-4 border-b border-gray-200 text-left text-sm text-gray-900 cursor-pointer">
                <button
                  aria-label="detailOrder"
                  type="button"
                  onClick={() => handleNavigateToDetails(order.id)}
                >
                  <FileSearch className="text-blue-500 cursor-pointer" aria-label="detailOrder" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

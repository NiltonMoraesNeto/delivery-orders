import { useEffect, useState } from 'react';
import { isSuccessRequest } from '../../utils/response-request';
import { Order } from '../../model/orders';
import { fetchOrdersList } from '../../services/orders-service';
import { TableOrderList } from '../../components/table-order-list';
import Card from '../../components/card';
import Alert from '../../components/alert';

export default function Home() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchOrdersList();
      if (response && isSuccessRequest(response.status)) {
        setOrders(response.data.orders);
        setError(null);
      } else {
        setOrders([]);
        setError('Erro ao carregar a listagem');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-blue-600 text-center">
        Lista de Pedidos
      </h1>
      {error && <Alert message={error} type="error" />}
      <Card title="Pedidos">
        <TableOrderList orders={orders} />
      </Card>
    </div>
  );
}

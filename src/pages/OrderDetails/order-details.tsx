import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Order } from '../../model/orders';
import { ordersById } from '../../services/orders-service';
import Card from '../../components/card';
import { DetailsOrder } from '../../components/details-order';

export default function OrderDetails() {
  const { id } = useParams<{ id: string }>();

  const [order, setOrder] = useState<Order | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const foundOrder = await ordersById(id as string);
        setOrder(foundOrder);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Card title="">
        <DetailsOrder order={order} />
      </Card>
    </div>
  );
}

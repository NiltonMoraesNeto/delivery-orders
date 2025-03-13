import '@testing-library/jest-dom';
import { render, waitFor, screen } from '@testing-library/react';
import { describe, expect, test, vi, MockedFunction } from 'vitest';
import { useParams } from 'react-router-dom';
import { ordersById } from '../../services/orders-service';
import type { Order } from '../../model/orders';
import OrderDetails from '../../pages/OrderDetails/order-details';

// Mock da função ordersById
vi.mock('../../services/orders-service', () => ({
  ordersById: vi.fn(),
}));

// Mock de useParams e useNavigate
vi.mock('react-router-dom', async () => {
  const actual = await import('react-router-dom');
  return {
    ...actual,
    useParams: vi.fn(),
    useNavigate: vi.fn(),
  };
});

describe('OrderDetails', () => {
  test('should render OrderDetails component with order data', async () => {
    // Mock do useParams para retornar um id
    (useParams as MockedFunction<typeof useParams>).mockReturnValue({
      id: '158924',
    });

    // Mock da resposta da função ordersById
    (ordersById as MockedFunction<typeof ordersById>).mockResolvedValueOnce({
      uuid: '6f0945f1-6a83-4dfd-93bb-3242314196',
      id: '158924',
      status: 'Pendente',
      total: 120.5,
      delivery_cost: 12,
      shipping_method: 'Entrega Expressa',
      delivery_estimated: '2025-02-17',
      customer: {
        name: 'João da Silva',
        address: 'Rua das Palmeiras, 123',
      },
      items: [
        {
          imagem: 'https://cdn-icons-png.flaticon.com/512/186/186239.png',
          name: 'Celular XYZ',
          quantity: 1,
          price: 120.5,
        },
      ],
    } as Order);

    const { container } = render(<OrderDetails />);

    // Espera que o container esteja no documento
    expect(container).toBeInTheDocument();

    // Verifica se os dados do pedido estão sendo renderizados
    await waitFor(() => {
      expect(screen.getByText(/João da Silva/i)).toBeInTheDocument();
      expect(screen.getByText(/Celular XYZ/i)).toBeInTheDocument();
      expect(screen.getByText(/R\$ 120,50/i)).toBeInTheDocument();
      expect(screen.getByText(/Pendente/i)).toBeInTheDocument();
      expect(screen.getByText(/Rua das Palmeiras, 123/i)).toBeInTheDocument();
      expect(screen.getByText(/158924/i)).toBeInTheDocument();
    });
  });
});

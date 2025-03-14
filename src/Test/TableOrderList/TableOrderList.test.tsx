import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import { Order } from '../../model/orders';
import { TableOrderList } from '../../components/table-order-list';

// Mock do useNavigate
const mockedUseNavigate = vi.fn();
vi.mock('react-router-dom', () => ({
  ...vi.importActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate,
}));

describe('TableOrderList', () => {
  const orders: Order[] = [
    {
      uuid: '6f0945f1-6a83-4dfd-93bb-3242314196',
      id: '158924',
      customer: { name: 'João da Silva', address: 'Rua das Palmeiras, 123' },
      status: 'Pendente',
      shipping_method: 'Entrega Expressa',
      total: 120.5,
      delivery_cost: 12.0,
      delivery_estimated: '2025-02-17',
      items: [],
    },
  ];

  test('should call navigate function on pencil icon click', () => {
    render(<TableOrderList orders={orders} />);

    // Encontra o ícone do search detail e simula um clique
    const pencilIcon = screen.getByRole('button', { name: /detailOrder/i });
    fireEvent.click(pencilIcon);

    // Verifica se a função de navegação foi chamada com o ID correto
    expect(mockedUseNavigate).toHaveBeenCalledWith('/order-details/158924');
  });
});

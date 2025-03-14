import '@testing-library/jest-dom';
import { render, waitFor } from '@testing-library/react';
import { describe, expect, test, vi, MockedFunction } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import Home from '../../pages/Home/home';
import { fetchOrdersList } from '../../services/orders-service';
import type { AxiosResponse } from 'axios';

// Mock da função fetchOrdersList
vi.mock('../../services/orders-service', () => ({
  fetchOrdersList: vi.fn(),
}));

describe('Home', () => {
  test('should render HOME component', async () => {
    // Mock da resposta da função fetchOrdersList
    (
      fetchOrdersList as MockedFunction<typeof fetchOrdersList>
    ).mockResolvedValueOnce({
      status: 200,
      data: {
        orders: [],
      },
    } as AxiosResponse);

    const { container } = render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );

    // Espera que o container esteja no documento
    expect(container).toBeInTheDocument();

    // Espera que a função fetchOrdersList tenha sido chamada
    await waitFor(() => {
      expect(fetchOrdersList).toHaveBeenCalledTimes(1);
    });
  });
});

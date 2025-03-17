import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './components/header';
import Sidebar from './components/sidebar';
import AppRoutes from './routes';

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(`/home`);
  }, []);
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar />
        <main className="flex-1 p-4 overflow-auto">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
}

export default App;

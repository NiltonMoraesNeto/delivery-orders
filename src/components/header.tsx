import React from 'react';
import { Link } from 'react-router-dom';
import { Bell, LogOut, User } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <div className="flex items-center">
        <Link to="/home" className="text-2xl font-bold hover:text-gray-300">
          Delivery Orders
        </Link>
      </div>
      <div className="flex items-center space-x-4">
        <button className="focus:outline-none hover:text-gray-300">
          <Bell size={24} />
        </button>
        <button className="focus:outline-none hover:text-gray-300">
          <User size={24} />
        </button>
        <button className="focus:outline-none hover:text-gray-300">
          <LogOut size={24} />
        </button>
      </div>
    </header>
  );
};

export default Header;

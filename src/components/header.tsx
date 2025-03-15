import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Bell, LogOut, User } from 'lucide-react';
import Modal from './modal';

const Header: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });
  const userIconRef = useRef<HTMLButtonElement>(null);

  const toggleModal = () => {
    if (!isModalOpen && userIconRef.current) {
      const rect = userIconRef.current.getBoundingClientRect();
      setModalPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
        width: rect.width,
      });
    }
    setIsModalOpen(!isModalOpen);
  };

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
        <button
          ref={userIconRef}
          className="focus:outline-none hover:text-gray-300"
          onClick={toggleModal}
        >
          <User size={24} />
        </button>
        <button className="focus:outline-none hover:text-gray-300">
          <LogOut size={24} />
        </button>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={toggleModal}
        position={modalPosition}
      />
    </header>
  );
};

export default Header;

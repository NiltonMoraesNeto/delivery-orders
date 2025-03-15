import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  position: { top: number; left: number; width: number };
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, position }) => {
  if (!isOpen) return null;

  const modalWidth = 300;
  const leftPosition = position.left + position.width / 2 - modalWidth / 2 - 20;

  return (
    <div
      className="fixed bg-white p-4 rounded shadow-lg z-50 max-w-full"
      style={{ top: position.top, left: leftPosition, width: modalWidth }}
    >
      <button
        className="absolute top-2 right-2 focus:outline-none"
        onClick={onClose}
      >
        <X size={24} />
      </button>
      <h2 className="text-xl mb-4 text-blue-800">User Information</h2>
      <p className="text-blue-800 break-words">Name: Nilton Moraes Neto</p>
      <p className="text-blue-800 break-words">Email: nilton@nilton.com</p>
      <p className="text-blue-800 break-words">Role: Admin</p>
    </div>
  );
};

export default Modal;

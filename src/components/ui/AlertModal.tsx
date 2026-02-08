import React from 'react';
import { Button } from './Button';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  title,
  message,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="relative w-full max-w-sm bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 p-6 transform transition-all scale-100 animate-slideUp">
        <div className="text-center">
          {title && (
            <h3 className="text-xl font-bold text-gray-900 mb-2 font-serif">
              {title}
            </h3>
          )}
          <div className="mt-2">
            <p className="text-md text-gray-600 leading-relaxed font-sans">
              {message}
            </p>
          </div>
        </div>

        <div className="mt-6">
          <Button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 rounded-xl shadow-lg shadow-indigo-200 transition-transform active:scale-95"
          >
            확인
          </Button>
        </div>
      </div>
    </div>
  );
};

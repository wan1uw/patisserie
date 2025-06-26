import React, { useEffect, useState } from "react";

interface OrderFormProps {
  onClose: () => void;
}

export default function OrderForm({ onClose }: OrderFormProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    return () => setIsVisible(false);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(onClose, 300);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end pointer-events-none">
      <div
        className={`bg-vanilla-white rounded-t-2xl shadow-2xl w-full max-w-md h-[80vh] pointer-events-auto transition-transform duration-1000 ease-out ${
          isVisible ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ marginRight: "1.5rem", marginBottom: "1rem" }}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-bold text-coffee-brown">Order Form</h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 bg-vanilla-white rounded-full flex items-center justify-center text-taupe-gray hover:text-dark-brown"
          >
            ✕
          </button>
        </div>
        <div className="p-4 overflow-y-auto h-full">
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-brown mb-1">
                Name
              </label>
              <input
                type="text"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-caramel-gold focus:border-caramel-gold"
                placeholder="Please enter your name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-brown mb-1">
                Phone
              </label>
              <input
                type="tel"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-caramel-gold focus:border-caramel-gold"
                placeholder="Please enter your phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-brown mb-1">
                Address
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-caramel-gold focus:border-caramel-gold"
                rows={3}
                placeholder="Please enter your address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-brown mb-1">
                Remark
              </label>
              <textarea
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-caramel-gold focus:border-caramel-gold"
                rows={2}
                placeholder="Special Needs or Remarks"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-caramel-gold hover:bg-pistachio-green text-white py-3 px-6 rounded-lg font-semibold transition-colors"
            >
              Order
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
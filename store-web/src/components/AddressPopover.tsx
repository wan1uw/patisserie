import React from 'react';

interface AddressPopoverProps {
  onClose: () => void;
}

export default function AddressPopover({ onClose }: AddressPopoverProps) {
  return (
    <div className="absolute bottom-16 right-0 bg-vanilla-white rounded-lg shadow-xl border w-64 p-4 z-10">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-coffee-brown">Shop Address</h3>
        <button
          onClick={onClose}
          className="text-taupe-gray hover:text-dark-brown"
        >
          ✕
        </button>
      </div>

      <div className="space-y-2 text-sm text-dark-brown">
        <p><strong>Address:</strong>Berlin, Germany</p>
        <p><strong>Phone：</strong>(02) 1234-5678</p>
        <p><strong>Open Hours：</strong></p>
        <p className="ml-4">Monday to Sunday 09:00-21:00</p>
        <p><strong>Order：</strong></p>
      </div>
      
      <div className="mt-3 pt-3 border-t">
        <button className="w-full bg-caramel-gold hover:bg-pistachio-green text-white py-2 px-4 rounded text-sm font-medium transition-colors">
          Google Maps
        </button>
      </div>

      {/* Arrow pointer */}
      <div className="absolute bottom-[-8px] right-6 w-4 h-4 bg-vanilla-white border-r border-b transform rotate-45"></div>
    </div>
  );
}
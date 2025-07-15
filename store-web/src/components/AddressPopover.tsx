import React from 'react';

interface AddressPopoverProps {
  onClose: () => void;
}

export default function AddressPopover({ onClose }: AddressPopoverProps) {
  const address = "Invalidenstraße 157, 10115 Berlin";
  const businessName = "Les Pâtisseries de Sébastien";
  const phone = "(02) 1234-5678";
  
  // Encode the address for Google Maps URLs
  const encodedAddress = encodeURIComponent(`${businessName}, ${address}`);
  
  const handleGoogleMapsClick = () => {
    // Open in new tab
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  return (
    <div className="absolute bottom-16 right-0 bg-white rounded-lg shadow-xl border w-96 p-4 z-10">
      <div className="flex justify-between items-center mb-3">
        <h3 className="font-semibold text-gray-800">Shop Address</h3>
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-800 text-lg"
        >
          ✕
        </button>
      </div>

      <div className="space-y-2 text-sm text-gray-700">
        <p><strong>Business:</strong> {businessName}</p>
        <p><strong>Address:</strong> {address}</p>
        <p><strong>Phone:</strong> {phone}</p>
        <p><strong>Open Hours:</strong> Wednesday to Sunday 09:00-17:00</p>
      </div>
      
      <div className="mt-4 mb-3">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4854.117729282835!2d13.39439227657215!3d52.532369135313814!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47a851eff7dfe529%3A0x384c7438ef8d1a8d!2sLes%20P%C3%A2tisseries%20de%20S%C3%A9bastien!5e0!3m2!1szh-TW!2sde!4v1752582620774!5m2!1szh-TW!2sde"
          width="100%"
          height="200"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="rounded"
        />
      </div>
      
      <div className="mt-3 pt-3 border-t">
        <button 
          onClick={handleGoogleMapsClick}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm font-medium transition-colors"
        >
          Open in Google Maps
        </button>
      </div>

      {/* Arrow pointer */}
      <div className="absolute bottom-[-8px] right-6 w-4 h-4 bg-white border-r border-b transform rotate-45"></div>
    </div>
  );
}
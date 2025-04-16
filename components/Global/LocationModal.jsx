import { FaMapMarkerAlt, FaTimes } from "react-icons/fa";
import { useState } from "react";

const LocationModal = ({ onClose, onSelectLocation }) => {
  const [pincode, setPincode] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const cities = [
    { name: "Mumbai", icon: "/images/mumbai.png", pincode: "400017" },
    { name: "Pune", icon: "/images/pune.png", pincode: "411001" },
    { name: "Hyderabad", icon: "/images/hyderabad.png", pincode: "500001" },
    { name: "Bengaluru", icon: "/images/bengaluru.png", pincode: "560001" },
    { name: "Chennai", icon: "/images/chennai.png", pincode: "600001" },
    { name: "Delhi", icon: "/images/delhi.png", pincode: "110001" },
    { name: "Ahmedabad", icon: "/images/ahmedabad.png", pincode: "380001" },
  ];

  const handlePincodeSubmit = (e) => {
    e.preventDefault();
    setError("");
    
    if (!pincode.trim()) {
      setError("Please enter a pincode");
      return;
    }
    
    if (pincode.length !== 6 || !/^\d+$/.test(pincode)) {
      setError("Please enter a valid 6-digit pincode");
      return;
    }

    const selectedCity = cities.find((city) => city.pincode === pincode);
    if (selectedCity) {
      onSelectLocation(selectedCity.name, pincode);
      onClose();
    } else {
      setError("Service not available in this area");
    }
  };

  const handleLocationInput = () => {
    setError("");
    setIsLoading(true);

    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      setIsLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const { latitude, longitude } = position.coords;
          
          // Use Nominatim API for reverse geocoding
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&addressdetails=1`,
            {
              headers: {
                'User-Agent': 'Zendorr Location Service'
              }
            }
          );
          
          if (!response.ok) {
            throw new Error('Failed to fetch location details');
          }

          const data = await response.json();
          const postcode = data.address?.postcode;

          if (!postcode) {
            throw new Error('Could not determine postal code from location');
          }

          setPincode(postcode);

          const selectedCity = cities.find(
            (city) => city.pincode === postcode
          );
          
          if (selectedCity) {
            onSelectLocation(selectedCity.name, postcode);
            onClose();
          } else {
            setError("Service not available in your area");
          }
        } catch (err) {
          setError("Failed to fetch location details");
          console.error("Error:", err);
        } finally {
          setIsLoading(false);
        }
      },
      (err) => {
        setError("Unable to retrieve your location");
        setIsLoading(false);
      }
    );
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 h-screen" onClick={onClose}>
      <div 
        className="bg-white w-full max-w-md rounded-xl shadow-xl transform transition-transform duration-500 ease-out translate-y-0 overflow-hidden p-6 my-auto" 
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-gray-800">
            Enter your Delivery Pincode
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <FaTimes size={16} />
          </button>
        </div>

        <div className="mb-6">
          <form onSubmit={handlePincodeSubmit} className="flex space-x-2">
            <input
              type="text"
              placeholder="Enter Pincode"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:border-gray-400 text-gray-900 placeholder:text-gray-500 text-sm"
              maxLength={6}
            />
            <button
              type="submit"
              className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-2 rounded text-sm font-medium transition-colors"
            >
              Apply
            </button>
          </form>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <button
          className="flex items-center space-x-2 text-gray-700 hover:bg-gray-50 p-3 rounded w-full transition-colors mb-6"
          onClick={handleLocationInput}
          disabled={isLoading}
        >
          <FaMapMarkerAlt className="text-gray-600" size={16} />
          <div className="text-left flex-1">
            <div className="text-sm">Get current location</div>
            <div className="text-xs text-gray-500">Using GPS</div>
          </div>
        </button>

        <div className="grid grid-cols-3 gap-4">
          {cities.map((city) => (
            <button
              key={city.name}
              onClick={() => {
                onSelectLocation(city.name, city.pincode);
                onClose();
              }}
              className="flex flex-col items-center justify-center p-3 hover:bg-gray-50 rounded transition-colors"
            >
              <div className="h-8 w-8 mb-1">
                <img 
                  src={city.icon} 
                  alt={city.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="text-xs text-gray-900">
                {city.name}
              </div>
            </button>
          ))}
        </div>

        <p className="text-xs text-gray-500 mt-4 text-center">
          Allowing permission to location helps us curate options that can be delivered to your location.
        </p>
      </div>
    </div>
  );
};

export default LocationModal;

"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Home, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";


export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    country: "India",
    state: "",
    city: "",
    pinCode: "",
    streetAddress: "",
    apartment: "",
    companyName: "",
    gstin: "",
  });

  // Add this state near other state declarations
  const [savedAddress, setSavedAddress] = useState({
    name: "BASAVOJU LAKSHMI",
    type: "HOME",
    phone: "7793939293",
    address:
      "D no:12-350, viswa brahmana bajar, Shivalayam street, KRISHNA, Andhra Pradesh",
    pincode: "521175",
  });

  const [showAddressForm, setShowAddressForm] = useState(!savedAddress);

  // ADD THIS LINE to fix the ReferenceError
  const [termsChecked, setTermsChecked] = useState(false);

  const AddressCard = ({ address, onEdit }) => {
    return (
      <div className="bg-white rounded-lg border p-4 mb-6 md:w-[50%]">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            <div className="bg-blue-100 text-blue-600 p-2 rounded">
              <Home size={20} />
            </div>
            <h3 className="font-semibold">DELIVERY ADDRESS</h3>
          </div>
          <button
            onClick={onEdit}
            className="text-blue-600 cursor-pointer hover:text-blue-700 flex items-center gap-1"
          >
            <Edit size={16} />
            <span>Deliver To New Address</span>
          </button>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-5">
            <span className="font-medium">{address.name}</span>
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded">
              {address.type}
            </span>
            <span className="text-gray-600">{address.phone}</span>
          </div>
          <p className="text-gray-600">{address.address}</p>
          <p className="text-gray-600">- {address.pincode}</p>
        </div>

        <button className="mt-4 w-full h-10  bg-blue-500 text-white rounded-lg text-sm sm:text-base font-medium">
       {`-->`}  WE'LL  DELIVER HERE
        </button>
      </div>
    );
  };

  const cartItems = [
    {
      name: "First Date",
      quantity: 3,
      price: 998,
      image:
        "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4008-1024x1536.jpg",
    },
    {
      name: "Star Dust - By The Metre, Aqua",
      quantity: 1,
      length: 5,
      price: 4740,
      image:
        "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4013-683x1024.jpg",
    },
    {
      name: "Winter Romance - 18in x 18in",
      quantity: 2,
      price: 1799,
      image:
        "https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4023-683x1024.jpg",
    },
  ];
  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
  ];
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  // Razorpay script loader
  useEffect(() => {
    if (!window.Razorpay) {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  // Razorpay payment handler
  const handleRazorpayPayment = () => {
    // If using new address, validate fields
    if (showAddressForm) {
      const requiredFields = [
        "firstName",
        "lastName",
        "email",
        "mobile",
        "state",
        "city",
        "pinCode",
        "streetAddress",
      ];
      for (const field of requiredFields) {
        if (!formData[field] || formData[field].trim() === "") {
          toast.error("Please fill all required address fields.");
          return;
        }
      }
    }
    // Validate terms checkbox for both flows
    if (!termsChecked) {
      toast.error("Please agree to the website terms and conditions.");
      return;
    }

    const options = {
      key: "YOUR_RAZORPAY_KEY_ID", // Replace with your Razorpay key
      amount: calculateTotal() * 100, // Amount in paise
      currency: "INR",
      name: "Zendorr",
      description: "Order Payment",
      image: "/logo.png", // Optional: your logo
      handler: function (response) {
        alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
        // You can call your backend here to verify payment and place order
      },
      prefill: {
        name: formData.firstName + " " + formData.lastName,
        email: formData.email,
        contact: formData.mobile,
      },
      notes: {
        address: formData.streetAddress + ", " + formData.city,
      },
      theme: {
        color: "#003f62",
      },
      modal: {
        ondismiss: function () {
          // This runs when the Razorpay modal is closed (cancelled or failed)
          document.body.style.overflow = ""; // Restore scroll
        }
      }
    };

    if (window.Razorpay) {
      const rzp = new window.Razorpay(options);
      rzp.open();
    } else {
      toast.error("Razorpay SDK failed to load. Please try again.");
    }
  };

  return (
    <div className="container mt-10  mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col lg:flex-row gap-8">
        {savedAddress && !showAddressForm ? (
          <AddressCard
            address={savedAddress}
            onEdit={() => setShowAddressForm(true)}
          />
        ) : (
          <div className="flex-1">
            <div className="mb-6">
              <div className="flex justify-between ">
                <h2 className="text-2xl font-semibold mb-4">Billing details</h2>
                <button
                  onClick={() => setShowAddressForm(false)}
                  className="text-blue-600 mb-2 cursor-pointer hover:text-blue-700 flex items-center gap-1"
                >
                  <Edit size={16} />
                  <span>Use Saved Addresses</span>
                </button>
              </div>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name *</Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      required
                      className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name *</Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      required
                      className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mobile">Mobile *</Label>
                  <div className="flex">
                    <Select defaultValue="IN" className="w-[100px]">
                      <SelectTrigger className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500">
                        <SelectValue placeholder="🇮🇳 +91" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="IN">🇮🇳 +91</SelectItem>
                      </SelectContent>
                    </Select>
                    <Input
                      type="tel"
                      id="mobile"
                      name="mobile"
                      className="flex-1 ml-2 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      value={formData.mobile}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* Address Fields */}
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="country">Country / Region *</Label>
                      <Select defaultValue="India">
                        <SelectTrigger className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          <SelectItem value="India">India</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Select
                        name="state"
                        value={formData.state}
                        onValueChange={(value) =>
                          handleInputChange({
                            target: { name: "state", value },
                          })
                        }
                      >
                        <SelectTrigger className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500">
                          <SelectValue placeholder="Select state" />
                        </SelectTrigger>
                        <SelectContent className="bg-white">
                          {indianStates.map((state) => (
                            <SelectItem key={state} value={state}>
                              {state}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">Town / City *</Label>
                      <Input
                        id="city"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                        required
                        className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pinCode">PIN Code *</Label>
                      <Input
                        id="pinCode"
                        name="pinCode"
                        value={formData.pinCode}
                        onChange={handleInputChange}
                        required
                        className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="streetAddress">Street address *</Label>
                    <Input
                      id="streetAddress"
                      name="streetAddress"
                      value={formData.streetAddress}
                      onChange={handleInputChange}
                      placeholder="House number and street name"
                      required
                      className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="apartment">
                      Apartment, suite, unit, etc. (optional)
                    </Label>
                    <Input
                      id="apartment"
                      name="apartment"
                      value={formData.apartment}
                      onChange={handleInputChange}
                      className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="companyName">Company name (optional)</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="gstin">GSTIN (optional)</Label>
                    <Input
                      id="gstin"
                      name="gstin"
                      value={formData.gstin}
                      onChange={handleInputChange}
                      className="focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
                <button className="w-full h-12  py-2 sm:py-4 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base font-medium">
              {`-->`} We'll Use this address
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Order Summary */}
        <div className="lg:w-[500px]">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-4">Your order</h3>
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 py-2 border-b"
                >
                  <div className="w-16 h-16 relative">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover rounded"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium">{item.name}</h4>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.quantity}{" "}
                      {item.length && `× ${item.length}m`}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">₹{item.price}</p>
                  </div>
                </div>
              ))}

              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <span>₹{calculateTotal()}</span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Shipping</span>
                  <span>Free shipping</span>
                </div>
                <div className="flex justify-between font-semibold text-lg mt-4 pt-4 border-t">
                  <span>Total</span>
                  <span>₹{calculateTotal()}</span>
                </div>
              </div>

              <div className="space-y-4 mt-6">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="terms"
                    checked={termsChecked}
                    onCheckedChange={setTermsChecked}
                  />
                  <Label htmlFor="terms" className="text-sm">
                    I have read and agree to the website terms and conditions *
                  </Label>
                </div>
                {/* Razorpay Button */}
                <Button
                  className="w-full bg-[#003f62] hover:bg-[#003f62]/90 text-white py-6"
                  size="lg"
                  type="button"
                  onClick={handleRazorpayPayment}
                >
                  Pay with Razorpay
                </Button>
                <div className="flex items-center justify-center gap-4 mt-4">
                  <Image
                    src="/razorpay-logo.png"
                    alt="Razorpay"
                    width={100}
                    height={30}
                  />
                  <div className="text-sm text-gray-600">
                    Secure payments by Razorpay
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
export function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  );
}

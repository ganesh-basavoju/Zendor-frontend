"use client";
import { useState } from 'react';
import { MoreVertical, Printer, ArrowLeft, Download, User, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation';

const OrderDetails = () => {
  const router = useRouter();
  const [status, setStatus] = useState('Pending');

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-4 mb-2">
          <button 
            onClick={() => router.back()}
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl md:text-2xl font-semibold text-gray-800">Order Details</h1>
        </div>
        <div className="text-sm text-gray-500">Home &gt; Order List &gt; Order Details</div>
      </div>

      {/* Order Info Card */}
      <div className="bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h2 className="text-lg font-semibold">Order #6743</h2>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                status === 'Pending' ? 'bg-orange-100 text-orange-700' :
                status === 'Delivered' ? 'bg-green-100 text-green-700' :
                'bg-red-100 text-red-700'
              }`}>
                {status}
              </span>
            </div>
            <div className="text-sm text-gray-500">Placed on Feb 16, 2022 at 10:45 AM</div>
          </div>
          <div className="flex flex-wrap gap-3">
            <select 
              className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="Pending">Pending</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <button className="border rounded-lg px-4 py-2 hover:bg-gray-50 transition-colors">
              <Printer size={20} />
            </button>
            <button className="bg-[#003f62] text-white rounded-lg px-6 py-2 hover:bg-[#003f62]/90 transition-colors">
              Save Changes
            </button>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {/* Customer Info */}
          <div className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Customer</h3>
              <User size={18} className="text-gray-400" />
            </div>
            <div className="space-y-2 text-sm">
              <p className="font-medium">Shristi Singh</p>
              <p className="text-gray-600">shristi@gmail.com</p>
              <p className="text-gray-600">+91 904 231 1212</p>
            </div>
            <button className="mt-4 text-[#003f62] text-sm font-medium hover:underline">
              View Profile
            </button>
          </div>

          {/* Order Info */}
          <div className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Order Info</h3>
              <Download size={18} className="text-gray-400" />
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className="font-medium">Next Express</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment</span>
                <span className="font-medium">PayPal</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status</span>
                <span className="font-medium">{status}</span>
              </div>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium">Delivery Address</h3>
              <MapPin size={18} className="text-gray-400" />
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p>Dharam Colony,</p>
              <p>Palam Vihar, Gurgaon,</p>
              <p>Haryana - 122017</p>
            </div>
            <button className="mt-4 text-[#003f62] text-sm font-medium hover:underline">
              View on Map
            </button>
          </div>
        </div>

        {/* Products Table */}
        <div className="mt-8">
          <h3 className="font-medium mb-4">Order Items</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 text-sm">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-600">Product</th>
                  <th className="text-center p-4 font-medium text-gray-600">Quantity</th>
                  <th className="text-right p-4 font-medium text-gray-600">Price</th>
                  <th className="text-right p-4 font-medium text-gray-600">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {[...Array(2)].map((_, i) => (
                  <tr key={i} className="hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-16 bg-gray-100 rounded-lg"></div>
                        <div>
                          <p className="font-medium">Product Name</p>
                          <p className="text-sm text-gray-500">SKU: #123456</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-center">2</td>
                    <td className="p-4 text-right">₹400.20</td>
                    <td className="p-4 text-right font-medium">₹800.40</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="border-t">
                  <td colSpan="3" className="p-4 text-right">Subtotal</td>
                  <td className="p-4 text-right font-medium">₹1,600.80</td>
                </tr>
                <tr>
                  <td colSpan="3" className="p-4 text-right">Tax (18%)</td>
                  <td className="p-4 text-right font-medium">₹288.14</td>
                </tr>
                <tr>
                  <td colSpan="3" className="p-4 text-right">Shipping</td>
                  <td className="p-4 text-right font-medium">₹50.00</td>
                </tr>
                <tr className="border-t">
                  <td colSpan="3" className="p-4 text-right text-lg">Total</td>
                  <td className="p-4 text-right text-lg font-bold">₹1,938.94</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Notes Section */}
        <div className="mt-8">
          <h3 className="font-medium mb-3">Order Notes</h3>
          <textarea 
            className="w-full border rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#003f62] focus:border-transparent"
            placeholder="Add a note about this order..."
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};

export default OrderDetails;
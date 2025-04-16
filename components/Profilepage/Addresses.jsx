import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Edit2, Plus, X } from "lucide-react";

const addressSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  company: z.string().optional(),
  country: z.string().min(1, "Country is required"),
  state: z.string().min(1, "State is required"),
  city: z.string().min(1, "City is required"),
  pinCode: z.string().min(6, "PIN Code must be 6 digits").max(6),
  street: z.string().min(1, "Street address is required"),
  phone: z.string()
    .min(12, "Phone must be +91 followed by 10 digits")
    .max(12)
    .regex(/^\+91\d{10}$/, "Phone must be +91 followed by 10 digits"),
  email: z.string().email("Invalid email address"),
});

const AddressForm = ({ title, onSave, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      phone: "+91"
    }
  });

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-lg border-0">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center gap-2">
          <MapPin className="w-5 h-5" />
          <span>{title}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit(onSave)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                {...register("firstName")}
                placeholder="First Name"
                className={errors.firstName ? "border-red-500" :"focus:border-blue-500 border focus:ring focus:ring-blue-200"}
              />
              {errors.firstName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.firstName.message}
                </p>
              )}
            </div>
            <div>
              <Input
                {...register("lastName")}
                placeholder="Last Name"
                className={errors.lastName ? "border-red-500" : "focus:border-blue-500 border focus:ring focus:ring-blue-200"}
              />
              {errors.lastName && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.lastName.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Input
              {...register("company")}
              placeholder="Company Name (optional)"
              className={"focus:border-blue-500 border focus:ring focus:ring-blue-200"}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                {...register("country")}
                placeholder="Country / Region"
                className={errors.country ? "border-red-500" : "focus:border-blue-500 border focus:ring focus:ring-blue-200"}
              />
              {errors.country && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.country.message}
                </p>
              )}
            </div>
            <div>
              <Input
                {...register("state")}
                placeholder="State"
                className={errors.state ? "border-red-500" : "focus:border-blue-500 border focus:ring focus:ring-blue-200"}
              />
              {errors.state && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.state.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                {...register("city")}
                placeholder="City"
                className={errors.city ? "border-red-500" : "focus:border-blue-500 border focus:ring focus:ring-blue-200"}
              />
              {errors.city && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.city.message}
                </p>
              )}
            </div>
            <div>
              <Input
                {...register("pinCode")}
                placeholder="PIN Code"
                className={errors.pinCode ? "border-red-500" : "focus:border-blue-500 border focus:ring focus:ring-blue-200"}
                maxLength={6}
              />
              {errors.pinCode && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.pinCode.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Input
              {...register("street")}
              placeholder="Street Address"
              className={errors.street ? "border-red-500" : "focus:border-blue-500 border focus:ring focus:ring-blue-200"}
            />
            {errors.street && (
              <p className="mt-1 text-sm text-red-500">
                {errors.street.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Input
                {...register("phone")}
                placeholder="Phone (+91xxxxxxxxxx)"
                className={errors.phone ? "border-red-500" : "focus:border-blue-500 border focus:ring focus:ring-blue-200"}
                maxLength={12}
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div>
              <Input
                {...register("email")}
                placeholder="Email Address"
                className={errors.email ? "border-red-500" : "focus:border-blue-500 border focus:ring focus:ring-blue-200"}
                type="email"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              className="flex items-center gap-2"
            >
              <X className="w-4 h-4" />
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-[#0a2d44] hover:bg-[#0a2d44]/90 text-white"
            >
              Save Address
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export function Addresses() {
  const [showBillingForm, setShowBillingForm] = useState(false);
  const [showShippingForm, setShowShippingForm] = useState(false);

  const handleSave = (data) => {
    console.log("Saved Address:", data);
    setShowBillingForm(false);
    setShowShippingForm(false);
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        Address Book
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="w-full">
          {showBillingForm ? (
            <AddressForm 
              title="Billing Address" 
              onSave={handleSave} 
              onCancel={() => setShowBillingForm(false)}
            />
          ) : (
            <Card className="w-full h-full bg-white/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 border-0">
              <CardHeader className="border-b border-gray-100 bg-gray-50/50">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>Billing Address</span>
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowBillingForm(true)}
                    className="flex items-center gap-1 hover:bg-gray-100"
                  >
                    <Edit2 className="w-4 h-4" />
                    <span>Edit</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-2 text-gray-600">
                  <p className="font-medium text-gray-900">Example Name</p>
                  <p>123 Street Name</p>
                  <p>City, State, 12345</p>
                  <p className="flex items-center gap-2">
                    <span className="text-gray-400">Phone:</span>
                    +911234567890
                  </p>
                  <p className="flex items-center gap-2">
                    <span className="text-gray-400">Email:</span>
                    example@email.com
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="w-full">
          {showShippingForm ? (
            <AddressForm 
              title="Shipping Address" 
              onSave={handleSave} 
              onCancel={() => setShowShippingForm(false)}
            />
          ) : (
            <Card className="w-full h-full bg-white/50 backdrop-blur-sm shadow-md hover:shadow-lg transition-all duration-300 border-0">
              <CardHeader className="border-b border-gray-100 bg-gray-50/50">
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center gap-2 text-gray-800">
                    <MapPin className="w-5 h-5 text-primary" />
                    <span>Shipping Address</span>
                  </CardTitle>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => setShowShippingForm(true)}
                    className="flex items-center gap-1 hover:bg-gray-100"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Add</span>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="flex items-center justify-center h-[200px] text-gray-500">
                  <p>No shipping address set</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
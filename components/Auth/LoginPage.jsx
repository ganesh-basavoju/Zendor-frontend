"use client";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import Image from "next/image";
import { FcGoogle } from 'react-icons/fc';

const LoginPage = ({ onSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
    rememberMe: false,
  });

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
      {/* Left: Form Section */}
      <div className="flex flex-1 items-center justify-center px-4 py-8 md:px-8 lg:px-16 order-2 md:order-1">
        <div className="w-full max-w-md md:max-w-lg lg:max-w-xl space-y-8 bg-white rounded-2xl shadow-lg p-6 md:p-10">
          {/* Logo or Brand Name */}
          <div className="text-center mb-6">
            <h2 className="text-3xl md:text-4xl font-bold text-[#003f62] mb-2">Zendorr</h2>
            <p className="text-gray-600 text-base md:text-lg">Your Home Decor Destination</p>
          </div>

          {/* Toggle Buttons */}
          <div className="flex gap-2 mb-8 p-1 bg-gray-100 rounded-lg">
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                isLogin 
                ? 'bg-[#003f62] text-white shadow-lg' 
                : 'hover:bg-gray-200 text-gray-600'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2.5 rounded-lg font-medium transition-all duration-300 ${
                !isLogin 
                ? 'bg-[#003f62] text-white shadow-lg' 
                : 'hover:bg-gray-200 text-gray-600'
              }`}
            >
              Register
            </button>
          </div>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Email or Phone Number</label>
              <input
                type="text"
                placeholder="Enter your email or phone"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003f62]/20 focus:border-[#003f62] transition-all"
                value={formData.emailOrPhone}
                onChange={(e) => setFormData({ ...formData, emailOrPhone: e.target.value })}
              />
            </div>

            {!isLogin && (
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003f62]/20 focus:border-[#003f62] transition-all"
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#003f62]/20 focus:border-[#003f62] transition-all"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#003f62] transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {isLogin ? (
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-gray-300 text-[#003f62] focus:ring-[#003f62]"
                    checked={formData.rememberMe}
                    onChange={(e) => setFormData({ ...formData, rememberMe: e.target.checked })}
                  />
                  <span className="text-sm text-gray-600">Remember me</span>
                </label>
                <a href="#" className="text-sm text-[#003f62] hover:underline font-medium">
                  Forgot Password?
                </a>
              </div>
            ) : (
              <div className="text-sm text-gray-500">
                By registering, you agree to our{' '}
                <a href="#" className="text-[#003f62] hover:underline">Terms of Service</a>
                {' '}and{' '}
                <a href="#" className="text-[#003f62] hover:underline">Privacy Policy</a>
              </div>
            )}

            <button 
              type="button"
              className="w-full py-3.5 bg-[#003f62] text-white rounded-lg hover:bg-[#003f62]/90 transition-all duration-300 shadow-lg hover:shadow-xl font-medium text-lg"
            >
              {isLogin ? 'Sign In' : 'Create Account'}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-white px-2 text-gray-500">Or continue with</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                // Implement Google login logic here
                console.log('Google login clicked');
              }}
              className="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
            >
              <FcGoogle className="h-5 w-5" />
              <span>Sign in with Google</span>
            </button>

            <p className="text-center text-sm text-gray-600 pt-1">
              {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
              <button 
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-[#003f62] hover:underline font-medium"
              >
                {isLogin ? 'Create one now' : 'Sign in here'}
              </button>
            </p>
          </form>
        </div>
      </div>

      {/* Right: Image Section */}
      <div className="relative flex-1 min-h-[220px] md:min-h-0 md:h-auto order-1 md:order-2">
        <div className="absolute inset-0 bg-[#003f62]/30 z-10" />
        <Image
          src="https://150751433.v2.pressablecdn.com/wp-content/uploads/2024/08/WP4008-1024x1536.jpg"
          alt="Decorative background"
          fill
          className="object-cover rounded-b-2xl md:rounded-none md:rounded-l-2xl"
          priority
        />
        <div className="absolute inset-0 flex items-center justify-center z-20 p-4">
          <div className="text-center text-white p-6 md:p-8 bg-[#003f62]/40 backdrop-blur-sm rounded-xl max-w-md w-full">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">Welcome to Zendorr</h2>
            <p className="text-base md:text-lg">Transform your space with our premium collection</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
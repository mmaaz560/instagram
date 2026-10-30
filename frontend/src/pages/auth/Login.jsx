import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [formField, setFormField] = useState({
      email: "",
      password: "",    
    });
  const {email, password} = formField;
   const handleChange = (e) => {
    setFormField({
      ...formField,
      [e.target.name]: e.target.value,
      
    });
  };

  return (
    <div className="min-h-screen bg-[#fafafa] flex flex-col items-center justify-center px-4 pt-10 pb-20">
      
      {/* Main Container */}
      <div className="flex w-full max-w-212.5 justify-center items-center gap-10">
        
        {/* Left Side: Phone Mockup (Sirf Desktop par dikhega) */}
                {/* Left Side: Instagram Brand Color Box */}
        <div className="hidden lg:flex w-95 h-145 relative rounded-[40px] shadow-2xl overflow-hidden bg-linear-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7] items-center justify-center border-3 border-gray-900">
          
          {/* Bada 'I' Letter */}
          <h1 className="text-[280px] font-bold text-white font-serif italic tracking-tighter drop-shadow-2xl translate-y-4">
            I
          </h1>

          {/* Neeche chota sa Instagram text (Optional) */}
          <div className="absolute bottom-10 w-full text-center text-white/80 font-serif italic text-xl  tracking-widest">
            Instagram
          </div>
        </div>

        {/* Right Side: Login Form */}
        <div className="w-full max-w-87.5 flex flex-col gap-4">
          
          {/* Login Box */}
          <div className="bg-white border border-gray-300 px-10 py-10 flex flex-col items-center">
            
            {/* Logo */}
            <h1 className="text-4xl font-bold font-serif italic tracking-tight mb-8">
              Instagram
            </h1>

            {/* Form */}
            <form className="w-full flex flex-col gap-2">
              <input
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                placeholder="Phone number, username, or email"
                className="w-full bg-[#fafafa] border border-gray-300 text-xs rounded-[3px] px-3 py-2.5 outline-none focus:border-gray-400"
              />
              <input
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full bg-[#fafafa] border border-gray-300 text-xs rounded-[3px] px-3 py-2.5 outline-none focus:border-gray-400"
              />
              
              <button
                type="button"
                className="w-full bg-[#0095f6] text-white font-semibold text-sm rounded-lg py-1.5 mt-3 hover:bg-[#1877f2] transition-colors"
              >
                Log in
              </button>
            </form>

            {/* Divider */}
            <div className="flex items-center w-full my-4">
              <div className="flex-1 h-px bg-gray-300"></div>
              <span className="px-4 text-xs font-semibold text-gray-500">OR</span>
              <div className="flex-1 h-px bg-gray-300"></div>
            </div>

            {/* Facebook Login */}
            <button className="flex items-center gap-2 text-[#385185] font-semibold text-sm hover:opacity-80 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="#385185"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Log in with Facebook
            </button>

            {/* Forgot Password */}
            <Link to="/forgot-password" className="text-xs text-[#00376b] mt-5 hover:underline">
              Forgot password?
            </Link>
          </div>

          {/* Sign Up Box */}
          <div className="bg-white border border-gray-300 py-5 text-center text-sm">
            Don't have an account?{" "}
            <Link to="/signup" className="text-[#0095f6] font-semibold hover:underline">
              Sign up
            </Link>
          </div>

          {/* Get the App */}
          <div className="flex flex-col items-center mt-2 gap-4">
            <p className="text-sm">Get the app.</p>
            <div className="flex gap-2">
              {/* ✅ Google Play Store ki working image */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                alt="Get it on Google Play"
                className="h-10 cursor-pointer"
              />
              {/* ✅ Apple App Store ki working image */}
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg"
                alt="Get it on App Store"
                className="h-10 cursor-pointer"
              />
            </div>
          </div>

        </div>
      </div>

      {/* Footer (Desktop) */}
      <div className="mt-16 text-xs text-gray-500 flex flex-wrap justify-center gap-4 max-w-212.5">
        <span className="cursor-pointer hover:underline">Meta</span>
        <span className="cursor-pointer hover:underline">About</span>
        <span className="cursor-pointer hover:underline">Blog</span>
        <span className="cursor-pointer hover:underline">Jobs</span>
        <span className="cursor-pointer hover:underline">Help</span>
        <span className="cursor-pointer hover:underline">API</span>
        <span className="cursor-pointer hover:underline">Privacy</span>
        <span className="cursor-pointer hover:underline">Terms</span>
        <span className="cursor-pointer hover:underline">Locations</span>
        <span className="cursor-pointer hover:underline">Instagram Lite</span>
        <span className="cursor-pointer hover:underline">Threads</span>
        <span className="cursor-pointer hover:underline">Contact Uploading & Non-Users</span>
        <span className="mt-2 w-full text-center">English <span className="ml-2">© 2024 Instagram from Meta</span></span>
      </div>

    </div>
  );
};

export default Login;
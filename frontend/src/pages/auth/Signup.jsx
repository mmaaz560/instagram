import { useEffect, useState } from "react";
import {
  FaInstagram,
  FaUser,
  FaEnvelope,
  FaLock,
  FaCalendarAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { registerUser, userReset } from "../../redux/user/usersSlice";
import toast from 'react-hot-toast'; 
import {useNavigate} from 'react-router-dom'
const Signup = () => {
  const [formField, setFormField] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
    dob: "",
  });

  const { name, username, email, password, dob } = formField;
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const{usererror,usermessage,usersuccess , user}= useSelector((state)=>state.auth)
  useEffect(()=>{
    if(usererror){
      toast.error(usermessage) 
           dispatch(userReset())

    }

    if(usersuccess){
  navigate(`/otp-verification/1?email=${encodeURIComponent(email)}`)   // ✅ email URL mein
  toast.success('OTP has been sent on your Email')
  dispatch(userReset())
}
  },[usererror , usersuccess])
  

  const handleChange = (e) => {
    setFormField({
      ...formField,
      [e.target.name]: e.target.value,
      
    });
    
  };

  // Dono functions ko merge kar ke ek handleSubmit bana diya hai
  const handleSubmit = (e) => {
    e.preventDefault();
    // 2. Backend ke hisaab se data ready karein
    const userdata = {
      m_mail: email,
      name,
      username,
      password,
      b_day: dob,
    };

    // 3. Redux action dispatch karein
    dispatch(registerUser(userdata));
  };

   useEffect(()=>{
     if(user){
      navigate('/home')
     }
   },[navigate])
   if(user){
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <img src="https://i.pinimg.com/564x/4d/25/c5/4d25c55d4dba4db66d12c193343440d4.jpg" width={300} alt="" />
      </div>
    )
   }
  
  return (
    <div className="signup-page min-h-screen flex flex-col items-center justify-center px-4 py-10">
      {/* Background blobs */}
      <div className="bg-blob blob-1" />
      <div className="bg-blob blob-2" />
      <div className="bg-blob blob-3" />

      {/* Main Card */}
      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-xl border border-white/60 rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.15)] px-8 sm:px-10 py-10 animate-card-in">
        {/* Gradient ring logo (Fixed Tailwind classes) */}
        <div className="flex justify-center mb-5 animate-logo-pop">
          <div className="p-3px rounded-2xl bg-linear-to-tr from-yellow-400 via-pink-500 to-purple-600 shadow-lg shadow-pink-500/20">
            <div className="bg-white rounded-[13px] p-3">
              <FaInstagram className="text-3xl text-gray-800" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <h1 className="text-center text-gray-800 font-bold text-xl mb-1 animate-fade-up stagger-1">
          Create your account
        </h1>
        <p className="text-center text-gray-500 text-sm mb-7 animate-fade-up stagger-1">
          Sign up to see photos and videos from your friends.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          {/* Name */}
          <div className="relative animate-fade-up stagger-2">
            <FaUser className="input-icon" />
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleChange}
              placeholder="Full Name"
              autoComplete="name"
              className="input-modern"
            />
          </div>

          {/* Username */}
          <div className="relative animate-fade-up stagger-3">
            <span className="input-icon font-semibold text-base">@</span>
            <input
              type="text"
              name="username"
              value={username}
              onChange={handleChange}
              placeholder="Username"
              autoComplete="username"
              minLength={3}
              className="input-modern"
            />
          </div>

          {/* Email */}
          <div className="relative animate-fade-up stagger-4">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              name="email"
              value={email}
              onChange={handleChange}
              placeholder="Email address"
              autoComplete="email"
              className="input-modern"
            />
          </div>

          {/* Password */}
          <div className="relative animate-fade-up stagger-5">
            <FaLock className="input-icon" />
            <input
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Password"
              autoComplete="new-password"
              minLength={6}
              className="input-modern"
            />
          </div>

          {/* Date of Birth */}
          <div className="relative animate-fade-up stagger-6">
            <FaCalendarAlt className="input-icon" />
            <input
              type="date"
              name="dob"
              value={dob}
              onChange={handleChange}
              max={new Date().toISOString().split("T")[0]}
              className="input-modern input-date text-gray-700"
            />
          </div>

          {/* Submit Button (onClick hataya, type="submit" lagaya) */}
          <button
            onClick={handleSubmit}
            className="btn-gradient w-full text-white font-semibold text-sm rounded-xl py-3 mt-2 animate-fade-up stagger-7"
          >
            Sign up
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 my-2 animate-fade-up stagger-7">
            <div className="h-px flex-1 bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">OR</span>
            <div className="h-px flex-1 bg-gray-200" />
          </div>

          {/* Terms */}
          <p className="text-[11px] text-gray-400 text-center leading-5 animate-fade-up stagger-8">
            By signing up, you agree to our{" "}
            <span className="font-semibold text-gray-600 cursor-pointer hover:text-[#0095f6] transition-colors">
              Terms
            </span>
            ,{" "}
            <span className="font-semibold text-gray-600 cursor-pointer hover:text-[#0095f6] transition-colors">
              Privacy Policy
            </span>{" "}
            and{" "}
            <span className="font-semibold text-gray-600 cursor-pointer hover:text-[#0095f6] transition-colors">
              Cookies Policy
            </span>
            .
          </p>
        </form>
      </div>

      {/* Login link card */}
      <div className="relative z-10 w-full max-w-md bg-white/90 backdrop-blur-xl border border-white/60 rounded-2xl shadow-[0_10px_30px_-12px_rgba(0,0,0,0.1)] mt-4 py-4 text-center text-sm animate-card-in-delay hover:shadow-[0_14px_36px_-12px_rgba(0,0,0,0.15)] transition-shadow">
        Have an account?{" "}
        <a
          href="/login"
          className="text-[#0095f6] font-semibold hover:text-[#1877f2] transition-colors relative inline-block group"
        >
          Log in
          <span className="absolute left-0 -bottom-0.5 h-px w-0 bg-[#1877f2] transition-all duration-300 group-hover:w-full"></span>
        </a>
      </div>

      {/* Footer */}
      <footer className="relative z-10 mt-8 text-xs text-gray-400 text-center animate-fade-up stagger-8">
        Instagram · Meta © {new Date().getFullYear()}
      </footer>

      {/* Styles */}
      <style>{`
        .signup-page {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(1200px 600px at 10% 0%, #fdf2f8 0%, transparent 55%),
            radial-gradient(900px 500px at 90% 100%, #eff6ff 0%, transparent 55%),
            #f9fafb;
        }

        .bg-blob {
          position: absolute;
          border-radius: 9999px;
          filter: blur(70px);
          opacity: 0.55;
          pointer-events: none;
          animation: floatBlob 14s ease-in-out infinite;
        }
        .blob-1 {
          width: 320px; height: 320px; top: -80px; left: -80px;
          background: linear-gradient(135deg, #f9ce34, #ee2a7b);
        }
        .blob-2 {
          width: 300px; height: 300px; bottom: -100px; right: -60px;
          background: linear-gradient(135deg, #6228d7, #0095f6);
          animation-delay: -4s;
        }
        .blob-3 {
          width: 220px; height: 220px; top: 40%; right: 8%;
          background: linear-gradient(135deg, #ee2a7b, #6228d7);
          opacity: 0.35;
          animation-delay: -8s;
        }
        @keyframes floatBlob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%      { transform: translate(20px, -20px) scale(1.08); }
          66%      { transform: translate(-15px, 15px) scale(0.95); }
        }

        .animate-card-in {
          animation: cardIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes cardIn {
          from { opacity: 0; transform: translateY(24px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0)    scale(1); }
        }
        .animate-card-in-delay {
          animation: cardIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) 0.15s both;
        }

        .animate-logo-pop {
          animation: logoPop 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both;
        }
        @keyframes logoPop {
          0%   { opacity: 0; transform: scale(0.6) rotate(-12deg); }
          70%  { opacity: 1; transform: scale(1.1) rotate(3deg); }
          100% { opacity: 1; transform: scale(1) rotate(0); }
        }

        .animate-fade-up {
          animation: fadeUp 0.5s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .stagger-1 { animation-delay: 0.08s; }
        .stagger-2 { animation-delay: 0.14s; }
        .stagger-3 { animation-delay: 0.20s; }
        .stagger-4 { animation-delay: 0.26s; }
        .stagger-5 { animation-delay: 0.32s; }
        .stagger-6 { animation-delay: 0.38s; }
        .stagger-7 { animation-delay: 0.44s; }
        .stagger-8 { animation-delay: 0.52s; }

        .input-modern {
          width: 100%;
          font-size: 0.875rem;
          background: #f8fafc;
          border: 1.5px solid #e5e7eb;
          border-radius: 12px;
          padding: 0.75rem 1rem 0.75rem 2.75rem;
          color: #111827;
          transition: border-color 0.2s, box-shadow 0.2s,
                      background 0.2s, transform 0.15s;
          outline: none;
        }
        .input-modern::placeholder { color: #9ca3af; }
        .input-modern:hover { background: #f9fafb; }
        .input-modern:focus {
          border-color: #0095f6;
          background: #ffffff;
          box-shadow: 0 0 0 4px rgba(0, 149, 246, 0.12);
          transform: translateY(-1px);
        }

        .input-date {
          padding-left: 2.75rem;
          color-scheme: light;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          top: 50%;
          transform: translateY(-50%);
          color: #9ca3af;
          font-size: 0.85rem;
          pointer-events: none;
          transition: color 0.2s, transform 0.2s;
        }
        .relative:focus-within .input-icon {
          color: #0095f6;
          transform: translateY(-50%) scale(1.08);
        }

        .btn-gradient {
          background: linear-gradient(135deg, #f9ce34 0%, #ee2a7b 50%, #6228d7 100%);
          background-size: 200% 200%;
          transition: transform 0.15s ease, box-shadow 0.25s ease,
                      background-position 0.5s ease;
          box-shadow: 0 8px 20px -8px rgba(238, 42, 123, 0.55);
        }
        .btn-gradient:hover {
          background-position: 100% 0;
          box-shadow: 0 12px 26px -8px rgba(238, 42, 123, 0.65);
          transform: translateY(-1px);
        }
        .btn-gradient:active {
          transform: scale(0.98);
        }

        @media (prefers-reduced-motion: reduce) {
          .animate-card-in,
          .animate-card-in-delay,
          .animate-logo-pop,
          .animate-fade-up,
          .bg-blob {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

export default Signup;
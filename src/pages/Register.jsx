import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User } from "lucide-react";
import Button from "../components/Button.jsx";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { toast } from "react-toastify";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "attendee", // ALWAYS attendee
    address: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth,
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    // ✅ Force role = attendee (extra safety)
    const updatedData = {
      ...formData,
      role: "attendee",
    };

    dispatch(registerUser(updatedData));
  };

  useEffect(() => {
    if (isError) {
      toast.error(message);
      setError(message);
    }

    if (isSuccess) {
      toast.success("Account Created Successfully");
      navigate("/");
    }

  }, [isError, isSuccess, message, dispatch, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10 bg-gradient-to-br from-red-50 to-white">
      <div className="max-w-md w-full">
        <div className="text-center mb-3">
          <h2 className="text-3xl font-bold text-red-600">Create Account</h2>
          <p className="mt-2 text-gray-600">Join Utsav AI today</p>
        </div>
        <div className="bg-white rounded-xl shadow-lg p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  placeholder="Name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  placeholder="Email"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  name="password"
                  type="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
                  placeholder="Password"
                />
              </div>
            </div>

            {/* ❌ ROLE DROPDOWN REMOVED */}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full cursor-pointer"
            >
              {isLoading ? "Creating account..." : "Register"}
            </Button>
          </form>

          <p className="mt-4 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-red-500 hover:text-red-600 font-medium"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;











// import { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Mail, Lock, User, CircleUser as UserCircle } from "lucide-react";
// import Button from "../components/Button.jsx";
// import { useDispatch, useSelector } from "react-redux";
// import { registerUser } from "../features/auth/authSlice";
// import { toast } from "react-toastify";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     password: "",
//     role: "attendee",
//     address: "",
//   });

//   const [error, setError] = useState("");
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const { isLoading, isError, isSuccess, message } = useSelector(
//     (state) => state.auth,
//   );

//   const handleChange = (e) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError("");
//     dispatch(registerUser(formData));
//   };

//   useEffect(() => {
//     if (isError) {
//       toast.error(message);
//       setError(message);
//     }

//     if (isSuccess) {
//       toast.success("Account Created Successfully");
//       navigate("/");
//     }

//     // dispatch(reset());
//   }, [isError, isSuccess, message, dispatch, navigate]);

//   return (
//     <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-10 bg-gradient-to-br from-red-50 to-white">
//       <div className="max-w-md w-full">
//         <div className="text-center mb-3">
//           <h2 className="text-3xl font-bold text-red-600">Create Account</h2>
//           <p className="mt-2 text-gray-600">Join Utsav AI today</p>
//         </div>
//         <div className="bg-white rounded-xl shadow-lg p-8">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {error && (
//               <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
//                 {error}
//               </div>
//             )}

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Full Name
//               </label>
//               <div className="relative">
//                 <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   name="name"
//                   type="text"
//                   required
//                   value={formData.name}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
//                   placeholder="Name"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Email Address
//               </label>
//               <div className="relative">
//                 <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   name="email"
//                   type="email"
//                   required
//                   value={formData.email}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
//                   placeholder="Email"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Password
//               </label>
//               <div className="relative">
//                 <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <input
//                   name="password"
//                   type="password"
//                   required
//                   value={formData.password}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none"
//                   placeholder="Password"
//                 />
//               </div>
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 Role
//               </label>
//               <div className="relative">
//                 <UserCircle className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
//                 <select
//                   name="role"
//                   value={formData.role}
//                   onChange={handleChange}
//                   className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 outline-none appearance-none bg-white"
//                 >
//                   <option value="attendee">Attendee</option>
//                   <option value="organizer">Organizer</option>
//                 </select>
//               </div>
//             </div>

//             <Button
//               type="submit"
//               disabled={isLoading}
//               className="w-full cursor-pointer"
//             >
//               {isLoading ? "Creating account..." : "Register"}
//             </Button>
//           </form>

//           <p className="mt-4 text-center text-sm text-gray-600">
//             Already have an account?{" "}
//             <Link
//               to="/login"
//               className="text-red-500 hover:text-red-600 font-medium"
//             >
//               Login
//             </Link>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Register;
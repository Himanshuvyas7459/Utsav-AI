import { Link, useNavigate } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-gray-900">Utsav AI</span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/events" className="text-gray-700 hover:text-red-500">
              Events
            </Link>

            {user ? (
              <>
                {/* Role based UI  */}
                {user?.role === "attendee" && (
                  <Link
                    to="/my-bookings"
                    className="text-gray-700 hover:text-red-500"
                  >
                    My Bookings
                  </Link>
                )}
               {/* <Link to={user?.isAdmin ? "/admin/dashboard" : "/"}>
                  {" "}
                  <h1> Welcome {user?.name}</h1>{" "}
                </Link> */}
               
                {user?.role === "organizer" && (
                  <Link
                    to="/ai-planner"
                    className="text-gray-700 hover:text-red-500"
                  >
                    AI Planner
                  </Link>
                )}

                {user?.role === "organizer" && (
                  <Link
                    to="/organizer/dashboard"
                    className="text-gray-700 hover:text-red-500"
                  >
                    Dashboard
                  </Link>
                  
                )}
                

                {user?.role === "admin" && (
                  <Link
                  to="/ai-planner"
                  className="text-gray-700 hover:text-red-500"
                  >
                    AI Planner
                  </Link>
                )}
                {user?.role === "admin" && (
  <button
    onClick={() => navigate("/admin/organizer-requests")}
    className="text-gray-700 hover:text-red-500 cursor-pointer"
  >
    Organizer Requests
  </button>
)}
                {user?.role === "admin" && (
                  <Link
                  to="/admin/dashboard"
                  className="text-gray-700 hover:text-red-500"
                  >
                    Admin
                  </Link>
                )}
                <h1> Welcome {user?.name}</h1>{" "}

                <button
                  onClick={handleLogout}
                  className="flex cursor-pointer items-center space-x-2 text-gray-700 hover:text-red-500"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-700 hover:text-red-500">
                  Login
                </Link>

                <Link
                  to="/register"
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-4 space-y-3">
            <Link
              to="/events"
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 hover:text-red-500"
            >
              Events
            </Link>

            <Link
              to="/ai-planner"
              onClick={() => setIsOpen(false)}
              className="block text-gray-700 hover:text-red-500"
            >
              AI Planner
            </Link>

            {user ? (
              <>
                {user?.role === "organizer" && (
                  <Link
                    to="/organizer/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="block text-gray-700 hover:text-red-500"
                  >
                    Dashboard
                  </Link>
                )}

                {user?.role === "admin" && (
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setIsOpen(false)}
                    className="block text-gray-700 hover:text-red-500"
                  >
                    Admin
                  </Link>
                )}

                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="flex cursor-pointer items-center space-x-2 text-gray-700 hover:text-red-500"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setIsOpen(false)}
                  className="block text-gray-700 hover:text-red-500"
                >
                  Login
                </Link>

                <Link
                  to="/register"
                  onClick={() => setIsOpen(false)}
                  className="block bg-red-500 text-white px-4 py-2 rounded-lg text-center hover:bg-red-600"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

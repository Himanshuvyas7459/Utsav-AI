import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { getMyOrders } from "../features/order/orderSlice";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const { orders, orderLoading } = useSelector((state) => state.order);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
      return;
    }
    dispatch(getMyOrders());
  }, [user]);

  if (orderLoading) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-5xl mx-auto">

        {/* 🔥 Profile Card */}
        <div className="bg-white rounded-xl shadow p-6 mb-6 flex items-center gap-6">
          
          {/* Avatar */}
          <div className="w-16 h-16 rounded-full bg-red-500 text-white flex items-center justify-center text-2xl font-bold">
            {user?.name?.[0]}
          </div>

          {/* Info */}
          <div className="flex-1">
            <h2 className="text-xl font-bold">{user?.name}</h2>
            <p className="text-gray-500 text-sm">{user?.email}</p>
            <p className="text-gray-500 text-sm">{user?.phone}</p>
          </div>

          {/* Credits */}
          <div className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm">
            Credits: {user?.credits}
          </div>
        </div>

        {/* 🔥 Orders Section */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-bold mb-4">My Orders</h2>

          {orders && orders.length > 0 ? (
            <div className="space-y-3">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="flex justify-between items-center border rounded-lg p-3 hover:bg-gray-50"
                >
                  <div>
                    <p className="font-medium text-sm">
                      #{order._id.slice(-6)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="font-medium">₹{order.totalBillAmount}</p>
                    <span className="text-xs text-red-500">
                      {order.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">
              No orders yet
            </p>
          )}
        </div>

      </div>
    </div>
  );
};

export default Profile;
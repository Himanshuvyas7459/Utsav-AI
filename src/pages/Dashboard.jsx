import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    if (user.role === "organizer") navigate("/organizer");
    else if (user.role === "admin") navigate("/admin");
    else navigate("/events"); // attendee
  }, [user]);

  return <h1>Loading...</h1>;
};

export default Dashboard;

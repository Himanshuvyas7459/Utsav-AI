import { useState } from "react";
import { Brain, DollarSign, IndianRupee, MapPin } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { generateAIPlan } from "../features/ai/aiSlice";

const AIPlanner = () => {
  const dispatch = useDispatch();

  const { data, loading } = useSelector((state) => state.ai);

  const planData = data?.plan;
  const [formData, setFormData] = useState({
    eventType: "",
    budget: "",
    location: "",
  });

  console.log("FINAL DATA:", data);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const generatePlan = (e) => {
    e.preventDefault();
    dispatch(generateAIPlan(formData));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO */}
      <div className="bg-gray-900 text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <Brain className="w-16 h-16 mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-4">AI Event Planner</h1>
          <p className="text-xl text-red-100">
            Get personalized event planning using AI
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* FORM */}
        <div className="bg-white rounded-xl shadow-md p-8 mb-8">
          <h2 className="text-2xl font-bold mb-6">Tell us about your event</h2>

          <form onSubmit={generatePlan} className="space-y-6">
            <select
              name="eventType"
              required
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-lg"
            >
              <option value="">Select event type</option>
              <option value="Wedding">Wedding</option>
              <option value="Birthday">Birthday</option>
              <option value="Corporate">Corporate</option>
            </select>

            <div className="relative">
              <IndianRupee className="absolute left-3 top-3 text-gray-400" />
              <input
                name="budget"
                type="number"
                required
                placeholder="Budget"
                onChange={handleChange}
                className="w-full pl-10 p-3 border rounded-lg"
              />
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400" />
              <input
                name="location"
                required
                placeholder="Location"
                onChange={handleChange}
                className="w-full pl-10 p-3 border rounded-lg"
              />
            </div>

            <button className="w-full bg-red-500 text-white py-3 rounded-lg flex justify-center gap-2">
              {loading ? "Generating..." : "Generate AI Plan"}
            </button>
          </form>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="bg-white p-10 rounded-xl text-center">
            <Brain className="w-12 h-12 mx-auto animate-pulse text-red-500" />
            <p>AI is generating your plan...</p>
          </div>
        )}

        {/* RESULT */}
        {data && !loading && (
          <div className="mt-8 space-y-6">
            {/* TOP */}
            <div className="bg-red-500 text-white p-6 rounded-xl">
              <h2 className="text-xl font-bold">{data.eventType} Plan</h2>
            </div>

            {/* PLAN */}
            <div className="bg-white p-6 rounded-xl shadow space-y-3">
              <p>
                <b>🎨 Decoration:</b> {planData?.decoration}
              </p>
              <p>
                <b>🍽 Food:</b> {planData?.food}
              </p>
              <p>
                <b>🎵 Entertainment:</b> {planData?.entertainment}
              </p>
              <p>
                <b>💰 Budget:</b> ₹{planData?.estimatedBudget}
              </p>
            </div>

            {/* CHECKLIST */}
            <div className="bg-white p-6 rounded-xl shadow">
              <h3 className="font-bold mb-3">Checklist</h3>

              {planData?.checklist?.map((item, i) => (
                <p key={i}>✅ {item}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
    // </div>
  );
};

export default AIPlanner;

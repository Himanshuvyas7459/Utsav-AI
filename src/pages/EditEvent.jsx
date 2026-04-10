import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Calendar, MapPin, FileText, IndianRupee } from "lucide-react";
import API from "../../utils/axios";

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    price: "",
  });

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const { data } = await API.get(`/events/${id}`);

        setForm({
          ...data,
          date: data.date?.split("T")[0] || "",
        });
      } catch (err) {
        console.log(err.response?.data || err.message);
      }
    };

    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.put(`/events/update/${id}`, form);

      navigate("/organizer/dashboard");
    } catch (err) {
      console.log("UPDATE ERROR:", err.response?.data || err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">

        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Edit Event</h1>
          <p className="text-gray-600 mt-2">Update your event details</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-xl shadow-md p-8 space-y-6"
        >

          {/* TITLE */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Event Title
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                className="w-full pl-10 py-3 border rounded-lg focus:ring-2 focus:ring-red-500"
                placeholder="Enter event title"
              />
            </div>
          </div>

          {/* DESCRIPTION */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={4}
              className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
              placeholder="Describe event"
            />
          </div>

          {/* LOCATION */}
          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full pl-10 py-3 border rounded-lg focus:ring-2 focus:ring-red-500"
                placeholder="Event location"
              />
            </div>
          </div>

          {/* DATE + TIME */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <Calendar className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
              <input
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
                className="w-full pl-10 py-3 border rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>

            <input
              type="time"
              name="time"
              value={form.time}
              onChange={handleChange}
              className="w-full py-3 px-3 border rounded-lg focus:ring-2 focus:ring-red-500"
            />
          </div>

          {/* PRICE */}
          <div className="relative">
            <IndianRupee className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
            <input
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              className="w-full pl-10 py-3 border rounded-lg focus:ring-2 focus:ring-red-500"
              placeholder="Ticket price"
            />
          </div>

          {/* BUTTONS */}
          <div className="flex gap-4 pt-4">
            <button
              type="submit"
              className="flex-1 cursor-pointer bg-red-500 text-white py-3 rounded-lg hover:bg-red-600"
            >
              Update Event
            </button>

            <button
              type="button"
              onClick={() => navigate("/organizer/dashboard")}
              className="flex-1 cursor-pointer border py-3 rounded-lg hover:bg-gray-100"
            >
              Cancel
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};

export default EditEvent;










// import { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { Calendar, MapPin, FileText, IndianRupee } from "lucide-react";
// import axios from "axios";

// const EditEvent = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();

//   const user = JSON.parse(localStorage.getItem("user"));
//   const token = user?.token;

//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     date: "",
//     time: "",
//     location: "",
//     price: "",
//   });

//   useEffect(() => {
//     const fetchEvent = async () => {
//       try {
//         const res = await axios.get(`/api/events/${id}`);

//         console.log(res.data);

//         setForm({
//           ...res.data,
//           date: res.data.date?.split("T")[0] || "",
//         });
//       } catch (err) {
//         console.log(err);
//       }
//     };

//     fetchEvent();
//   }, [id]);

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const token = localStorage.getItem("token");

//       await axios.put(`/api/events/update/${id}`, form, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       // console.log("UPDATE SUCCESS");
//       navigate("/organizer/dashboard");
//     } catch (err) {
//       console.log("UPDATE ERROR:", err.response?.data || err.message);
//     }
//   };
//   return (
//     <div className="min-h-screen bg-gray-50 py-12 px-4">
//       <div className="max-w-3xl mx-auto">
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">Edit Event</h1>
//           <p className="text-gray-600 mt-2">Update your event details</p>
//         </div>

//         <form
//           onSubmit={handleSubmit}
//           className="bg-white rounded-xl shadow-md p-8 space-y-6"
//         >
//           <div>
//             <label className="block text-sm font-medium mb-2">
//               Event Title
//             </label>
//             <div className="relative">
//               <FileText className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
//               <input
//                 name="title"
//                 value={form.title}
//                 onChange={handleChange}
//                 className="w-full pl-10 py-3 border rounded-lg focus:ring-2 focus:ring-red-500"
//                 placeholder="Enter event title"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">
//               Description
//             </label>
//             <textarea
//               name="description"
//               value={form.description}
//               onChange={handleChange}
//               rows={4}
//               className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-red-500"
//               placeholder="Describe event"
//             />
//           </div>

//           <div>
//             <label className="block text-sm font-medium mb-2">Location</label>
//             <div className="relative">
//               <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
//               <input
//                 name="location"
//                 value={form.location}
//                 onChange={handleChange}
//                 className="w-full pl-10 py-3 border rounded-lg focus:ring-2 focus:ring-red-500"
//                 placeholder="Event location"
//               />
//             </div>
//           </div>

//           <div className="grid grid-cols-2 gap-4">
//             <div className="relative">
//               <Calendar className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
//               <input
//                 type="date"
//                 name="date"
//                 value={form.date}
//                 onChange={handleChange}
//                 className="w-full pl-10 py-3 border rounded-lg focus:ring-2 focus:ring-red-500"
//               />
//             </div>

//             <input
//               type="time"
//               name="time"
//               value={form.time}
//               onChange={handleChange}
//               className="w-full py-3 px-3 border rounded-lg focus:ring-2 focus:ring-red-500"
//             />
//           </div>

//           <div className="relative">
//             <IndianRupee className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
//             <input
//               name="price"
//               type="number"
//               value={form.price}
//               onChange={handleChange}
//               className="w-full pl-10 py-3 border rounded-lg focus:ring-2 focus:ring-red-500"
//               placeholder="Ticket price"
//             />
//           </div>

//           <div className="flex gap-4 pt-4">
//             <button
//               type="submit"
//               className="flex-1 cursor-pointer bg-red-500 text-white py-3 rounded-lg hover:bg-red-600"
//             >
//               Update Event
//             </button>

//             <button
//               type="button"
//               onClick={() => navigate("/organizer/dashboard")}
//               className="flex-1 cursor-pointer border py-3 rounded-lg hover:bg-gray-100"
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default EditEvent;

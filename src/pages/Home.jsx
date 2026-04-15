import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Sparkles, Calendar, Brain, Zap, Shield, Users } from "lucide-react";
import Button from "../components/Button";
import { getEvents } from "../features/events/eventSlice";
import axios from "axios";
import { toast } from "react-toastify";

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const { events, isLoading } = useSelector((state) => state.event);

  useEffect(() => {
    dispatch(getEvents());
  }, [dispatch]);

  // Become Organizer handler
  const handleRequest = async () => {
    try {
      await axios.post("/api/organizer/request");
      toast.success("Request sent to admin");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error sending request");
    }
  };

  const features = [
    {
      icon: Brain,
      title: "AI-Powered Planning",
      description:
        "Get intelligent event suggestions tailored to your preferences and budget.",
    },
    {
      icon: Calendar,
      title: "Easy Booking",
      description:
        "Book tickets instantly with a seamless checkout experience.",
    },
    {
      icon: Zap,
      title: "Smart Suggestions",
      description:
        "Discover events you will love based on your interests and location.",
    },
    {
      icon: Shield,
      title: "Secure Payments",
      description:
        "Your transactions are protected with industry-standard security.",
    },
    {
      icon: Users,
      title: "For Organizers",
      description: "Powerful tools to create, manage, and promote your events.",
    },
    {
      icon: Sparkles,
      title: "Real-time Updates",
      description:
        "Stay informed with instant notifications about your events.",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 px-4">
        <div className="max-w-7xl mx-auto text-center max-w-4xl">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Plan Your Perfect Event with AI
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10">
            Discover amazing events, book tickets instantly, and let AI create
            personalized event plans for you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              onClick={() => navigate("/events")}
              variant="primary"
              className="text-lg px-8 py-4"
            >
              Explore Events
            </Button>

            <Button
              onClick={() => navigate("/ai-planner")}
              variant="outline"
              className="text-lg px-8 py-4 bg-transparent border-white text-white hover:bg-white hover:text-gray-900"
            >
              Generate AI Plan
            </Button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Why Choose Utsav AI?
          </h2>
          <p className="text-xl text-gray-600">
            Experience the future of event management
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 max-w-7xl mx-auto">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-gray-50 rounded-xl p-8 hover:shadow-lg"
              >
                <div className="bg-red-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-red-500" />
                </div>
                <h3 className="text-xl font-bold mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 bg-gray-900 text-white text-center">
        <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
        <p className="text-xl text-gray-300 mb-10">
          Join thousands of users who trust Utsav AI
        </p>

        {!user ? (
          <Button
            onClick={() => navigate("/register")}
            variant="primary"
            className="text-lg px-8 py-4"
          >
            Create Free Account
          </Button>
        ) : user.role === "attendee" ? (
          <div className="flex flex-col items-center gap-4">
            <Button
              onClick={() => navigate("/events")}
              variant="primary"
              className="text-lg px-8 py-4"
            >
              Join Event
            </Button>

            {/* 🔥 NEW BUTTON */}
            <Button
              onClick={handleRequest}
              variant="outline"
              className="text-lg px-6 py-3 border-white text-white hover:bg-white hover:text-black"
            >
              Become Organizer
            </Button>
          </div>
        ) : user.role === "organizer" ? (
          <Button
            onClick={() => navigate("/events/create")}
            variant="primary"
            className="text-lg px-8 py-4"
          >
            Create Event
          </Button>
        ) : null}
      </section>

      {/* FOOTER */}
      <footer className="bg-black text-gray-400 py-12 px-4 text-center">
        <p>&copy; 2026 Utsav AI. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Home;










// import React from "react";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { Sparkles, Calendar, Brain, Zap, Shield, Users } from "lucide-react";
// import Button from "../components/Button";
// import { getEvents } from "../features/events/eventSlice";

// const Home = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.auth);
//   const { events, isLoading } = useSelector((state) => state.event);

//   useEffect(() => {
//     dispatch(getEvents());
//   }, [dispatch]);

//   const features = [
//     {
//       icon: Brain,
//       title: "AI-Powered Planning",
//       description:
//         "Get intelligent event suggestions tailored to your preferences and budget.",
//     },
//     {
//       icon: Calendar,
//       title: "Easy Booking",
//       description:
//         "Book tickets instantly with a seamless checkout experience.",
//     },
//     {
//       icon: Zap,
//       title: "Smart Suggestions",
//       description:
//         "Discover events you will love based on your interests and location.",
//     },
//     {
//       icon: Shield,
//       title: "Secure Payments",
//       description:
//         "Your transactions are protected with industry-standard security.",
//     },
//     {
//       icon: Users,
//       title: "For Organizers",
//       description: "Powerful tools to create, manage, and promote your events.",
//     },
//     {
//       icon: Sparkles,
//       title: "Real-time Updates",
//       description:
//         "Stay informed with instant notifications about your events.",
//     },
//   ];

//   return (
//     <div className="min-h-screen">
//       <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white py-20 px-4">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center max-w-4xl mx-auto">
//             <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
//               Plan Your Perfect Event with AI
//             </h1>
//             <p className="text-xl md:text-2xl text-gray-300 mb-10">
//               Discover amazing events, book tickets instantly, and let AI create
//               personalized event plans for you.
//             </p>
//             <div className="flex flex-col sm:flex-row gap-4 justify-center">
//               <Button
//                 onClick={() => navigate("/events")}
//                 variant="primary"
//                 className="text-lg px-8 py-4"
//               >
//                 Explore Events
//               </Button>
//               <Button
//                 onClick={() => navigate("/ai-planner")}
//                 variant="outline"
//                 className="text-lg px-8 py-4 bg-transparent border-white text-white hover:bg-white hover:text-gray-900"
//               >
//                 Generate AI Plan
//               </Button>
//             </div>
//           </div>
//         </div>

//         <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1920')] opacity-10 bg-cover bg-center"></div>
//       </section>

//       <section className="py-20 px-4 bg-white">
//         <div className="max-w-7xl mx-auto">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl font-bold text-gray-900 mb-4">
//               Why Choose Utsav AI?
//             </h2>
//             <p className="text-xl text-gray-600">
//               Experience the future of event management with our powerful
//               features
//             </p>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {features.map((feature, index) => {
//               const Icon = feature.icon;
//               return (
//                 <div
//                   key={index}
//                   className="bg-gray-50 rounded-xl p-8 hover:shadow-lg transition-shadow duration-300"
//                 >
//                   <div className="bg-red-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
//                     <Icon className="w-7 h-7 text-red-500" />
//                   </div>
//                   <h3 className="text-xl font-bold text-gray-900 mb-3">
//                     {feature.title}
//                   </h3>
//                   <p className="text-gray-600 leading-relaxed">
//                     {feature.description}
//                   </p>
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </section>

//       {/* <section className="py-20 px-4 bg-gray-900 text-white">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-4xl font-bold mb-6">
//             Ready to Get Started?
//           </h2>
//           <p className="text-xl text-gray-300 mb-10">
//             Join thousands of users who trust Utsav AI for their event planning needs
//           </p>
//           <Button
//             onClick={() => navigate('/register')}
//             variant="primary"
//             className="text-lg px-8 py-4"
//           >
//             Create Free Account
//           </Button>
//         </div>
//       </section> */}

//       <section className="py-20 px-4 bg-gray-900 text-white">
//         <div className="max-w-4xl mx-auto text-center">
//           <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
//           <p className="text-xl text-gray-300 mb-10">
//             Join thousands of users who trust Utsav AI for their event planning
//             needs
//           </p>

//           {!user ? (
//             <Button
//               onClick={() => navigate("/register")}
//               variant="primary"
//               className="text-lg px-8 py-4"
//             >
//               Create Free Account
//             </Button>
//           ) : user.role === "attendee" ? (
//             <Button
//               onClick={() => navigate("/events")}
//               variant="primary"
//               className="text-lg px-8 py-4"
//             >
//               Join Event
//             </Button>
//           ) : user.role === "organizer" ? (
//             <Button
//               onClick={() => navigate("/events/create")}
//               variant="primary"
//               className="text-lg px-8 py-4"
//             >
//               Create Event
//             </Button>
//           ) : null}
//         </div>
//       </section>

//       <footer className="bg-black text-gray-400 py-12 px-4">
//         <div className="max-w-7xl mx-auto">
//           <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
//             <div>
//               <div className="flex items-center space-x-2 mb-4">
//                 <span className="text-xl font-bold text-white">Utsav AI</span>
//               </div>
//               <p className="text-sm">
//                 AI-powered event management platform for the modern age.
//               </p>
//             </div>

//             <div>
//               <h4 className="text-white font-semibold mb-4">Platform</h4>
//               <ul className="space-y-2 text-sm">
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     Events
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     AI Planner
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     For Organizers
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="text-white font-semibold mb-4">Company</h4>
//               <ul className="space-y-2 text-sm">
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     About Us
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     Careers
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     Contact
//                   </a>
//                 </li>
//               </ul>
//             </div>

//             <div>
//               <h4 className="text-white font-semibold mb-4">Legal</h4>
//               <ul className="space-y-2 text-sm">
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     Privacy Policy
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     Terms of Service
//                   </a>
//                 </li>
//                 <li>
//                   <a href="#" className="hover:text-white transition-colors">
//                     Cookie Policy
//                   </a>
//                 </li>
//               </ul>
//             </div>
//           </div>

//           <div className="border-t border-gray-800 pt-8 text-center text-sm">
//             <p>&copy; 2026 Utsav AI. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default Home;

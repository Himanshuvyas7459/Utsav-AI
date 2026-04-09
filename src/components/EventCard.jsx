import React from 'react'
import { MapPin, Calendar, DollarSign, IndianRupee } from 'lucide-react';
import { Link } from 'react-router-dom';

const EventCard = ({ id, title, image, location, price, date , time }) => {
    
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-1">
          {title}
        </h3>

        <div className="space-y-2 mb-4">
          
          <div className="flex items-center text-gray-600 text-sm">
            <Calendar className="w-4 h-4 mr-2 text-red-500" />
            <span>{new Date(date).toLocaleDateString()}</span>
          </div>

          <div className="flex items-center text-gray-600 text-sm">
            <MapPin className="w-4 h-4 mr-2 text-red-500" />
            <span className="line-clamp-1">{location}</span>
          </div>

          <div className="flex items-center text-gray-900 font-semibold">
            <IndianRupee className="w-4 h-4 mr-1 text-red-500" />
            <span>{price === 0 ? "Free" : `₹${price}`}</span>
          </div>

        </div>

        <Link
          to={`/events/${id}`}
          className="block w-full bg-red-500 text-white text-center py-2 rounded-lg hover:bg-red-600 transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default EventCard
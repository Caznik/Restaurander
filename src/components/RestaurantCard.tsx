import { Clock, DollarSign, MapPin, Star } from "lucide-react";
import type { Restaurant } from "../models/interfaces/Restaurant";

interface RestaurantCardProps {
  restaurant: Restaurant;
  //onSwipe: (direction: 'left' | 'right') => void;
}

function RestaurantCard({restaurant} : RestaurantCardProps) {
    return(
        <>
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing">
                {/* Imagen */}
                <div className="relative h-96 overflow-hidden">
                    <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />
                </div>

                {/* Info */}
                <div className="p-6 space-y-4">
                    {/* Nombre */}
                    <div>
                        <h2 className="text-gray-900">{restaurant.name}</h2>
                        <p className="text-gray-600 mt-1">{restaurant.description}</p>
                    </div>

                    {/* Detalles */}
                    <div className="space-y-2">

                        {/* Stars */}
                        <div className="flex items-center gap-2 text-gray-700">
                            <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                            <span>{restaurant.rating} estrellas</span>
                            <span className="text-gray-400">•</span>
                            <span className="text-red-500">{restaurant.cuisine}</span>
                        </div>

                        {/* Map */}
                        <div className="flex items-center gap-2 text-gray-700">
                            <MapPin className="w-5 h-5 text-red-500" />
                            <span>{restaurant.distance}</span>
                        </div>

                        {/* Schedule */}
                        <div className="flex items-center gap-2 text-gray-700">
                            <Clock className="w-5 h-5 text-gray-500" />
                            <span>Abierto hasta {restaurant.openUntil}</span>
                        </div>

                        {/* Price */}
                        <div className="flex items-center gap-2 text-gray-700">
                            <DollarSign className="w-5 h-5 text-green-500" />
                            <span>{restaurant.priceRange}</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default RestaurantCard;
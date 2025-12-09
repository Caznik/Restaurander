import { useState } from "react";
import { Clock, DollarSign, MapPin, Star, X, Heart } from "lucide-react";
import { motion, AnimatePresence } from "motion/react"
import type { Restaurant } from "../models/interfaces/Restaurant";

interface RestaurantCardProps {
  restaurant: Restaurant;
  onSwipe: (direction: 'left' | 'right') => void;
}

function RestaurantCard({restaurant, onSwipe} : RestaurantCardProps) {
    const [isDragging, setIsDragging] = useState(false);
    const [exitX, setExitX] = useState(0);

    const handleDragEnd = (_event: any, info: any) => {
        setIsDragging(false);
        const offset = info.offset.x;
        const velocity = info.velocity.x;

        if (Math.abs(velocity) > 500 || Math.abs(offset) > 150) {
        const direction = offset > 0 ? 'right' : 'left';
        setExitX(direction === 'right' ? 1000 : -1000);
        setTimeout(() => onSwipe(direction), 200);
        }
    };

    return(
        <>
            <motion.div
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            onDragStart={() => setIsDragging(true)}
            onDragEnd={handleDragEnd}
            animate={{ x: 0, rotate: 0 }}
            exit={{ x: exitX, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing"
            style={{ touchAction: 'none' }}
        >
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden cursor-grab active:cursor-grabbing">
                {/* Imagen */}
                <div className="relative h-96 overflow-hidden">
                    <img src={restaurant.image} alt={restaurant.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent" />

                    {/* Indicadores de swipe */}
                    <AnimatePresence>
                        {isDragging && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute top-8 left-8 bg-red-500 text-white px-6 py-3 rounded-lg rotate-12 border-4 border-white"
                            >
                                <X className="w-12 h-12" />
                            </motion.div>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="absolute top-8 right-8 bg-green-500 text-white px-6 py-3 rounded-lg -rotate-12 border-4 border-white"
                            >
                                <Heart className="w-12 h-12" />
                            </motion.div>
                        </>
                        )}
                    </AnimatePresence>
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
        </motion.div>
        </>
    );
}

export default RestaurantCard;
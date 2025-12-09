import { useState } from "react";
import RestaurantCard from "../components/RestaurantCard";
import RestaurantFilters from "../components/RestaurantFilters";
import type { Restaurant } from "../models/interfaces/Restaurant";

function SwipeRestaurant() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const restaurantsData: Restaurant[] = [
        {
            id: 1,
            name: 'La Trattoria',
            cuisine: 'Italiana',
            rating: 4.7,
            distance: '1.2 km',
            priceRange: '€€€',
            openUntil: '23:00',
            image: 'https://images.unsplash.com/photo-1680405229153-a753d043c4ec?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpdGFsaWFuJTIwcmVzdGF1cmFudCUyMHBhc3RhfGVufDF8fHx8MTc2NDg5NzY1N3ww&ixlib=rb-4.1.0&q=80&w=1080',
            description: 'Auténtica cocina italiana con pasta casera',
        },
        {
            id: 2,
            name: 'Sakura Sushi',
            cuisine: 'Asiática',
            rating: 4.9,
            distance: '0.8 km',
            priceRange: '€€€€',
            openUntil: '22:30',
            image: 'https://images.unsplash.com/photo-1621871908119-295c8ce5cee4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhc2lhbiUyMHJlc3RhdXJhbnQlMjBzdXNoaXxlbnwxfHx8fDE3NjQ5MjE2MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
            description: 'Sushi fresco y cocina japonesa tradicional',
        },
        {
            id: 3,
            name: 'El Mariachi',
            cuisine: 'Mexicana',
            rating: 4.5,
            distance: '2.1 km',
            priceRange: '€€',
            openUntil: '00:00',
            image: 'https://images.unsplash.com/photo-1665541719551-655b587161e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZXhpY2FuJTIwcmVzdGF1cmFudCUyMHRhY29zfGVufDF8fHx8MTc2NDg0NTEyMHww&ixlib=rb-4.1.0&q=80&w=1080',
            description: 'Tacos auténticos y margaritas deliciosas',
        },
        {
            id: 4,
            name: 'Le Bistrot',
            cuisine: 'Mediterránea',
            rating: 4.6,
            distance: '1.5 km',
            priceRange: '€€€',
            openUntil: '23:30',
            image: 'https://images.unsplash.com/photo-1685040235380-a42a129ade4e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjByZXN0YXVyYW50JTIwZm9vZHxlbnwxfHx8fDE3NjQ5MjE2MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
            description: 'Cocina mediterránea moderna y elegante',
        },
        {
            id: 5,
            name: 'Casa del Mar',
            cuisine: 'Mediterránea',
            rating: 4.8,
            distance: '3.2 km',
            priceRange: '€€€€',
            openUntil: '22:00',
            image: 'https://images.unsplash.com/photo-1657593088889-5105c637f2a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwaW50ZXJpb3IlMjBkaW5pbmd8ZW58MXx8fHwxNzY0ODYwNjA1fDA&ixlib=rb-4.1.0&q=80&w=1080',
            description: 'Mariscos frescos con vistas al mar',
        },
    ];

    const handleSwipe = (direction: 'left' | 'right') => {
        setTimeout(() => {
            if (currentIndex < restaurantsData.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else {
                // Reiniciar cuando se acaben los restaurantes
                setCurrentIndex(0);
            }
        }, 300);
    };

    const currentRestaurant = restaurantsData[currentIndex];

    return (
        <>
            <RestaurantFilters />

            <main className="py-8 flex justify-center items-start px-4 pb-8">
                {currentRestaurant ?
                    (
                        <RestaurantCard key={currentRestaurant.id} restaurant={currentRestaurant} onSwipe={handleSwipe} />
                    ) :
                    (
                        <div className="text-center py-16">
                            <p className="text-gray-600">No hay más restaurantes disponibles</p>
                        </div>
                    )
                }
            </main>
        </>
    )
}

export default SwipeRestaurant;
import { useState, useEffect } from "react";
import RestaurantCard from "../components/RestaurantCard";
import RestaurantFilters from "../components/RestaurantFilters";
import type { Restaurant } from "../models/interfaces/Restaurant";
import { searchRestaurants } from "../services/placesService";

function SwipeRestaurant() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [restaurantsData, setRestaurantsData] = useState<Restaurant[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Default location: Madrid, Spain
    const defaultLatitude = 40.4168;
    const defaultLongitude = -3.7038;

    useEffect(() => {
        const loadRestaurants = async () => {
            setLoading(true);
            setError(null);

            try {
                // Get user's geolocation or use default
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                        async (position) => {
                            const { latitude, longitude } = position.coords;
                            const data = await searchRestaurants(latitude, longitude);
                            if (data.length === 0) {
                                setError('No restaurants found in your area');
                            } else {
                                setRestaurantsData(data);
                            }
                            setLoading(false);
                        },
                        async () => {
                            // Fallback to default location if geolocation fails
                            const data = await searchRestaurants(defaultLatitude, defaultLongitude);
                            if (data.length === 0) {
                                setError('Failed to load restaurants');
                            } else {
                                setRestaurantsData(data);
                            }
                            setLoading(false);
                        }
                    );
                } else {
                    // Geolocation not supported, use default
                    const data = await searchRestaurants(defaultLatitude, defaultLongitude);
                    if (data.length === 0) {
                        setError('Failed to load restaurants');
                    } else {
                        setRestaurantsData(data);
                    }
                    setLoading(false);
                }
            } catch (err) {
                setError('An error occurred while loading restaurants');
                console.error(err);
                setLoading(false);
            }
        };

        loadRestaurants();
    }, []);

    const handleSwipe = () => {
        setTimeout(() => {
            if (restaurantsData.length > 0 && currentIndex < restaurantsData.length - 1) {
                setCurrentIndex(currentIndex + 1);
            } else if (restaurantsData.length > 0) {
                // Reiniciar cuando se acaben los restaurantes
                setCurrentIndex(0);
            }
        }, 300);
    };

    const currentRestaurant = restaurantsData[currentIndex];

    if (loading) {
        return (
            <div className="py-8 flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-gray-600">Cargando restaurantes...</p>
                </div>
            </div>
        );
    }

    if (error || restaurantsData.length === 0) {
        return (
            <div className="py-8 flex justify-center items-center min-h-screen">
                <div className="text-center">
                    <p className="text-red-600 mb-4">{error || 'No se pudieron cargar los restaurantes. Asegúrate de configurar tu API Key de Google Places.'}</p>
                    <p className="text-gray-600 text-sm">1. Asegúrate de haber configurado VITE_GOOGLE_PLACES_API_KEY en .env.local</p>
                    <p className="text-gray-600 text-sm">2. Verifica que la API key sea válida en Google Cloud Console</p>
                </div>
            </div>
        );
    }

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
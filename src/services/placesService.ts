import type { Restaurant } from '../models/interfaces/Restaurant';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001/api';

interface PlaceResult {
  place_id: string;
  name: string;
  rating: number;
  user_ratings_total: number;
  formatted_address: string;
  distance?: number;
  opening_hours?: {
    open_now: boolean;
    weekday_text?: string[];
  };
  photos?: Array<{
    photo_reference: string;
  }>;
  price_level?: number;
  types: string[];
}

interface BackendResponse {
  success: boolean;
  restaurants: PlaceResult[];
  error?: string;
}

const CUISINES = [
  'Italiana',
  'Asiática',
  'Mexicana',
  'Mediterránea',
  'Francesa',
  'India',
  'Española',
  'Griega',
];

const getRandomCuisine = () => CUISINES[Math.floor(Math.random() * CUISINES.length)];

const getPriceRange = (priceLevel?: number): string => {
  switch (priceLevel) {
    case 1:
      return '€';
    case 2:
      return '€€';
    case 3:
      return '€€€';
    case 4:
      return '€€€€';
    default:
      return '€€';
  }
};

const getPhotoUrl = (photoReference: string): string => {
  return `${BACKEND_URL}/place-photo?photoReference=${photoReference}`;
};

const getOpeningTime = (opening_hours?: PlaceResult['opening_hours']): string => {
  if (!opening_hours?.weekday_text) return '09:00 - 23:00';
  // Extract closing time from today's weekday_text
  const today = new Date().getDay();
  const todayText = opening_hours.weekday_text[today];
  if (!todayText) return '09:00 - 23:00';

  const times = todayText.split(': ')[1];
  if (!times) return '09:00 - 23:00';

  const closingTime = times.split(' – ')[1];
  return closingTime || '23:00';
};

const parseDistance = (): string => {
  // This is a placeholder since Google Places API doesn't return distance directly
  // You would need to use Distance Matrix API for accurate distances
  return `${Math.floor(Math.random() * 5) + 0.5} km`;
};

const convertPlaceToRestaurant = (place: PlaceResult, id: number): Restaurant => {
  const photoUrl = place.photos?.[0]?.photo_reference
    ? getPhotoUrl(place.photos[0].photo_reference)
    : `https://images.unsplash.com/photo-1495521821757-a1efb6729352?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080`;

  return {
    id,
    name: place.name,
    cuisine: getRandomCuisine(),
    rating: place.rating || 4.0,
    distance: parseDistance(),
    priceRange: getPriceRange(place.price_level),
    openUntil: getOpeningTime(place.opening_hours),
    image: photoUrl,
    description: place.formatted_address,
  };
};

export const searchRestaurants = async (
  latitude: number,
  longitude: number,
  radius: number = 1500,
  keyword: string = 'restaurant'
): Promise<Restaurant[]> => {
  try {
    const response = await fetch(`${BACKEND_URL}/search-restaurants`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        latitude,
        longitude,
        radius,
        keyword,
      }),
    });

    if (!response.ok) {
      console.error('Backend error:', response.statusText);
      return [];
    }

    const data: BackendResponse = await response.json();

    if (!data.success) {
      console.error('API error:', data.error);
      return [];
    }

    return data.restaurants.map((place, index) => convertPlaceToRestaurant(place, index + 1));
  } catch (error) {
    console.error('Error fetching restaurants from backend:', error);
    return [];
  }
};

export const searchRestaurantsByTextQuery = async (query: string): Promise<Restaurant[]> => {
  try {
    const response = await fetch(`${BACKEND_URL}/search-restaurants-by-query`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ query }),
    });

    if (!response.ok) {
      console.error('Backend error:', response.statusText);
      return [];
    }

    const data: BackendResponse = await response.json();

    if (!data.success) {
      console.error('API error:', data.error);
      return [];
    }

    return data.restaurants.map((place, index) => convertPlaceToRestaurant(place, index + 1));
  } catch (error) {
    console.error('Error fetching restaurants from backend:', error);
    return [];
  }
};

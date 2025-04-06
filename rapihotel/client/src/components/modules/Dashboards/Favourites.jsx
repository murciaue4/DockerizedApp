import { useContext, useEffect, useState } from "react";
import { loginContext } from "../../../context/loginContext";
import SkeletonCardHotel from "../Home/SkeletonCardHotel";
import CardHotel from "../Home/CardHotel";

const Favourites = ({ children }) => {
  const {
    isFavorite,
    favourites,
    allHotels,
  } = useContext(loginContext);
  const [isLoadingHotels, setIsLoadingHotels] = useState(true);
  const [favoriteHotels, setFavoriteHotels] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        if (Array.isArray(allHotels)) {
          const favoriteHotelsList = [];
          for (const hotel of allHotels) {
            if (await isFavorite(hotel.id)) {
              favoriteHotelsList.push(hotel);
            }
          }
          setFavoriteHotels(favoriteHotelsList);
        }
        setIsLoadingHotels(false);
      } catch (error) {
        console.log(error);
      }
    };

    getData();
  }, [allHotels, favourites, isFavorite]);

  const FilteredFavouritesHotels = (allHotels, favourites) => {
    return Array.isArray(allHotels) ? allHotels.filter((hotel) => favourites.includes(hotel.id)) : [];
  };

  return (
    <div className="flex flex-col justify-center items-center w-screen py-8 bg-gray-200 border border-black">
      <h2 className="text-center text-3xl font-bold mb-4">Mis Hoteles Favoritos</h2>
      <div className="flex flex-col w-11/12">
        {isLoadingHotels ? (
          <SkeletonCardHotel />
        ) : (
          FilteredFavouritesHotels(allHotels, favourites).map((el) => <CardHotel hotel={el} key={el.id} />)
        )}
      </div>
    </div>
  );
};

export default Favourites;

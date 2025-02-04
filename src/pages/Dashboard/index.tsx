import { useEffect, useState } from "react";
import { Pagination } from "flowbite-react";
import { MultiValue } from 'react-select';

import axiosInstance from '../../utils/axiosService';
import { Dog, SelectOption } from "../../utils/types";
import { defaultPaginationTheme } from "../../utils/constants";
import DogCard from "../../components/DogCard";
import FilterBox from "../../components/FilterBox";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const Dashboard = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [filteredBreeds, setFilteredBreeds] = useState<SelectOption[]>([]);
  const [orderBy, setOrderBy] = useState<"asc" | "desc">("asc");
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(25);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    async function fetchBreeds() {
      try {
        const response = await axiosInstance.get(`${API_BASE_URL}/dogs/breeds`, { withCredentials: true });
        setBreeds(response.data);
      } catch (error) {
        console.error("Error fetching breeds", error);
      }
    }

    fetchBreeds();
    fetchDogs();
  }, []);

  useEffect(() => {
    fetchDogs();
  }, [filteredBreeds, orderBy, page, perPage]);

  const fetchDogs = async () => {
    try {
      const response = await axiosInstance.get(`${API_BASE_URL}/dogs/search`, {
        withCredentials: true,
        params: {
          breeds: filteredBreeds.map(item => item.value),
          size: perPage,
          from: perPage * (page - 1),
          sort: `name:${orderBy}`
        }
      });
      const dogIds = response.data.resultIds;
      setTotalCount(response.data.total);
      const dogDetailResponse = await axiosInstance.post(`${API_BASE_URL}/dogs`, dogIds, { withCredentials: true });
      setDogs(dogDetailResponse.data);
    } catch (error) {
      console.error("Error fetching dogs", error);
    }
  };

  const handleBreedChange = (selectedItems: MultiValue<SelectOption>) => {
    setFilteredBreeds([...selectedItems]);
  };

  const handleChangeOrder = () => {
    setOrderBy(orderBy === "asc" ? "desc" : "asc");
  }

  const onPageChange = (page: number) => {
    setPage(page);
  }

  const toggoleLike = (id: string) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favorite => favorite !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  }

  const findMatch = async () => {
    try {
      const response = await axiosInstance.post(`${API_BASE_URL}/dogs/match`, favorites, { withCredentials: true });
      const matchedDog = dogs.find(dog => dog.id === response.data.match);
      alert(`You matched with dog: ${matchedDog?.name}(${matchedDog?.breed})`);
    } catch (error) {
      console.error("Error generating match", error);
    }
  }

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
        <div className="mx-auto mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Search Dogs
          </h2>

          <div className="relative bg-white w-full shadow-md dark:bg-gray-800 sm:rounded-lg">
            <FilterBox
              filteredBreeds={filteredBreeds}
              handleBreedChange={handleBreedChange}
              breeds={breeds}
              perPage={perPage}
              setPerPage={setPerPage}
              orderBy={orderBy}
              handleChangeOrder={handleChangeOrder}
              matchVisible={favorites.length > 1}
              findMatch={findMatch}
            />
          </div>

        </div>
        <div className="grid gap-4 lg:gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {dogs.map((dog) => (
            <DogCard key={dog.id} dog={dog} isFavorite={favorites.includes(dog.id)} toggoleLike={toggoleLike} />
          ))}
        </div>
        <div className="flex overflow-x-auto justify-end mt-4">
          <Pagination
            currentPage={page}
            totalPages={Math.ceil(totalCount / perPage)}
            onPageChange={onPageChange}
            theme={defaultPaginationTheme}
          />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
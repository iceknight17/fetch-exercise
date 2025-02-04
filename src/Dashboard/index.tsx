import { useEffect, useState } from "react";
import { Pagination } from "flowbite-react";
import Select, { MultiValue } from 'react-select';
import axios from "axios";

import { Dog } from "../types";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const defaultPaginationTheme = {
  "base": "",
  "layout": {
    "table": {
      "base": "text-sm text-gray-700 dark:text-gray-400",
      "span": "font-semibold text-gray-900 dark:text-white"
    }
  },
  "pages": {
    "base": "xs:mt-0 mt-2 inline-flex items-center -space-x-px",
    "showIcon": "inline-flex",
    "previous": {
      "base": "ml-0 rounded-l-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
      "icon": "h-5 w-5"
    },
    "next": {
      "base": "rounded-r-lg border border-gray-300 bg-white px-3 py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
      "icon": "h-5 w-5"
    },
    "selector": {
      "base": "w-12 border border-gray-300 bg-white py-2 leading-tight text-gray-500 enabled:hover:bg-gray-100 enabled:hover:text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 enabled:dark:hover:bg-gray-700 enabled:dark:hover:text-white",
      "active": "bg-cyan-50 text-cyan-600 hover:bg-cyan-100 hover:text-cyan-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white",
      "disabled": "cursor-not-allowed opacity-50"
    }
  }
};

interface SelectOption {
  value: string;
  label: string;
}

const Dashboard = () => {
  const [breeds, setBreeds] = useState<string[]>([]);
  const [filteredBreeds, setFilteredBreeds] = useState<SelectOption[]>([]);
  const [orderBy, setOrderBy] = useState<"asc" | "desc">("asc");
  const [dogs, setDogs] = useState<Dog[]>([]);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(25);
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    async function fetchBreeds() {
      try {
        const response = await axios.get(`${API_BASE_URL}/dogs/breeds`, { withCredentials: true });
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
      const response = await axios.get(`${API_BASE_URL}/dogs/search`, {
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
      const dogDetailResponse = await axios.post(`${API_BASE_URL}/dogs`, dogIds, { withCredentials: true });
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

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 lg:px-6">
        <div className="mx-auto mb-8 lg:mb-16">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
            Search Dogs
          </h2>

          <div className="relative bg-white w-full shadow-md dark:bg-gray-800 sm:rounded-lg">
            <div className="flex flex-col items-center p-4 space-y-3 md:flex-row md:space-y-0 md:space-x-4">
              <div className="inline-flex items-center">
                <label htmlFor="breed" className="mr-3">Breeds:</label>
                <Select
                  isMulti
                  name="breeds"
                  value={filteredBreeds}
                  closeMenuOnSelect={false}
                  onChange={handleBreedChange}
                  options={breeds.map((breed) => ({ value: breed, label: breed }))}
                  className="basic-multi-select min-w-48"
                  classNamePrefix="select"
                />
              </div>
              <div className="inline-flex items-center">
                <label htmlFor="perPage" className="mr-3">Entries:</label>
                <select
                  id="perPage"
                  value={perPage}
                  onChange={(e) => setPerPage(parseInt(e.target.value))}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option value="12">12</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                </select>
              </div>
              <div className="inline-flex items-center">
                <label htmlFor="order" className="mr-3">Order By:</label>
                <button
                  type="button"
                  onClick={handleChangeOrder}
                  className="flex uppercase items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
                >
                  {orderBy}
                </button>
              </div>
            </div>
          </div>

        </div>
        <div className="grid gap-4 lg:gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {dogs.map((dog) => (
            <div key={dog.id} className="text-center text-gray-500 dark:text-gray-400">
              <img
                className="mx-auto mb-4 w-36 h-36 rounded-full"
                src={dog?.img}
                alt={dog?.name}
              />
              <h3 className="mb-1 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <a href="#">{dog?.name}</a>
              </h3>
              <p>Breed: {dog?.breed}</p>
              <p>Age: {dog?.age}</p>
              <p>Zipcode: {dog?.zip_code}</p>
            </div>
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
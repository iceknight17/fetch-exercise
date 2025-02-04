import Select, { MultiValue } from 'react-select';
import { SelectOption } from '../utils/types';

interface FilterBoxProps {
  filteredBreeds: SelectOption[];
  handleBreedChange: (selectedItems: MultiValue<SelectOption>) => void;
  breeds: string[];
  perPage: number;
  setPerPage: (perPage: number) => void;
  orderBy: "asc" | "desc";
  handleChangeOrder: () => void;
  matchVisible: boolean;
  findMatch: () => void;
}

const FilterBox = (props: FilterBoxProps) => {
  const {filteredBreeds, handleBreedChange, breeds, perPage, setPerPage, orderBy, handleChangeOrder, matchVisible, findMatch} = props;

  return (
    <div className="flex flex-col items-center justify-between p-4 space-y-3 md:flex-row md:space-y-0">
      <div className="flex md:space-x-4">
        <div className="inline-flex items-center">
          <label className="mr-3">Breeds:</label>
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
          <label htmlFor="orderBy" className="mr-3">Order By:</label>
          <button
            type="button"
            id="orderBy"
            onClick={handleChangeOrder}
            className="flex uppercase items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
          >
            {orderBy}
          </button>
        </div>
      </div>
      {matchVisible && (
        <button
          type="button"
          onClick={findMatch}
          className="flex uppercase items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800"
        >
          Find Your Match
        </button>
      )}
    </div>
  )
}

export default FilterBox;
import { HiHeart, HiOutlineHeart } from "react-icons/hi";

import { Dog } from "../utils/types";

interface DogCardProps {
  dog: Dog;
  isFavorite: boolean;
  toggoleLike: (id: string) => void;
}

const DogCard = ({dog, toggoleLike, isFavorite}: DogCardProps) => {
  return (
    <div className="text-center text-gray-500 dark:text-gray-400">
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
      <div className="w-full flex justify-center">
        {isFavorite ?
          <HiHeart onClick={() => toggoleLike(dog.id)} className="w-6 h-6 cursor-pointer" color="red" /> :
          <HiOutlineHeart onClick={() => toggoleLike(dog.id)} className="w-6 h-6 cursor-pointer" color="red" />
        }
      </div>
    </div>
  )
}

export default DogCard;
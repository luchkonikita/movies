import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";

interface Props {
  rating: number;
}

const Rating = ({ rating }: Props) => {
  const stars = Math.round(rating / 2);

  return (
    <div
      className="flex items-center gap-1"
      title={`Average rating: ${rating / 2}`}
    >
      {[...new Array(stars)].map((_, index) => (
        <StarIcon key={index} className="text-yellow-600 size-3" />
      ))}
      {[...new Array(5 - stars)].map((_, index) => (
        <StarIconOutline key={index} className="text-white size-3" />
      ))}
    </div>
  );
};

export default Rating;

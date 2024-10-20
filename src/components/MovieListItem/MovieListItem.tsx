import Image from "next/image";
import { format } from "date-fns";
import { StarIcon } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";

interface Props {
  title: string;
  releaseDate?: string;
  overview?: string;
  voteAverage?: number;
  posterPath?: string;
}

const MovieListItem = ({
  title,
  releaseDate,
  overview,
  voteAverage,
  posterPath,
}: Props) => (
  <div className="flex gap-4">
    {posterPath && (
      <Image
        src={posterPath}
        alt={`${title} Poster`}
        width={69}
        height={104}
        className="h-26 bg-gray-600"
      />
    )}

    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <header className="text-lg">{title}</header>

        <div className="flex items-center gap-4">
          {typeof voteAverage === "number" && (
            <span>{formatRating(voteAverage)}</span>
          )}
          {releaseDate && (
            <p className="w-24 flex-shrink-0 text-right text-sm">
              {formatDate(releaseDate)}
            </p>
          )}
        </div>
      </div>

      <p className="text-sm line-clamp-3">{overview}</p>
    </div>
  </div>
);

const formatDate = (dateString: string) =>
  format(new Date(dateString), "d MMM yyyy");

const formatRating = (rating: number) => {
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

export default MovieListItem;

import Image from "next/image";
import Rating from "@/src/components/Rating";
import formatDate from "@/src/services/formatDate";

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
          {voteAverage !== undefined && <Rating rating={voteAverage} />}
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

export default MovieListItem;

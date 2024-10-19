interface Props {
  title: string;
  releaseDate?: string;
  overview?: string;
  popularity?: number;
  posterPath?: string;
}

const MovieListItem = ({
  title,
  releaseDate,
  overview,
  popularity,
  posterPath,
}: Props) => {
  return (
    <div className="flex gap-4">
      <img
        src={posterPath}
        alt={`${title} Poster`}
        width={69}
        height={104}
        className="h-26 bg-gray-600"
      />

      <div className="flex flex-col gap-2">
        <header className="text-lg">{title}</header>
        <p className="text-sm line-clamp-2">{overview}</p>
      </div>
    </div>
  );
};

export default MovieListItem;

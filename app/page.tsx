import z from "zod";
import MovieListItem from "@/src/components/MovieListItem";

const discoverMoviesSchema = z.object({
  results: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      release_date: z.string().optional(),
      overview: z.string().optional(),
      popularity: z.number().optional(),
      poster_path: z
        .string()
        .nullable()
        .optional()
        .transform((val) =>
          val
            ? `https://image.tmdb.org/t/p/w260_and_h390_multi_faces${val}`
            : undefined
        ),
    })
  ),
});

async function getData() {
  const res = await fetch(`https://api.themoviedb.org/3/discover/movie`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
    },
  });

  const data = await res.json();

  return discoverMoviesSchema.parse(data).results.map((item) => ({
    ...item,
    releaseDate: item.release_date,
    posterPath: item.poster_path,
  }));
}

const Home = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const movies = await getData();

  return (
    <main>
      <div className="max-w-192 mx-auto py-8 px-4 flex flex-col gap-8">
        <h1 className="text-xl">Movies Database {searchParams.term}</h1>

        <ul className="flex flex-col gap-6">
          {movies.map((movie) => (
            <li key={movie.id}>
              <MovieListItem {...movie} />
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Home;

import z from "zod";
import MovieListItem from "@/src/components/MovieListItem";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";

const discoverMoviesSchema = z.object({
  page: z.number(),
  total_pages: z.number(),
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

const getData = async ({ page = 1 }) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
      },
    }
  );

  const data = await res.json();

  const parsed = discoverMoviesSchema.parse(data);

  return {
    page: parsed.page,
    totalPages: parsed.total_pages,
    results: parsed.results.map((item) => ({
      ...item,
      releaseDate: item.release_date,
      posterPath: item.poster_path,
    })),
  };
};

const Home = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) => {
  const pageParam =
    searchParams.page && typeof searchParams.page === "string"
      ? parseInt(searchParams.page, 10)
      : 1;

  const { results, page, totalPages } = await getData({ page: pageParam });

  return (
    <main>
      <div className="max-w-192 mx-auto py-8 px-4 flex flex-col gap-8">
        <h1 className="text-xl">
          <Link href="/">Movies Database {searchParams.term}</Link>
        </h1>

        <ul className="flex flex-col gap-6">
          {results.map((movie) => (
            <li key={movie.id}>
              <MovieListItem {...movie} />
            </li>
          ))}
        </ul>

        <nav className="flex items-center justify-center gap-12">
          {page > 1 && (
            <Link
              href={`/?page=${page - 1}`}
              className="flex items-center gap-2"
            >
              <ChevronLeftIcon className="size-6" /> Previous
            </Link>
          )}
          {page < totalPages && (
            <Link
              href={`/?page=${page + 1}`}
              className="flex items-center gap-2"
            >
              Next <ChevronRightIcon className="size-6" />
            </Link>
          )}
        </nav>
      </div>
    </main>
  );
};

export default Home;

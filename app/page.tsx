import z from "zod";
import MovieListItem from "@/src/components/MovieListItem";
import Link from "next/link";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/16/solid";
import loadMovies from "@/src/services/loadMovies";
import parseMoviesRequest from "@/src/services/parseMoviesRequest";

interface Props {
  searchParams: { [key: string]: string | string[] | undefined };
}

const Home = async ({ searchParams }: Props) => {
  const parsedParams = parseMoviesRequest(searchParams);

  const { results, page, totalPages } = await loadMovies({
    page: parsedParams.page,
  });

  return (
    <main>
      <div className="max-w-192 mx-auto py-8 px-4 flex flex-col gap-8">
        <h1 className="text-xl">
          <Link href="/" className="hover:text-gray-400">
            Movies Database
          </Link>
        </h1>

        <ul className="flex flex-col gap-8">
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
              className="flex items-center gap-2 hover:text-gray-400"
            >
              <ChevronLeftIcon className="size-6" /> Previous
            </Link>
          )}
          {page < totalPages && (
            <Link
              href={`/?page=${page + 1}`}
              className="flex items-center gap-2 hover:text-gray-400"
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

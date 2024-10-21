import Link from "next/link";
import MovieListItem from "@/src/components/MovieListItem";
import loadMovies from "@/src/services/loadMovies";
import parseMoviesRequest from "@/src/services/parseMoviesRequest";
import Pagination from "@/src/components/Pagination";

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

        <Pagination
          currentPage={page}
          totalPages={totalPages}
          href={(num) => `/?page=${num}`}
        />
      </div>
    </main>
  );
};

export default Home;

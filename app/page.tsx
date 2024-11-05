import Link from "next/link";
import MovieListItem from "@/src/components/MovieListItem";
import loadMovies from "@/src/services/loadMovies";
import parseMoviesRequest from "@/src/services/parseMoviesRequest";
import Pagination from "@/src/components/Pagination";
import SearchBar from "@/src/components/SearchBar";

interface Props {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const Home = async ({ searchParams }: Props) => {
  const parsedParams = parseMoviesRequest(await searchParams);

  const { results, page, totalPages } = await loadMovies(parsedParams);

  return (
    <main>
      <div className="max-w-192 mx-auto py-8 px-4 flex flex-col gap-8">
        <h1 className="text-xl">
          <Link href="/" className="hover:text-gray-400">
            Movies Database
          </Link>
        </h1>

        <SearchBar value={parsedParams.term} />

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
          href={(num) => {
            const params = new URLSearchParams({ page: num.toString() });

            if (parsedParams.term) {
              params.append("term", parsedParams.term);
            }

            return `/?${params.toString()}`;
          }}
        />
      </div>
    </main>
  );
};

export default Home;

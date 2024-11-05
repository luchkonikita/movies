import z from "zod";

const schema = z.object({
  page: z.number(),
  total_pages: z.number(),
  results: z.array(
    z.object({
      id: z.number(),
      title: z.string(),
      release_date: z.string().optional(),
      overview: z.string().optional(),
      vote_average: z.number().optional(),
      poster_path: z
        .string()
        .nullable()
        .optional()
        .transform((val) =>
          val ? `https://image.tmdb.org/t/p/w92${val}` : undefined
        ),
    })
  ),
});

const loadMovies = async ({
  page = 1,
  term,
}: {
  page: number;
  term?: string;
}) => {
  let url = "https://api.themoviedb.org/3/";
  const params = new URLSearchParams({ page: page.toString() });

  if (term) {
    params.append("query", term);
    url += `search/movie?${params.toString()}`;
  } else {
    url += `discover/movie?${params.toString()}`;
  }

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
    },
    next: {
      revalidate: 60 * 60 * 60, // One hour
    },
  });

  const data = await res.json();
  const parsed = schema.parse(data);

  return {
    page: parsed.page,
    totalPages: parsed.total_pages,
    results: parsed.results.map((item) => ({
      ...item,
      releaseDate: item.release_date,
      voteAverage: item.vote_average,
      posterPath: item.poster_path,
    })),
  };
};

export default loadMovies;

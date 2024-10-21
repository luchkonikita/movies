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
          val
            ? `https://image.tmdb.org/t/p/w260_and_h390_multi_faces${val}`
            : undefined
        ),
    })
  ),
});

const loadMovies = async ({ page = 1 }) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/discover/movie?page=${page}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_API_TOKEN}`,
      },
      next: {
        revalidate: 60 * 60 * 60, // One hour
      },
    }
  );

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

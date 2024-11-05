import z from "zod";

const schema = z.object({
  term: z.string().optional(),
  page: z
    .string()
    .optional()
    .transform((val) => {
      if (typeof val !== "string") return 1;

      const parsed = parseInt(val);

      if (Number.isNaN(parsed)) return 1;
      if (parsed < 1) return 1;
      /** NOTE: The API only allows 500 as a max value. */
      if (parsed > 500) return 500;

      return parsed;
    }),
});

const parseMoviesRequest = (params: {
  [key: string]: string | string[] | undefined;
}) => schema.parse(params);

export default parseMoviesRequest;

import z from "zod";

const schema = z.object({
  page: z
    .string()
    .optional()
    .transform((val) => {
      if (typeof val !== "string") return 1;

      const parsed = parseInt(val);

      if (Number.isNaN(parsed)) return 1;
      if (parsed < 1) return 1;

      return parsed;
    }),
});

const parseMoviesRequest = (params: {
  [key: string]: string | string[] | undefined;
}) => schema.parse(params);

export default parseMoviesRequest;

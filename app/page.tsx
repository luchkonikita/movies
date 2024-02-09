import z from "zod";
import {
  Container,
  Title,
  Table,
  TableThead,
  TableTh,
  TableTr,
  TableTbody,
  TableTd,
  Text,
} from "@mantine/core";
import styles from "./page.module.css";

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

  return discoverMoviesSchema.parse(data);
}

export default async function Home() {
  const data = await getData();

  return (
    <main className={styles.main}>
      <Container className={styles.container}>
        <Title order={1}>Movies Database</Title>

        <Table horizontalSpacing="sm" verticalSpacing="sm">
          <TableThead>
            <TableTr>
              <TableTh className={styles.titleColumn}>Title</TableTh>
              <TableTh className={styles.overviewColumn}>Overview</TableTh>
              <TableTh className={styles.popularityColumn}>Popularity</TableTh>
              <TableTh className={styles.releaseDateColumn}>
                Release Date
              </TableTh>
            </TableTr>
          </TableThead>

          <TableTbody>
            {data.results.map((item) => (
              <TableTr key={item.id}>
                <TableTd className={styles.titleColumn}>{item.title}</TableTd>
                <TableTd className={styles.overviewColumn}>
                  <Text lineClamp={2}>{item.overview}</Text>
                </TableTd>
                <TableTd className={styles.popularityColumn}>
                  {item.popularity}
                </TableTd>
                <TableTd className={styles.releaseDateColumn}>
                  {item.release_date}
                </TableTd>
              </TableTr>
            ))}
          </TableTbody>
        </Table>
      </Container>
    </main>
  );
}

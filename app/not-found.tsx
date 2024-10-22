import Link from "next/link";
import ErrorPage from "@/src/components/ErrorPage";

const NotFound = () => (
  <ErrorPage title="Requested Page Cannot Be Found">
    <Link href="/" className="text-yellow-300">
      Return Home
    </Link>
  </ErrorPage>
);

export default NotFound;

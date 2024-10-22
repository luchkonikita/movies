"use client";

import Link from "next/link";
import ErrorPage from "@/src/components/ErrorPage";

const GlobalError = () => (
  <html>
    <body>
      <ErrorPage title="Something Went Wrong">
        <div className="flex items-center gap-8">
          <Link href="/" className="text-yellow-300">
            Return Home
          </Link>

          <button
            className="text-yellow-300"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </ErrorPage>
    </body>
  </html>
);

export default GlobalError;

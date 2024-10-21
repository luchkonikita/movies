import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Pagination from "./Pagination";

test("Pagination", () => {
  render(
    <Pagination
      currentPage={1}
      totalPages={10}
      href={(page) => `/page=${page}`}
    />
  );

  expect(screen.getByLabelText("pagination").textContent).toEqual(
    "1234567...10"
  );
});

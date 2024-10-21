import { afterEach, describe, expect, test } from "vitest";
import { render, screen, cleanup } from "@testing-library/react";
import Pagination from "./Pagination";

describe("Pagination", () => {
  afterEach(cleanup);

  const renderComponent = (currentPage: number) =>
    render(
      <Pagination
        currentPage={currentPage}
        totalPages={10}
        href={(page) => `/page=${page}`}
      />
    );

  test("renders properly", () => {
    const getContent = () => screen.getByLabelText("pagination").textContent;

    renderComponent(1);
    expect(getContent()).toEqual("1234567...10");
    cleanup();

    renderComponent(2);
    expect(getContent()).toEqual("1234567...10");
    cleanup();

    renderComponent(3);
    expect(getContent()).toEqual("1234567...10");
    cleanup();

    renderComponent(4);
    expect(getContent()).toEqual("1234567...10");
    cleanup();

    renderComponent(5);
    expect(getContent()).toEqual("12345678...10");
    cleanup();

    renderComponent(6);
    expect(getContent()).toEqual("1...345678910");
    cleanup();

    renderComponent(7);
    expect(getContent()).toEqual("1...45678910");
    cleanup();

    renderComponent(8);
    expect(getContent()).toEqual("1...45678910");
    cleanup();

    renderComponent(9);
    expect(getContent()).toEqual("1...45678910");
    cleanup();

    renderComponent(10);
    expect(getContent()).toEqual("1...45678910");
    cleanup();
  });
});

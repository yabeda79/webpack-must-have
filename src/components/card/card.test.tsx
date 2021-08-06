// const React = require("react");
import "@testing-library/jest-dom/extend-expect";
import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
// import React from "react";

import Card from "./card";

const data = {
  id: 1,
  title: "title",
  rating: 1,
  price: 100,
  description: "description",
  image: "image",
  genre: "genre",
  PC: true,
  PS: true,
  Xbox: true,
  age: 1,
  manufacturer: "manufacturer",
  createdAt: "createdAt",
  updatedAt: "updatedAt",
};

const addToCartHandler = jest.fn();
const editGameHandler = jest.fn();
const createGameHandler = jest.fn();

describe("Card component", () => {
  it("Card renders", () => {
    render(
      <Card
        game={data}
        addToCartHandler={addToCartHandler}
        editGameHandler={editGameHandler}
        createGameHandler={createGameHandler}
      />
    );

    expect(screen.getByText(/title/)).toBeInTheDocument();
    expect(screen.getByText(/description/)).toBeInTheDocument();
  });

  it("addToCartHandler works", () => {
    render(
      <Card
        game={data}
        addToCartHandler={addToCartHandler}
        editGameHandler={editGameHandler}
        createGameHandler={createGameHandler}
      />
    );

    userEvent.click(screen.getByText("Add to cart"));

    expect(addToCartHandler).toHaveBeenCalledTimes(1);
  });

  it("editGameHandler works", () => {
    render(
      <Card
        game={data}
        addToCartHandler={addToCartHandler}
        editGameHandler={editGameHandler}
        createGameHandler={createGameHandler}
      />
    );

    userEvent.click(screen.getByText("Edit"));

    expect(editGameHandler).toHaveBeenCalledTimes(1);
  });

  it("createGameHandler works", () => {
    render(
      <Card
        game={data}
        addToCartHandler={addToCartHandler}
        editGameHandler={editGameHandler}
        createGameHandler={createGameHandler}
      />
    );

    userEvent.click(screen.getByText("Create new"));

    expect(createGameHandler).toHaveBeenCalledTimes(1);
  });
});

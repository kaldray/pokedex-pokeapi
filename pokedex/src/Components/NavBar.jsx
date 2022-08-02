import React from "react";
import { NavLink } from "react-router-dom";
// @ts-ignore
import { ReactComponent as Pokeball } from "../assets/pokeball.svg";

export const NavBar = () => {
  return (
    <>
      <nav>
        <div className="container">
          <h1>Pokedex</h1>
          <Pokeball />
        </div>
        <NavLink to="/pokedex">Pokedex</NavLink>
      </nav>
    </>
  );
};

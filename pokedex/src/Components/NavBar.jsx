import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import { ReactComponent as Pokeball } from "../assets/pokeballHome.svg";

export const NavBar = ({ navRef }) => {
  const navigate = useNavigate();

  function goToHome() {
    navigate("/");
  }

  return (
    <>
      <nav ref={navRef}>
        <div className="container">
          <h1 style={{ cursor: "pointer" }} onClick={goToHome}>
            Pokedex
          </h1>
          <Pokeball />
        </div>
        <NavLink to="/pokedex">Pokedex</NavLink>
      </nav>
    </>
  );
};

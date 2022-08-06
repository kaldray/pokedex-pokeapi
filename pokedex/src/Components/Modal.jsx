import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { removeFromPokdex } from "../store/reducers/pokedex";
import { closeModal } from "../store/reducers/modal";

export const Modal = ({ htmlRef }) => {
  const { isOpen, pokemon } = useSelector((state) => state.modal);
  const dispatch = useDispatch();

  useEffect(() => {
    if (htmlRef.current) {
      htmlRef.current.classList.toggle("disable");
    }
  }, [isOpen]);

  function closeTheModal() {
    dispatch(closeModal());
  }

  function removeFromPokedex() {
    dispatch(removeFromPokdex(pokemon));
    closeTheModal();
  }

  return (
    <>
      <dialog open={isOpen}>
        Voulez vous supprimer ce pokémon de votre pokédex ?
        <div>
          <button onClick={closeTheModal}>Annuler</button>
          <button onClick={() => removeFromPokedex()}>Supprimer</button>
        </div>
      </dialog>
    </>
  );
};

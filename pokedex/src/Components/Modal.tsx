import { useEffect } from "react";

import { removeFromPokdex } from "../store/reducers/pokedexReducer";
import { closeModal } from "../store/reducers/modalReducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { removeFromLocalStorage } from "../functions";
import { ModalProps } from "types";

export const Modal = ({ htmlRef, navRef }: ModalProps) => {
  const { isOpen, pokemon } = useAppSelector((state) => state.modal);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (htmlRef.current && navRef.current) {
      htmlRef.current.classList.toggle("disable");
      navRef.current.classList.toggle("disable");
    }
  }, [isOpen]);

  function closeTheModal() {
    dispatch(closeModal());
  }

  function removeFromPokedex() {
    if ("name" in pokemon && "url" in pokemon) {
      dispatch(removeFromPokdex(pokemon));
      removeFromLocalStorage(pokemon);
      closeTheModal();
    }
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

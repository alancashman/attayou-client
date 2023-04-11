import closeIcon from "../../assets/icons/close-24px.svg";

import "./DeleteHabitModal.scss";

export default function DeleteHabitModal({ setShowModal, deleteHandler }) {
  function handleCloseModal() {
    setShowModal(false);
  }
  return (
    <>
      <section className="modal__main">
        <button className="modal__close">
          <img
            src={closeIcon}
            alt="close-modal"
            className="modal__close-icon"
            onClick={handleCloseModal}
          />
        </button>
        <h1 className="modal__heading">Delete habit?</h1>
        <p className="modal__text">You won't be able to undo this action.</p>
        <div className="modal__buttons">
          <button
            className="modal__button modal__button--close"
            onClick={handleCloseModal}
          >
            Cancel
          </button>
          <button
            className="modal__button modal__button--delete"
            onClick={deleteHandler}
          >
            Delete
          </button>
        </div>
      </section>
      <div className="overlay" onClick={handleCloseModal}></div>
    </>
  );
}

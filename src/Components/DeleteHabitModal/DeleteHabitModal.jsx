import closeIcon from "../../assets/icons/close-24px.svg";

import "./DeleteHabitModal.scss";

export default function DeleteHabitModal({
  setShowModal,
  deleteHandler,
  deleteId,
}) {
  function handleCloseModal() {
    setShowModal(false);
  }
  return (
    <>
      <section className="modal__main">
        <a href="#" className="modal__close">
          <img
            src={closeIcon}
            alt="close-modal"
            className="modal__close-icon"
            onClick={handleCloseModal}
          />
        </a>
        <h1 className="modal__heading">Delete habit?</h1>
        <p className="modal__text">You won't be able to undo this action.</p>
        <div className="modal__buttons">
          <a
            href="#"
            className="modal__button modal__button--close"
            onClick={handleCloseModal}
          >
            Cancel
          </a>
          <a
            href="#"
            className="modal__button modal__button--delete"
            onClick={deleteHandler}
          >
            Delete
          </a>
        </div>
      </section>
      <div className="overlay" onClick={handleCloseModal}></div>
    </>
  );
}

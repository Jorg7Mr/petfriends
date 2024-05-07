import React from "react";
import "../styles/modal.css";

const Modal = ({
  open,
  onHide,
  onSave,
  title,
  size = "xs",
  children,
  variant,
  disableSubmit,
}) => {
  return (
    <div className={`modal ${open ? "open" : ""}`}>
      <div className={`modal-dialog modal-${size}`}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button
              type="button"
              className="btn-close"
              onClick={onHide}
            ></button>
          </div>
          <div className="modal-body">{children}</div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onHide}
            >
              Cancelar
            </button>
            <button
              type="button"
              className={`btn ${
                variant === "danger" ? "btn-danger" : "btn-primary"
              }`}
              disabled={disableSubmit}
              onClick={onSave}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;

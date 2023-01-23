import React from "react";

import ClientOnlyPortal from "./ClientOnlyPortal";

function Backdrop({ onClose }) {
  return (
    <div
      onClick={onClose}
      className="fixed top-0 left-0 z-10 w-full h-full bg-black opacity-75"
    ></div>
  );
}

function ModalContent({ children, title, onClose }) {
  return (
    <div className="fixed top-0 left-0 z-20 flex items-center justify-center w-full h-full">
      <div className="px-8 py-4 bg-gray-800 rounded-lg max-h-[80vh] overflow-x-hidden overflow-y-scroll">
        <div className="flex items-center justify-between gap-6 mb-6">
          <h3 className="text-white">{title}</h3>
          <button className="btn btn-primary" onClick={onClose}>
            X
          </button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
}

function Modal({ title, children, show, onClose }) {
  if (!show) return;

  return (
    <ClientOnlyPortal selector="#modal">
      <Backdrop onClose={onClose} />

      <ModalContent title={title} onClose={onClose}>
        {children}
      </ModalContent>
    </ClientOnlyPortal>
  );
}

export default Modal;

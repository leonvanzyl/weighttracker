import React, { useRef, useContext } from "react";

import Modal from "@/components/Modal";

import { authContext } from "@/lib/stores/auth-context";

function AddWeightModal({ show, onClose }) {
  const { addWeight, userData } = useContext(authContext);

  // Refs
  const dateRef = useRef();
  const weightRef = useRef();

  // Handler Functions
  const addWeightHandler = async (e) => {
    e.preventDefault();

    const newWeight = {
      date: new Date(dateRef.current.value),
      weight: +weightRef.current.value,
    };

    try {
      await addWeight(userData, newWeight);
      onClose();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Modal title="Add Latest Weight" show={show} onClose={onClose}>
      <div>
        <form onSubmit={addWeightHandler} className="flex flex-col gap-4">
          <div className="form-group">
            <label>Date</label>
            <input
              type="date"
              ref={dateRef}
              defaultValue={new Date().toISOString().substring(0, 10)}
              required
            />
          </div>
          <div className="form-group">
            <label>Weight</label>
            <input
              type="number"
              ref={weightRef}
              min={1}
              step={0.1}
              defaultValue={50}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Add
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default AddWeightModal;

import React from "react";

const ConfirmLeave = ({ LeaveHandler }) => {
  const closeConfirmLeave = () => {
    const confirmLeaveElem = document.getElementById("confirm-leave-container");
    confirmLeaveElem.classList.remove("show-confirm-leave");
  };

  return (
    <div id="confirm-leave-container" className="confirm-leave-container">
      <div className="confirm-leave-wrapper">
        <p>Are you sure that you want to exit the game?</p>
        <p>Traitors will not be welcome back</p>
        <div className="leave-btn-wrapper">
          <button
            className="leave-btn btn waves-effect waves-dark teal darken-4"
            onClick={LeaveHandler}
          >
            Quit
          </button>
          <button
            className="leave-btn btn waves-effect waves-dark teal darken-4"
            onClick={closeConfirmLeave}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmLeave;

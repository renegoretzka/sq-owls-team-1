import React from "react";

const AddListModal = ({ setModalVisible, createNewList }) => {
  const modalRef = React.useRef(null);
  const [listName, setListName] = React.useState("");

  const handleBack = (event) => {
    if (modalRef && !modalRef.current.contains(event.target)) {
      setModalVisible(false);
    }
  };

  const handleSubmit = () => {
    if (listName === "") return;
    createNewList(listName);
  };

  return (
    <div onClick={handleBack} className="modal-container">
      <div ref={modalRef} className="modal-main">
        Add your new list here
        <input
          placeholder="Name"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          type="text"
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default AddListModal;

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
    setListName("");
  };

  return (
    <div onClick={handleBack} className="modal-container">
      <div ref={modalRef} className="modal-main">
        Create your new list here
        <input
          autoFocus
          placeholder="Name"
          value={listName}
          onChange={(e) => setListName(e.target.value)}
          type="text"
        />
        <button onClick={handleSubmit}>Create list</button>
      </div>
    </div>
  );
};

export default AddListModal;

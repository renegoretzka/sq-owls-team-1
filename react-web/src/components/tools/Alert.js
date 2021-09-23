import { AiFillPlusSquare } from "react-icons/ai";

export default function ItemForm({ text, closeCallback }) {
  function handleClose(e) {
    closeCallback();
    e.preventDefault();
  }

  return (
    <div className="alert">
      <div>{text}</div>
      <button type="button">
        <AiFillPlusSquare />
      </button>
    </div>
  );
}

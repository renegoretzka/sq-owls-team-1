import { useEffect } from "react";

export default function ItemForm({ text, closeCallback, type = "success" }) {
  function handleClose(e) {
    closeCallback();
    e?.preventDefault();
  }

  useEffect(() => {
    setTimeout(() => {
      handleClose();
    }, 500);

    return () => {};
  }, []);

  return (
    <button className={`alert ${type}`} onClick={handleClose}>
      {text}
    </button>
  );
}

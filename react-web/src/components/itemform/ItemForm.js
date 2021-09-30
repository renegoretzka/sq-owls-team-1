import { useState, useEffect } from "react";
import { AiFillPlusSquare } from "react-icons/ai";

export default function ItemForm({ name, submitCallback }) {
  const [form, setForm] = useState({
    name: name,
    count: 1,
    id: Math.floor(Math.random() * 100),
  });

  function handleSubmit(e) {
    submitCallback(form);
    e.preventDefault();
  }

  function handleNameChange(e) {
    setForm({ ...form, name: e.target.value });
  }

  function handleCountDecrement() {
    if (form.count === 1) {
      submitCallback(null);
    }
    setForm({ ...form, count: form.count - 1 });
  }

  function handleCountIncrement() {
    setForm({ ...form, count: form.count + 1 });
  }

  return (
    <div className="item-form">
      <div className="item-icon">{form.name[0]}</div>

      <form onSubmit={handleSubmit}>
        <label>
          Item name:
          <input type="text" value={form.name} onChange={handleNameChange} />
        </label>
        <div className="item-count">
          <button type="button" onClick={handleCountIncrement} className="btn1">
            +
          </button>
          <div className="count">{form.count}</div>
          <button type="button" onClick={handleCountDecrement} className="btn2">
            -
          </button>
        </div>
        <button type="submit">
          <AiFillPlusSquare />
        </button>
      </form>
    </div>
  );
}

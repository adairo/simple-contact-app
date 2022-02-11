import React from "react";

export function ContactForm(props) {
  return (
    <form className="contact-form">
      <label className="form-field">
        First name
        <input
          type="text"
          className="form-input"
          placeholder="Example: John"
        ></input>
      </label>

      <label className="form-field">
        Last name
        <input
          type="text"
          className="form-input"
          placeholder="Example: Salchichon"
        ></input>
      </label>

      <label className="form-field">
        Phone number
        <input
          type="text"
          className="form-input"
          placeholder="Example: 1234567890"
        ></input>
      </label>

      <button className="save-button">Save contact</button>
    </form>
  );
}

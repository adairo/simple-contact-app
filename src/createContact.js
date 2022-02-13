import React, { useState, useEffect } from "react";

const createContact = e => {};

export function ContactForm(props) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");

  useEffect(() => {
    const fname = document.querySelector(".form-input");
    fname.focus();
  }, [firstName]);

  useEffect(() => {
    console.log(props.contact);
    setFirstName(props.contact?.firstName);
    setLastName(props.contact?.lastName);
    setNumber(props.contact?.number);
  }, []);

  return (
    <form
      className="contact-form"
      onSubmit={e => {
        e.preventDefault();
        props.onNewContact(firstName, lastName, number);
      }}
    >
      <label className="form-field">
        First name
        <input
          type="text"
          className="form-input"
          value={firstName}
          onChange={e => setFirstName(e.target.value)}
          placeholder="Example: John"
        ></input>
      </label>

      <label className="form-field">
        Last name
        <input
          type="text"
          className="form-input"
          value={lastName}
          onChange={e => setLastName(e.target.value)}
          placeholder="Example: Salchichon"
        ></input>
      </label>

      <label className="form-field">
        Phone number
        <input
          type="text"
          value={number}
          className="form-input"
          onChange={e => setNumber(e.target.value)}
          placeholder="Example: 1234567890"
        ></input>
      </label>

      <button className="save-button">Save contact</button>
    </form>
  );
}

import React, { useState, useEffect } from "react";

export class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    const { firstName, lastName, number } = props.contact;
    this.state = { firstName, lastName, number };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitContact() {
    const { firstName, lastName, number } = this.state;

    this.props.onSubmit({
      firstName,
      lastName,
      number,
      id: this.props.contact.id,
    });
  }

  render() {
    return (
      <form
        className="contact-form"
        onSubmit={e => {
          e.preventDefault();
          this.submitContact();
        }}
      >
        <label className="form-field">
          First name
          <input
            type="text"
            className="form-input"
            name="firstName"
            value={this.state.firstName}
            onChange={this.handleChange}
            placeholder="Example: John"
          ></input>
        </label>

        <label className="form-field">
          Last name
          <input
            type="text"
            className="form-input"
            name="lastName"
            value={this.state.lastName}
            onChange={this.handleChange}
            placeholder="Example: Salchichon"
          ></input>
        </label>

        <label className="form-field">
          Phone number
          <input
            type="text"
            className="form-input"
            name="number"
            value={this.state.number}
            onChange={this.handleChange}
            placeholder="Example: 1234567890"
          ></input>
        </label>

        <button className="save-button">Save contact</button>
      </form>
    );
  }
}

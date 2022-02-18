import React, { useState, useEffect } from "react";

export class ContactForm extends React.Component {
  constructor(props) {
    super(props);
    const { firstName, lastName, number } = props.contact;
    this.state = { firstName, lastName, number, emptyFirst: false };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitContact() {
    const { firstName, lastName, number } = this.state;
    if (firstName === "") {
      this.setState({ emptyFirst: true });
      setTimeout(() => {
        this.setState({emptyFirst: false})
      }, 2200)
      return;
    }
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
            className={`form-input ${this.state.emptyFirst ? "error": ""}`}
            name="firstName"
            value={this.state.emptyFirst ? "Please enter a valid first name": this.state.firstName}
            onChange={this.handleChange}
            placeholder="Example: John"
          ></input>
        </label>
        {/* {this.state.emptyFirst && (
          <p className="form-warning">Please enter a valid firstname</p>
        )} */}

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

        <button className="button-form save">Save contact</button>
      </form>
    );
  }
}

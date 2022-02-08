import React from "react";
import ReactDom from "react-dom";
import "./styles.css";
import { contacts } from "./contact";

function App() {
  return (
    <>
      <SearchBar />
      <ContactsContainer contacts={contacts} />
    </>
  );
}

function ContactsContainer(props) {
  // Here we need to generate the different groups
  const groups = [<ContactGroup contacts={props.contacts} key={"first"} />];
  return <div className="contacts-container">{groups}</div>;
}

function ContactGroup(props) {
  const contacts = props.contacts.map(contact => {
    return <Contact {...contact} key={contact.name + contact.lastName} />;
  });
  return (
    <div className="contact-group">
      <p className="contact-index">{props.index}</p>
      {contacts}
    </div>
  );
}

function Contact(props) {
  const { name, lastName } = props;
  return (
    <div className="contact">
      <div className="contact-profile">
        {name.charAt(0) + lastName.charAt(0)}
      </div>
      <div className="contact-name">{props.name}</div>
      <ThreeDotButton />
    </div>
  );
}

function ThreeDotButton() {
  return (
    <div className="three-dot-button" tabIndex="0">
      <div className="dot"></div>
      <div className="dot"></div>
      <div className="dot"></div>
    </div>
  );
}

function SearchBar() {
  return (
    <div className="search-container">
      <input
        className="search-input"
        placeholder="Search contact name"
        type="text"
      />
      <button className="search-button" type="submit">
        Search
      </button>
    </div>
  );
}

ReactDom.render(<App />, document.getElementById("root"));

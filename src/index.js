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

function sortContactsAlphabetically(contacts) {
  const result = contacts.sort((contA, contB) => {
    const fullNameA = contA.name + contA.lastName;
    const fullNameB = contB.name + contB.lastName;

    return fullNameA.localeCompare(fullNameB);
  });

  return result;
}

function divideOnGroups(contacts) {
  const charSet = new Set(contacts.map(contact => contact.firstName.charAt(0)));
  const groups = [];
  charSet.forEach(char => {
    groups.push(
      contacts.filter(contact => {
        if (contact.firstName.charAt(0) === char) return contact;
      })
    );
  });

  return groups;
}

function ContactsContainer(props) {
  // Here we need to generate the different groups

  const sorted = sortContactsAlphabetically(props.contacts);
  const groups = divideOnGroups(sorted).map(group => {
    return <ContactGroup contacts={group} key={group[0].firstName.charAt(0)} />;
  });

  // const groups = [<ContactGroup contacts={props.contacts} key={"first"} />];

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
  const { firstName, lastName } = props;
  return (
    <div className="contact">
      <div className="contact-initials">
        {firstName.charAt(0) + lastName.charAt(0)}
      </div>
      <div className="contact-name">{`${firstName} ${lastName}`}</div>
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

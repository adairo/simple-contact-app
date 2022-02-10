import React from "react";
import ReactDom from "react-dom";
import "./styles.css";
import { contacts, slugify } from "./contact";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
    };

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch(e) {
    const term = e.target.value;
    this.setState({ searchTerm: term });
  }

  render() {
    const term = this.state.searchTerm.toLowerCase().trim();
    let searchDialog;
    if (term) {
      // contacts that matched the search query
      const match = this.props.contacts.filter(contact => {
        const fullNameTerm = `${contact.firstName} ${contact.lastName}`;
        if (slugify(fullNameTerm.toLowerCase()).indexOf(term) !== -1) {
          return contact;
        }
      });
      searchDialog = <SearchDialog contacts={match}></SearchDialog>;
    }
    return (
      <div className="contact-app">
        <SearchBar term={this.state.searchTerm} onSearch={this.handleSearch} />
        {searchDialog}
        <ContactsContainer contacts={this.props.contacts} />
      </div>
    );
  }
}

function SearchDialog(props) {
  if (!props.contacts) return null;

  const contacts = props.contacts.map(contact => {
    return <Contact {...contact} key={contact.name + contact.lastName} />;
  });
  return <div className="search-dialog">{contacts}</div>;
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
  const sorted = sortContactsAlphabetically(props.contacts);
  const groups = divideOnGroups(sorted).map(group => {
    return <ContactGroup contacts={group} key={group[0].firstName.charAt(0)} />;
  });

  return <div className="contacts-container">{groups}</div>;
}

function ContactGroup(props) {
  const groupLetter = props.contacts[0].firstName.charAt(0);

  const contacts = props.contacts.map(contact => {
    return <Contact {...contact} key={contact.name + contact.lastName} />;
  });
  return (
    <div className="contact-group">
      <p className="contact-index">{groupLetter}</p>
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

function SearchBar(props) {
  return (
    <div className="search-container">
      {/* <label htmlFor="search-bar">Search</label> */}
      <input
        id="search-bar"
        className="search-input"
        value={props.term}
        onChange={props.onSearch}
        placeholder="Search contact name"
        type="text"
      />
      {/* <button className="search-button" type="submit">
        Search
      </button> */}
    </div>
  );
}

ReactDom.render(<App contacts={contacts} />, document.getElementById("root"));

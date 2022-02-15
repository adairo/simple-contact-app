import React, { useEffect, useState } from "react";
import ReactDom from "react-dom";

import "./styles.css";
import "./menus.css";
import "./form.css";

import { contacts, slugify, idGenerator } from "./contact";
import { ThreeDotButton, PopUpMenu } from "./menus.js";
import { ContactForm } from "./createContact.js";

const ButtonNewContact = props => {
  return (
    <button
      className={`float-button ${props.isOpen ? "open" : ""}`}
      onClick={props.onPress}
    >
      <div className="cross horizontal"></div>
      <div className="cross vertical"></div>
    </button>
  );
};

const ContentBox = props => {
  return (
    <div className={`content-box ${props.position} opaque`}>
      {props.children}
    </div>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      contacts: contacts,
      showingForm: false,
      showSearchDialog: false,
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.createContact = this.createContact.bind(this);
    this.updateContact = this.updateContact.bind(this);
    this.handleSearchBlur = this.handleSearchBlur.bind(this);
    this.handleSearchFocus = this.handleSearchFocus.bind(this);

    this.searchBar = React.createRef();
  }

  handleSearchBlur() {
    console.log("setting False");
    this.setState({ showSearchDialog: false });
  }

  handleSearchFocus() {
    console.log("setting true");

    this.setState({ showSearchDialog: true });
  }

  handleSearch(e) {
    const term = e.target.value;
    this.setState({ searchTerm: term });
  }

  createContact(contact) {
    const contacts = [...this.state.contacts];
    contacts.push(contact);

    this.setState({ contacts, showingForm: false });
  }

  updateContact(contact) {
    const contacts = [...this.state.contacts];
    let updatedContact = contacts.find(cont => contact.id === cont.id);
    updatedContact.firstName = contact.firstName;
    updatedContact.lastName = contact.lastName;
    updatedContact.number = contact.number;
  }

  render() {
    //probably all this logic should be on SearchDialog component ?
    const term = this.state.searchTerm.toLowerCase().trim();
    let searchDialog;
    if (term) {
      // contacts that matched the search query
      const match = this.state.contacts.filter(contact => {
        const fullNameTerm = `${contact.firstName} ${contact.lastName}`;
        if (slugify(fullNameTerm.toLowerCase()).indexOf(term) !== -1) {
          return contact;
        }
      });
      searchDialog = (
        <SearchDialog contacts={match} show={this.state.showSearchDialog} />
      );
    }
    return (
      <div className="contact-app">
        <div className="opaco" />

        <SearchBar
          term={this.state.searchTerm}
          onSearch={this.handleSearch}
          onBlur={this.handleSearchBlur}
          onFocus={this.handleSearchFocus}
        />
        {searchDialog}

        {this.state.showingForm && (
          <NewContactScreen onNew={this.createContact} />
        )}

        <ContactsContainer
          showingForm={this.state.showingForm}
          contacts={this.state.contacts}
          onUpdate={this.updateContact}
        />

        <ButtonNewContact
          isOpen={this.state.showingForm}
          onPress={() =>
            this.setState({ showingForm: !this.state.showingForm })
          }
        />
      </div>
    );
  }
}

function SearchDialog(props) {
  if (!props.contacts || !props.show) return null;

  const contacts = props.contacts.map(contact => {
    return <Contact contact={contact} key={contact.id} />;
  });
  return (
    <div className="search-dialog">
      <p className="search-message">
        {contacts.length ? "Search results" : "No results"}
      </p>
      {contacts}
    </div>
  );
}

function sortContactsAlphabetically(contacts) {
  const result = contacts.sort((contA, contB) => {
    const fullNameA = contA.firstName + contA.lastName;
    const fullNameB = contB.firstName + contB.lastName;

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
    return (
      <ContactGroup
        onUpdate={props.onUpdate}
        contacts={group}
        key={group[0].firstName.charAt(0)}
      />
    );
  });

  return (
    <div className={`contacts-container ${props.showingForm ? "opaque" : ""}`}>
      {groups}
    </div>
  );
}

function ContactGroup(props) {
  const groupLetter = props.contacts[0].firstName.charAt(0);

  const contacts = props.contacts.map(contact => {
    return (
      <Contact contact={contact} onUpdate={props.onUpdate} key={contact.id} />
    );
  });
  return (
    <div className="contact-group">
      <p className="contact-index">{groupLetter}</p>
      {contacts}
    </div>
  );
}

function Contact(props) {
  const { firstName, lastName } = props.contact;
  const [showCS, setShowCS] = useState(false);

  const handleUpdate = contact => {
    setShowCS(false);
    props.onUpdate(contact);
  };

  return (
    <div
      className="contact"
      onClick={() => {
        setShowCS(true);
      }}
    >
      <div className="contact-initials">
        {firstName.charAt(0) + lastName.charAt(0)}
      </div>
      <div className="contact-name">
        {`${firstName} ${lastName}`}
        <ThreeDotButton />
      </div>
      {showCS && (
        <ContactScreen contact={props.contact} updateContact={handleUpdate} />
      )}
    </div>
  );
}

const NewContactScreen = props => {
  return (
    <ContentBox position="bottom">
      <div>
        <p className="contact-screen-name">Create contact</p>
        <ContactForm
          onSubmit={props.onNew}
          contact={{ firstName: "", lastName: "", number: "" }}
        />
      </div>
    </ContentBox>
  );
};

function ContactScreen(props) {
  const { firstName, lastName } = props.contact;
  const fullName = `${firstName} ${lastName}`;
  const opaque = document.querySelector(".opaco");

  useEffect(() => {
    opaque.classList.add("active");

    return () => {
      opaque.classList.remove("active");
    };
  });
  return (
    <ContentBox position="bottom">
      <div>
        <p className="contact-screen-name">{fullName}</p>
        <ContactForm onSubmit={props.updateContact} contact={props.contact} />
      </div>
    </ContentBox>
  );
}

const SearchBar = React.forwardRef((props, ref) => {
  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        id="search-bar"
        ref={ref}
        value={props.term}
        placeholder="Search contact name"
        onChange={props.onSearch}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
      />
    </div>
  );
});

ReactDom.render(<App />, document.getElementById("root"));

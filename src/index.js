import React, { useEffect, useState, useRef } from "react";
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
  const contentBox = useRef();

  useEffect(() => {
    const button = document.querySelector(".float-button");
    const position = contentBox.current.clientHeight;
    button.style.bottom = position - 22.28 + "px";

    return () => {
      button.style.bottom = "1rem";
    };
  });

  return (
    <>
      <div className="dark-wall" />
      <div className={`content-box ${props.position}`} ref={contentBox}>
        {props.children}
      </div>
    </>
  );
};

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: "",
      contacts: contacts,
      showNewContact: false,
      showContact: false,
      showSearchDialog: false,
      contactShowed: null,
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.createContact = this.createContact.bind(this);
    this.deleteContact = this.deleteContact.bind(this);
    this.updateContact = this.updateContact.bind(this);
    this.handleSearchFocus = this.handleSearchFocus.bind(this);
    this.showContact = this.showContact.bind(this);
    this.closeSearch = this.closeSearch.bind(this);

    this.searchBar = React.createRef();
  }

  closeSearch(e) {
    this.setState({ showSearchDialog: false });
  }

  handleSearchFocus() {
    this.setState({ showSearchDialog: true });
  }

  handleSearch(e) {
    const term = e.target.value;
    this.setState({ searchTerm: term });
  }

  createContact(contact) {
    contact.id = idGenerator.next().value + 10;
    this.setState({
      contacts: this.state.contacts.concat(contact),
      showNewContact: false,
    });
  }

  deleteContact(contact) {
    const contacts = [...this.state.contacts];
    const index = contacts.findIndex(cont => {
      return cont.id === contact.id;
    });
    console.log(index);
    contacts.splice(index, 1);
    if (index !== -1) {
      this.setState({ contacts, showContact: false, contactShowed: null });
    }
  }

  showContact(contact) {
    this.setState({
      showContact: true,
      contactShowed: contact,
    });
  }

  updateContact(contact) {
    const contacts = [...this.state.contacts];
    let updatedContact = contacts.find(cont => contact.id === cont.id);
    updatedContact.firstName = contact.firstName;
    updatedContact.lastName = contact.lastName;
    updatedContact.number = contact.number;

    this.setState({ showContact: false });
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
        <SearchDialog
          onShow={this.showContact}
          contacts={match}
          show={this.state.showSearchDialog}
          closeSearch={this.closeSearch}
        />
      );
    }
    return (
      <div className="contact-app">
        <SearchBar
          term={this.state.searchTerm}
          onSearch={this.handleSearch}
          onBlur={this.handleSearchBlur}
          onFocus={this.handleSearchFocus}
        >
          {this.state.showSearchDialog && searchDialog}
        </SearchBar>

        {this.state.showNewContact && (
          <NewContactScreen onNew={this.createContact} />
        )}

        {this.state.showContact && (
          <ContactScreen
            contact={this.state.contactShowed}
            onUpdate={this.updateContact}
            onDelete={this.deleteContact}
          />
        )}
        

        <ContactsContainer
          contacts={this.state.contacts}
          onUpdate={this.updateContact}
          onShow={this.showContact}
        />

        <ButtonNewContact
          isOpen={this.state.showNewContact | this.state.showContact}
          onPress={
            () =>
              this.setState(state => {
                if (state.showNewContact || state.showContact)
                  return { showNewContact: false, showContact: false };
                return { showNewContact: true };
              })
          }
        />
      </div>
    );
  }
}

function SearchDialog(props) {
  useEffect(() => {
    function handler(e) {
      if (!e.target.matches(".search-container *")) props.closeSearch();
    }

    document.addEventListener("click", handler);

    return function () {
      document.removeEventListener("click", handler);
    };
  }, []);

  const contacts = props.contacts.map(contact => {
    return <Contact onShow={props.onShow} contact={contact} key={contact.id} />;
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
  const charSet = new Set(
    contacts.map(contact => contact.firstName.charAt(0).toUpperCase())
  );
  const groups = [];
  charSet.forEach(char => {
    groups.push(
      contacts.filter(contact => {
        if (contact.firstName.charAt(0).toUpperCase() === char) return contact;
      })
    );
  });

  return groups;
}

function ContactsContainer(props) {
  if (props.contacts.length === 0) {
    return(<p className="contacts-empty">There is not any contact saved.<br/> Press the + button to save a new contact</p>)
  }
  const sorted = sortContactsAlphabetically(props.contacts);
  const groups = divideOnGroups(sorted).map(group => {
    return (
      <ContactGroup
        onUpdate={props.onUpdate}
        contacts={group}
        key={group[0].firstName.charAt(0)}
        onShow={props.onShow}
      />
    );
  });

  return <div className={`contacts-container`}>{groups}</div>;
}

function ContactGroup(props) {
  const groupLetter = props.contacts[0].firstName.charAt(0).toUpperCase();

  const contacts = props.contacts.map(contact => {
    return (
      <Contact
        contact={contact}
        onUpdate={props.onUpdate}
        key={contact.id}
        onShow={props.onShow}
      />
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

  return (
    <div className="contact" onClick={() => props.onShow(props.contact)}>
      <div className="contact-initials">
        {props.contact.firstName.charAt(0) + lastName.charAt(0) || ""}
      </div>
      <div className="contact-name">
        {`${firstName} ${lastName}`}
        {/* <ThreeDotButton /> */}
      </div>
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

  return (
    <ContentBox position="bottom">
      <div>
        <p className="contact-screen-name">{fullName}</p>
        <ContactForm onSubmit={props.onUpdate} contact={props.contact} />
        <button
          className="button-form delete"
          onClick={() => props.onDelete(props.contact)}
        >
          Delete contact
        </button>
      </div>
    </ContentBox>
  );
}

const SearchBar = (props, ref) => {
  return (
    <div className="search-container">
      <input
        className="search-input"
        type="text"
        id="search-bar"
        value={props.term}
        placeholder="Search contact name"
        onChange={props.onSearch}
        onBlur={props.onBlur}
        onFocus={props.onFocus}
      />
      {props.children}
    </div>
  );
};

ReactDom.render(<App />, document.getElementById("root"));

// App.js
import React, { Component } from "react";
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import styles from "./App.module.css";

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const savedContacts = JSON.parse(localStorage.getItem('contacts'));

    if (savedContacts) {
      this.setState({ contacts: savedContacts });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.contacts !== this.state.contacts) {
      localStorage.setItem('contacts', JSON.stringify(this.state.contacts));
    }
  }

  handleFilterChange = (e) => {
    this.setState({ filter: e.target.value });
  };

  handleSubmit = (newContact) => {
    const { contacts } = this.state;

    if (contacts.some((contact) => contact.name.toLowerCase() === newContact.name.toLowerCase())) {
      alert(`Contact with name "${newContact.name}" already exists!`);
      return;
    }

    this.setState((prevState) => ({ contacts: [...prevState.contacts, newContact] }));
  };

  handleDeleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  render() {
    const { contacts, filter } = this.state;
    const filteredContacts = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Phonebook</h1>
        <ContactForm onSubmit={this.handleSubmit} />
        <h2 className={styles.subtitle}>Contacts</h2>
        <input
          type="text"
          placeholder="Search contacts"
          value={filter}
          onChange={this.handleFilterChange}
          className={styles.input}
        />
        <ContactList contacts={filteredContacts} onDeleteContact={this.handleDeleteContact} />
      </div>
    );
  }
}
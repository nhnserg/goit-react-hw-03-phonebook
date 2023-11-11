import styles from './ContactList.module.css'
import { Component } from 'react';

class ContactList extends Component {
  render() {
    const { contacts, onDeleteContact } = this.props;

    return (
      <ul className={styles.contactList}>
        {contacts.map((contact) => (
          <li key={contact.id} className={styles.contactItem}>
            {contact.name}: {contact.number}
            <button onClick={() => onDeleteContact(contact.id)} className={styles.button}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    );
  }
}


export default ContactList;

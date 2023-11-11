import styles from './ContactForm.module.css';
import { nanoid } from 'nanoid';
const { Component } = require('react');

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleNameChange = (e) => {
    this.setState({ name: e.target.value });
  };

  handleNumberChange = (e) => {
    this.setState({ number: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, number } = this.state;

    if (!name || !number) {
      alert('Please enter both name and number.');
      return;
    }

    this.props.onSubmit({ id: nanoid(), name, number });
    this.setState({ name: '', number: '' });
  };

  render() {
    const { name, number } = this.state;

    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <input
            type="text"
            name="name"
            placeholder='Name:'
            value={name}
            onChange={this.handleNameChange}
          />
        </label>
        <label>
          <input
            type="tel"
            name="number"
            placeholder='Number:'
            value={number}
            onChange={this.handleNumberChange}
          />
        </label>
        <button type="submit" className={styles.button}>
          Add Contact
        </button>
      </form>
    );
  }
}

export default ContactForm;

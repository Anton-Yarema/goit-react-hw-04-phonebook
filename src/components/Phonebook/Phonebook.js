import { useState, useEffect } from 'react';
import ContactForm from 'components/ContactForm';
import { nanoid } from 'nanoid';
import Filter from 'components/Filter';
import ContactList from 'components/ContactList';
import css from './Phonebook.module.css';

const Phonebook = () => {
  const [filter, setFilter] = useState('');
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    console.log('gwegwegwev');
    const contacts = localStorage.getItem('contacts');
    const parsedContact = JSON.parse(contacts);

    if (parsedContact) {
      setContacts(parsedContact);
    }
  }, []);

  useEffect(() => {
    if (contacts !== setContacts) {
      localStorage.setItem('contacts', JSON.stringify(contacts));
    }
  }, [contacts]);

  const addContacts = ({ name, number }) => {
    const checkContacts = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );
    if (checkContacts) {
      alert(`${name} is already in contacts.`);
      return;
    }
    const newContact = {
      id: nanoid(),
      name,
      number,
    };
    setContacts(prevContacts => [newContact, ...prevContacts]);
  };

  const filtredName = () => {
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  const handleFilterChange = event => {
    setFilter(event.currentTarget.value);
  };

  const deleteContact = contactId => {
    setContacts(prevState =>
      prevState.filter(contact => contact.id !== contactId)
    );
  };

  return (
    <div className={css.container}>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={addContacts} />
      <h2>Contacts</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <ContactList onDeleteContact={deleteContact} onFiltred={filtredName} />
    </div>
  );
};

export default Phonebook;

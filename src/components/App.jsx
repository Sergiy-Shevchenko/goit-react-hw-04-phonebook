// import React, { Component } from 'react';
import { useState, useEffect } from 'react';
import { ContactsForm } from './ContactForm/ContactsForm';
import { ContactsList } from './ContactList/ContactsList';
import { Filter } from './Filter/Filter';
import css from './Styles/Styles.module.css';
import { nanoid } from 'nanoid';
import { Notify } from 'notiflix';

export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('key')) ?? []
    // [
    //     { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
    //     { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
    //     { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
    //     { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    //   ]
  );
  const [filter, setFilter] = useState('');

  const addContact = nameData => {
    const newContact = {
      id: nanoid(),
      ...nameData,
    };

    const notmalizeNewContact = newContact.name.toLocaleLowerCase();
    if (newContact.name === '') {
      return Notify.warning(`Please enter your name`);
    }
    if (newContact.number === '') {
      return Notify.warning(`${newContact.name} please enter your number`);
    }
    if (
      contacts.find(
        contact => contact.name.toLocaleLowerCase() === notmalizeNewContact
      )
    ) {
      return Notify.failure(`${newContact.name} is alredy in contacts`);
    }
    setContacts(prev => [newContact, ...prev]);
  };

  const deleteUser = contactId => {
    setContacts(contacts.filter(({ id }) => id !== contactId));
  };

  const changeFilter = ({ target: { value } }) => {
    setFilter(value);
  };

  useEffect(() => {
    localStorage.setItem('key', JSON.stringify(contacts));
    // console.log('Effect 2');
  }, [contacts]);

  const nopmalizedFilter = filter.toLocaleLowerCase();

  const visibleContact = contacts.filter(contact =>
    contact.name.toLocaleLowerCase().includes(nopmalizedFilter)
  );

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactsForm
        addContactProps={addContact}
        // reset={this.reset}
      />
      <h2 className={css.title}>Contacts</h2>
      <h3 className={css.inputName}>Find contacts by name</h3>
      <Filter value={filter} onChange={changeFilter} />
      <ContactsList contacts={visibleContact} deleteUserProps={deleteUser} />
    </div>
  );
};


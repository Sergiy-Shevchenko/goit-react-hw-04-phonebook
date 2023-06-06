import React from 'react';
import css from './ContactList.module.css';
import PropTypes from 'prop-types';
import ContactsItem from 'components/ContactItem/ContactItem';

export const ContactsList = ({ contacts, deleteUserProps }) => {
  return (
    <div className={css.section}>
      <ul className={css.contacList}>
        <ContactsItem contacts={contacts} deleteUserProps={deleteUserProps} />
      </ul>
    </div>
  );
};

ContactsList.propTypes = {
  deleteUserProps: PropTypes.func.isRequired,
  contacts: PropTypes.array.isRequired,
};

export default ContactsList;

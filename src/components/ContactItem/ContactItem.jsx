import React from 'react';
import PropTypes from 'prop-types';
import css from './ContactItem.module.css';
import { ReactComponent as AddIcon } from '../Icons/phone.svg';

export const ContactsItem = ({ contacts, deleteUserProps }) => {
  return (
    <>
      {contacts.map(({ name, number, id }) => (
        <li className={css.contactItem} key={id}>
          <p className={css.contacName}>
            <AddIcon />
            {name}: {number}
          </p>
          <button type="button" onClick={() => deleteUserProps(id)}>
            Delete
          </button>
        </li>
      ))}
    </>
  );
};

ContactsItem.propTypes = {
  deleteUserProps: PropTypes.func.isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
};

export default ContactsItem;

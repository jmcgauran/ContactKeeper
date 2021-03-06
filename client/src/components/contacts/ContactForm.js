import React, { useState, useContext, useEffect } from 'react';
import ContactContext from '../../context/contact/contactContext';

const ContactForm = () => {

  // initialise context
  const contactContext = useContext(ContactContext);

  const { current , addContact, updateContact, clearCurrent } = contactContext

  useEffect(() => {
    if(current !== null){
      setContact(current);
    } else { setContact({
      name : '',
      email : '',
      phone : '',
      type : 'personal'
      }) }
  }, [contactContext, current])

  /*As this is a component with a form, component level state is needed */
  const [contact, setContact] = useState({
    name : '',
    email : '',
    phone : '',
    type : 'personal'
  });

  // destructure
  const {name, email, phone, type} = contact ;

  // onChange method
  const onChange = (e) => {setContact( {...contact, [e.target.name] : e.target.value } )};

  // onSubmit method calls 'addContact' action in context
  const onSubmit = (e) => {
    e.preventDefault();
    if(current === null) {
      // call action in context
      addContact(contact);
    } else {
      updateContact(contact);
    }

    // re-set input fields
    setContact({
    name : '',
    email : '',
    phone : '',
    type : 'personal'
    })
  }

  const clearAll = () => {
    clearCurrent();
  }

  return (
    
    <form onSubmit={onSubmit}> 
    <h2 className="text-primary">{current ? 'Edit Contact' : 'Add Contact'}</h2>
      <input
      type ="text"
      placeholder ="Name"
      name = "name"
      value = {name}
      onChange = {onChange}
      />
      <input
      type ="email"
      placeholder ="Email"
      name = "email"
      value = {email}
      onChange = {onChange}
      />
      <input
      type ="text"
      placeholder ="Phone"
      name = "phone"
      value = {phone}
      onChange = {onChange}
      />
      <h5>Contact Type</h5>
      <input type="radio" name="type" value="personal" checked={type === 'personal'} onChange = {onChange}/> Personal{'  '}
      <input type="radio" name="type" value="professional" checked={type === 'professional'} onChange = {onChange}/> Professional{'  '}
      <div>
        <input type="submit" value={current ? 'Edit Contact' : 'Add Contact'} className="btn btn-primary btn-block"/>
      </div>
      {current && (
        <div>
          <button className="btn btn-light btn-block" onClick={clearAll}>Clear All</button>
        </div>
      )}
    </form>
  )
}

export default ContactForm ; 
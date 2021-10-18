import { useState, useEffect } from "react";
import { nanoid } from "nanoid";
import ContactForm from "./components/ContactForm/";
import Filter from "./components/Filter";
import ContactList from "./components/ContactList";
import s from "./App.module.css";

function App() {
  const [contacts, setContacts] = useState([
    { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
    { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
    { id: "id-3", name: "Eden Clements", number: "645-17-79" },
    { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
  ]);
  const [filter, setFilter] = useState("");

  const changeFilter = (e) => {
    setFilter(e.currentTarget.value);
  };

  const visibleContacts = () => {
    return contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.trim().toLowerCase())
    );
  };
  const onFormSubmit = (name, number) => {
    if (contacts.some((contact) => contact.name === name)) {
      alert(name + " is already in contacts");
      return;
    }
    setContacts((prevContacts) => [
      ...prevContacts,
      { name, number, id: nanoid() },
    ]);
  };
  const onDelete = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  useEffect(() => {
    const parsedContacts = JSON.parse(localStorage.getItem("contacts"));

    setContacts(parsedContacts ?? []);
  }, []);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  return (
    <>
      <h1 className={s.mainTitle}>Phonebook</h1>
      <ContactForm onFormSubmit={onFormSubmit} />
      <Filter filter={filter} changeFilter={changeFilter} />
      <h2 className={s.title}>Contacts</h2>
      <ContactList contacts={visibleContacts()} onDelete={onDelete} />
    </>
  );
}

export default App;

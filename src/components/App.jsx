import NavBar from "./NavBar";
import NoContact from "./NoContact";
import PersonCard from "./PersonCard";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import useDisclouse from "../hooks/useDisclouse";
import {ToastContainer} from 'react-toastify';

function App() {
  const [contacts, setContacts] = useState([]);
  const {onClose,onOpen,buttonIsClicked} = useDisclouse(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [contactForEdit, setIsContactForEdit] = useState(null);
  const [allContacts, setAllContacts] = useState(null);
  async function getContact() {
  try {
    const contactRef = collection(db, "contact");
    const contactSnapShot = await getDocs(contactRef);

    const contactLists = contactSnapShot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    setContacts(contactLists);
    setAllContacts(contactLists)
  } catch (error) {
    console.log(error);
  }
}

  function filterContacts (e) {
    const value = e.target.value;
    const filteredContacts = allContacts.filter(contact =>
      contact.name.toLowerCase().includes(value) ||
      contact.email.toLowerCase().includes(value)
    );
    setContacts(filteredContacts);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getContact();
  },[]);

  function handleDelete(id) {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  }

   function closeEditMode () {
    setIsUpdate(false);
  }

  return (
    <div className="flex h-screen flex-col">
      <NavBar setbuttonIsClicked={onOpen} filterContacts = {filterContacts}/>
      {contacts.length > 0 ? (
        contacts.map((item) => {
          return <PersonCard
                        key={item.id}
                        contact={item}
                        onDelete={handleDelete}
                        setIsUpdate={setIsUpdate}
                        setIsContactForEdit={setIsContactForEdit}
                      />;
        })
      ) : (
        <NoContact />
      )}
      {buttonIsClicked || isUpdate ? (
        <Modal
          contacts = {contacts}
          onClose = {onClose}
          onOpen = {onOpen}
          getContact={filterContacts}
          isUpdate = {isUpdate}
          contactForEdit = {contactForEdit}
          closeEdit = {closeEditMode}
        />
      ) : null}
  <ToastContainer position="bottom-center"/>
  </div>
  );
}

export default App;

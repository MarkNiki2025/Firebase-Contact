import NavBar from "./NavBar";
import NoContact from "./NoContact";
import PersonCard from "./PersonCard";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import useDisclouse from "../hooks/useDisclouse";

function App() {
  const [contacts, setContacts] = useState([]);
  const {onClose,onOpen,buttonIsClicked} = useDisclouse(false);

    async function getContact() {
      try {
        const contactRef = collection(db, "contact");
        const contactSnapShot = await getDocs(contactRef);
         const contactLists = contactSnapShot.docs.map((doc) => ({
        id: doc.id,        
        ...doc.data(),
      }));

        setContacts(contactLists);
      } catch (error) {
        console.log(error);
      }
    }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getContact();
  },[])

  function handleDelete(id) {
    setContacts((prev) => prev.filter((contact) => contact.id !== id));
  }

  return (
    <div className="flex h-screen flex-col">
      <NavBar setbuttonIsClicked={onOpen} />
      {contacts.length > 0 ? (
        contacts.map((item, id) => {
          return <PersonCard key={id} contact = {item} onDelete = {handleDelete}/>;
        })
      ) : (
        <NoContact />
      )}
      {buttonIsClicked ? (
        <Modal
          contacts = {contacts}
          onClose = {onClose}
          onOpen = {onOpen}
          getContact={getContact}
        />
      ) : null}
    </div>
  );
}

export default App;

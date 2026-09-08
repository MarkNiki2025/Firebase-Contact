import NavBar from "./NavBar";
import NoContact from "./NoContact";
import PersonCard from "./PersonCard";
import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import Modal from "./Modal";

function App() {
  const [contacts, setContacts] = useState([]);
  const [buttonIsClicked, setbuttonIsClicked] = useState(false);
  const [buttonAddContactIsClicked, setbuttonAddContactIsClicked] = useState(false);

  useEffect(() => {
    async function getContact() {
      try {
        const contactRef = collection(db, "contact");
        const contactSnapShot = await getDocs(contactRef);
        const contactLists = contactSnapShot.docs.map((doc) => doc.data());
        setContacts(contactLists);
      } catch (error) {
        console.log(error);
      }
    }
    getContact();
  }, []);

  function toggleButton() {
    setbuttonIsClicked(!buttonIsClicked);
  }

  function toggleButtonAddContact() {
    setbuttonAddContactIsClicked(!buttonAddContactIsClicked);
    console.log(buttonAddContactIsClicked);
  }

  return (
    <div className="flex h-screen flex-col">
      <NavBar setbuttonIsClicked={toggleButton} />
      {contacts.length > 0 ? (
        contacts.map((item, index) => {
          return <PersonCard email={item.email} name={item.name} key={index} />;
        })
      ) : (
        <NoContact />
      )}
      {buttonIsClicked ? (
        <Modal
          toggleButtonAddContact={toggleButtonAddContact}
          toggleButton={toggleButton}
        />
      ) : null}
    </div>
  );
}

export default App;

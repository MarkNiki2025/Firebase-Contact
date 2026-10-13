import NavBar from "./NavBar";
import NoContact from "./NoContact";
import PersonCard from "./PersonCard";
import { db } from "../config/firebase";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import Modal from "./Modal";
import useDisclouse from "../hooks/useDisclouse";
import {ToastContainer} from 'react-toastify';
import {IUser} from '../types/typesForApp.module.ts';

function App():React.JSX.Element  {
  const [contacts, setContacts] = useState<IUser[]>([]);
  const {onClose,onOpen,buttonIsClicked} = useDisclouse();
  const [isUpdate, setIsUpdate] = useState(false);
  const [contactForEdit, setIsContactForEdit] = useState(null);
  const [allContacts, setAllContacts] = useState<IUser[] | null>(null);
  const [search, setSearch] = useState("");
  async function getContact() {
    try {
      const contactRef = collection(db, "contact");
      const contactSnapShot = await getDocs(contactRef);

      const contactLists = contactSnapShot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        email: doc.data().email,
        ...doc.data(),
      }));
      setContacts(contactLists);
      setAllContacts(contactLists);
    } catch (error) {
      console.log(error);
    }
  }

  function filterContacts (e:React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value;
    const contactRef = collection(db, "contact");
    
    onSnapshot(contactRef, (snapshot) => {
      const contactsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name,
        email: doc.data().email,
        ...doc.data(),
      }))


    const filteredContacts = contactsList.filter(contact => {
      return(
      contact.name.toLowerCase().includes(value.toLowerCase()) ||
      contact.email.toLowerCase().includes(value.toLowerCase())
    )
    });

    setContacts(filteredContacts);
    return filteredContacts;
    })
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    getContact();
  },[]);

  function handleDelete(id:string) {
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
        <NoContact/>
      )}
      {buttonIsClicked || isUpdate ? (
        <Modal
          contacts = {contacts}
          onClose = {onClose}
          getContact={getContact}
          search={search}
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

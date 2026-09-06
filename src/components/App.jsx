import NavBar from './NavBar';
import NoContact from './NoContact';
import PersonCard from './PersonCard';
import {db} from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';
function App() {
  const [contacts, setContacts] = useState([])
  useEffect(() =>{
    async function getContact () {
      try {
        const contactRef = collection(db, 'contact');
        console.log(contactRef)
        const contactSnapShot = await getDocs(contactRef)
        console.log(contactSnapShot)
        const contactLists = contactSnapShot.docs.map((doc) => doc.data())
        console.log(contactLists)
        setContacts(contactLists)
      } catch (error) {
        console.log(error)
      }
    }
    getContact()
  },[])
  return (
    <div className="h-screen flex flex-col  ">
      <NavBar />
      {contacts.length > 0 ? contacts.map((item,index) =>{
        return <PersonCard email={item.email} name={item.name} key={index}/>
      }) : <NoContact />}
    </div>
  )
}
  
export default App

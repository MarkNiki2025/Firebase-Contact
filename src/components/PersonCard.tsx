import { toast } from "react-toastify";
import {db} from "../config/firebase";
import {deleteDoc,doc} from "firebase/firestore"
import { PropsPersonCard } from "../types/typesForApp.module";

export default function PersonCard({ contact, onDelete,
   setIsUpdate, setIsContactForEdit}:PropsPersonCard) {

  async function deleteCard(id:string) {
    try {
      console.log(id)
      console.log(contact)
      const docRef = doc(db, "contact", id)
      onDelete(id)
      await deleteDoc(docRef);
      toast.success("Contact Deleted");
    } catch (error) {
      console.log(error)
    }
  }

  function openEditMode() {
    setIsContactForEdit(contact);
    setIsUpdate(true);
  } 
    
  return (
    <div className="m-3 flex justify-between rounded-2xl bg-yellow-200 p-2">
      <div className="flex">
      <img src="/user.svg" />
      <span className="m-2">
        <h3 className="mb-1 size-4 w-full font-medium">{contact.name}</h3>
        <p className="14px">{contact.email}</p>
      </span>
      </div>
      <div className="flex justify-center gap-2">
        <button onClick={openEditMode}>
          <img 
            src="Vector.svg"
            className="rounded-full bg-white/60 p-2 shadow-sm transition-all duration-200 hover:bg-blue-100 hover:shadow-md active:scale-90"
          />
        </button>
        <button onClick={() => deleteCard(contact.id)}>
          <img
            src="trash.svg"
            className="rounded-full bg-white/60 p-2 shadow-sm transition-all duration-200 hover:bg-red-100 hover:shadow-md active:scale-90"
          />
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useFormik } from "formik";
import { collection, addDoc, doc, updateDoc} from "firebase/firestore";
import {db} from "../config/firebase"
import { toast } from "react-toastify";
import {ICreatedUser, IUser} from '../types/typesForApp.module.ts';
import {PropsForModal} from '../types/typesForApp.module.ts'

export default function Modal({ onClose,closeEdit, 
  getContact,isUpdate, contacts, contactForEdit}:PropsForModal) {
  const [isClosed, setIsClosed] = useState(false);
  const [nullValues, setNullValues] = useState(false);

  async function addContact(contact:ICreatedUser) {
    try {
      const contactRef = collection(db, "contact");
      await addDoc(contactRef, contact);
      getContact();
    } catch(error){
      console.log(error);
    } 
    
  }

  async function addUpdate(contactForEdit:ICreatedUser, id:string) {
    try {
      const docRef = doc(db, "contact", id);
      await updateDoc(docRef, {
      name: contactForEdit.name,
      email: contactForEdit.email,
    });
      getContact();
    } catch (error) {
      console.log(error)
    }
  }

function onClosing() {
  setIsClosed(true);

  setTimeout(() => {
    closeEdit();
    onClose();
  }, 300);
}

  const formik = useFormik({
    initialValues: isUpdate
      ? {
        name: contactForEdit?.name,
        email: contactForEdit?.email,
      }
      : {
        name: "",
        email: "",
      },
    onSubmit: async (values, { resetForm }) => {
        if (values.name && values.email) {
          if (isUpdate && contactForEdit?.id !== undefined) {
            await addUpdate(values, contactForEdit.id);
            toast.success("Contact Updated");
          }
        if (values.name && values.email) {
          if(!isUpdate && values !== undefined) {
            await addContact(values);
            toast.success("Contact Added");
          }
        }

        resetForm();
        setNullValues(false);
        onClose();
        closeEdit();
        
        console.log(contacts)
        console.log(values);

      } else{
        setNullValues(true);
        setTimeout(() => {
          setNullValues(false);
        }, 3000);
      }
    },
  });

  return (
    <div
      className={`absolute left-1/2 mt-54 h-64 w-80 -translate-x-1/2 rounded-2xl bg-white p-4 transition-all duration-300 ease-out starting:opacity-0 starting:scale-95 ${
        isClosed ? "scale-95 opacity-0" : "scale-100 opacity-100"
      }`}
    >
      <div className="flex w-full justify-end">
        <button
          type="button"
          onClick={onClosing}
          disabled={isClosed}
          className="flex items-center justify-center rounded-full text-2xl transition-all duration-300 hover:rotate-90 hover:bg-amber-200 active:scale-90"
        >
          <AiOutlineClose />
        </button>
      </div>
      {nullValues && (
        <p className="text-center text-sm text-red-500 ">
          Please fill in all fields
        </p>
      )}
      <form onSubmit={formik.handleSubmit}>
        <label className="flex flex-col gap-1">
          <span className="text-sm font-medium">Ім'я</span>
          <input
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            className="focus:border-gray-dark focus:ring-gray/20 w-full rounded-lg border border-black bg-white/70 p-2 transition-all duration-200 outline-none focus:ring-2"
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="mt-1 text-sm font-medium">Email</span>
          <input
            type="email"
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            className="focus:border-gray-dark focus:ring-gray/20 w-full rounded-lg border border-black bg-white/70 p-2 transition-all duration-200 outline-none focus:ring-2"
          />
        </label>
        <div className="flex w-full justify-end py-2">
          <button
            type="submit"
            className="bg-yellow text-base m-2 rounded-2xl p-2 font-medium shadow-sm transition-all duration-200 hover:bg-gray-100 active:scale-95"
          >
            {isUpdate ? "Update " : "Add "}contact
          </button>
        </div>
      </form>
    </div>
  );
}
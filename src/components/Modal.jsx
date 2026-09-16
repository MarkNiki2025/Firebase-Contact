import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useFormik } from "formik";

export default function Modal({ toggleButtonAddContact, toggleButton }) {
  const [isClosed, setIsClosed] = useState(false);

  function onClosing() {
    setIsClosed(true);
    setTimeout(() => {
      toggleButton();
    }, 300);
  }

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
    },
    onSubmit: (values, { resetForm }) => {
      toggleButtonAddContact(values);
      resetForm();
      console.log(values);
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
            Add contact
          </button>
        </div>
      </form>
    </div>
  );
}
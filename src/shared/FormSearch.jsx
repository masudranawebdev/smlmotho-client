import { useDispatch } from "react-redux";
import { setSearchTerm } from "../redux/features/searchSlice";
import { useState } from "react";
import { IoSearchOutline } from "react-icons/io5";

const FormSearch = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setSearchTerm(value));
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="border border-green-500 flex justify-between font-sans rounded-lg">
        <input
          id="search"
          type="text"
          name="search"
          placeholder="Search by title"
          className="w-full px-5 py-2 focus:outline-none rounded-l-lg text-black"
          value={value}
          onChange={(e)=> setValue(e.target.value)}
        />
        <button
          className="bg-secondary px-5 text-white rounded-r-lg"
          type="submit"
        >
          <IoSearchOutline />
        </button>
      </form>
    </>
  );
};

export default FormSearch;

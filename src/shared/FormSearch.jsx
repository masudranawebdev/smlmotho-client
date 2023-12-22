import { useDispatch } from "react-redux";
import { setSearchTerm } from "../redux/features/searchSlice";
import { useState } from "react";

const FormSearch = () => {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(setSearchTerm(value));
  };
  return (
    <>
      <form onSubmit={handleSubmit} className="flex-1 border border-green-500 flex justify-between font-sans rounded-lg">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search by title"
          className="px-5 py-2 grow focus:outline-none rounded-l-lg text-black"
          value={value}
          onChange={(e)=> setValue(e.target.value)}
        />
        <button
          className="bg-secondary px-5 text-white rounded-r-lg"
          type="submit"
        >
          search now
        </button>
      </form>
    </>
  );
};

export default FormSearch;

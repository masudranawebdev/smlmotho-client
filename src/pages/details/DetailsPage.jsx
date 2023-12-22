import { useParams } from "react-router-dom";
import { useMobileQuery } from "../../redux/api/mobileApi";
import Loader from "../../components/loader/Loader";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cartSlice";
import { IoCartOutline } from "react-icons/io5";
import { useState } from "react";

const DetailsPage = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const { id } = useParams();
  const { data, isLoading, isFetching } = useMobileQuery(id);
  const dispatch = useDispatch();
  const handleSelectColor = (value) => {
    setSelectedColor(value);
  };
  if (isLoading || isFetching) {
    return <Loader />;
  }

  return (
    <div className="container py-5">
      <div className="border shadow-md rounded pb-5">
        <div className="flex flex-col md:flex-row items-center overflow-hidden group">
          <img src={data?.mobile?.thumbnail} alt={data?.mobile?.title} />
          <div className="px-5 space-y-2">
            <h2 className="text-3xl font-bold mb-2 hover:underline cursor-pointer">
              {data?.mobile?.title}
            </h2>
            <p>
              <strong>Brand: </strong>
              <span>{data?.mobile?.brand}</span>
            </p>
            <p className="text-orange font-bold">{data?.mobile?.price}৳</p>
            <div className="flex gap-3">
              {data?.mobile?.color?.map((item) => (
                <div
                  key={item}
                  onClick={() => handleSelectColor(item)}
                  className={`group rounded-lg flex gap-2 items-center p-2 border-2 ${
                    selectedColor && "border-primary"
                  }`}
                >
                  <input
                    type="radio"
                    name="radio"
                    checked={item === selectedColor}
                    id={item}
                  />
                  <div
                    className={`w-6 h-6 rounded-lg ${
                      item === "Black"
                        ? "bg-black"
                        : item === "Blue"
                          ? "bg-blue-600"
                          : "bg-red-600"
                    }`}
                  ></div>
                </div>
              ))}
            </div>
            <div className="pt-5 md:pt-10">
              <button
                onClick={() => {
                  toast.success("Add to Cart Successful");
                  dispatch(addToCart({...data?.mobile, color: selectedColor}));
                }}
                className="flex gap-x-3 text-white bg-success-300 px-4 py-2 border hover:shadow-md hover:bg-success-400 transition-all duration-150 rounded-md"
              >
                <IoCartOutline className="w-6 h-6" />
                add to cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;

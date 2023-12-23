import { useParams } from "react-router-dom";
import { useAllMobilesQuery, useMobileQuery } from "../../redux/api/mobileApi";
import Loader from "../../components/loader/Loader";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cartSlice";
import { IoCartOutline } from "react-icons/io5";
import { useState } from "react";
import { getUniqueSize } from "../../utils/uniqueArr";
import { numberWithCommas } from "../../utils/numberWithCommas";
import Breadcrumb from "../../components/breadcrumb/BreadCrumb";

const DetailsPage = () => {
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const { id } = useParams();
  const { data, isLoading, isFetching } = useMobileQuery(id);
  const dispatch = useDispatch();
  const { data: allData } = useAllMobilesQuery(undefined);
  const sizes = getUniqueSize(allData?.allMobiles?.data);
  sizes?.sort((a, b) => {
    const inchA = parseInt(a.label, 10);
    const inchB = parseInt(b.label, 10);

    return inchA - inchB;
  });
  const handleSelectColor = (value) => {
    setSelectedColor(value);
  };

  const handleSelectSize = (value) => {
    setSelectedSize(value);
  };

  if (isLoading || isFetching) {
    return <Loader />;
  }

  return (
    <div className="container py-5">
      <Breadcrumb paths={[{label: "Home", link: "/"}, {label: data?.mobile?.brand, link: "#"}]}/>
      <div className="border shadow-md rounded pb-5">
        <div className="flex flex-col lg:flex-row items-center overflow-hidden group">
          <img className="w-2/4" src={data?.mobile?.thumbnail} alt={data?.mobile?.title} />
          <div className="px-5 space-y-2">
            <h2 className="text-3xl font-bold mb-2 hover:underline cursor-pointer">
              {data?.mobile?.title}
            </h2>
            <p>
              <strong>Brand: </strong>
              <span>{data?.mobile?.brand}</span>
            </p>
            <p className="text-orange font-bold">
              {data?.mobile?.status === "out-stock" ||
              data?.mobile?.status === "comming"
                ? "TBA"
                : numberWithCommas(data?.mobile?.price) + "৳"}
            </p>
            {/* color variation */}
            <div className="flex items-center gap-3 pb-3">
              <p>
                <strong>Color:</strong>
              </p>
              {data?.mobile?.color?.map((item) => (
                <div
                  key={item}
                  onClick={() => handleSelectColor(item)}
                  className={`group rounded-md flex gap-2 items-center p-1 border-2 ${
                    selectedColor === item && "border-primaryColor"
                  }`}
                >
                  <span
                    className={`w-6 h-6 rounded-full ${
                      item === "Black"
                        ? "bg-black"
                        : item === "Blue"
                          ? "bg-blue-600"
                          : "bg-red-600"
                    }`}
                  ></span>
                </div>
              ))}
            </div>
            {/* size variation */}
            <div className="flex flex-wrap items-center gap-3">
              <p>
                <strong>Display:</strong>
              </p>
              {sizes?.map((item) => (
                <div
                  key={item?.value}
                  onClick={() => handleSelectSize(item?.value)}
                  className={`group rounded-lg flex gap-2 items-center px-3 py-[2px] border-2 cursor-pointer ${
                    selectedSize === item.value && "border-primaryColor"
                  }`}
                >
                  <span className={`rounded-lg`}>{item?.label}"</span>
                </div>
              ))}
            </div>
            <div className="pt-5 md:pt-10">
              <button
                onClick={() => {
                  toast.success("Add to Cart Successful");
                  dispatch(
                    addToCart({
                      ...data?.mobile,
                      selectColor: selectedColor
                        ? selectedColor
                        : data?.mobile?.color[0],
                      selectSize: selectedSize
                        ? selectedSize
                        : data?.mobile?.size,
                    })
                  );
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

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useUserSignupMutation } from "../../redux/api/userApi";

const SignUp = () => {
  const [signUpError, setSignUpError] = useState("");
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const [userSignup, { isLoading }] = useUserSignupMutation();

  const handleSignUp = async (data) => {
    try {
      setLoading(true);
      const res = await userSignup(data);
      console.log(res.data.statusCode);
      if(res?.data?.data?.success){
        toast.success(res?.data?.data?.message);
        reset();
        navigate('/sign-in');
      }else if(res.data.statusCode === 500){
        toast.error("Already this email existed")
      }
    } catch (error) {
      console.error("Signup Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full mx-3 md:w-96 px-3 md:px-10 pt-5 pb-14 border rounded bg-slate-100 bg-white shadow-md">
        <h2 className="text-2xl text-center text-gray-900 my-4 font-bold border-b pb-2">
          Please Signup
        </h2>
        <form onSubmit={handleSubmit(handleSignUp)} className="space-y-4">
          <div className="w-full max-w-xs">
            <label htmlFor="username" className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              id="username"
              type="text"
              placeholder="username"
              className="border rounded px-3 p-1 w-full max-w-xs"
              {...register("userName", { required: "Name is required" })}
            />
            {errors.userName && (
              <p className="text-red-600"> {errors.userName.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label htmlFor="email" className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              id="email"
              type="email"
              placeholder="example@gmail.com"
              className="border rounded px-3 p-1 w-full max-w-xs"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-600"> {errors.email.message}</p>
            )}
          </div>
          <div className="form-control w-full max-w-xs">
            <label htmlFor="password" className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              id="password"
              type="password"
              placeholder="* * * * *"
              className="border rounded px-3 p-1 w-full max-w-xs"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be 6 character",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-600"> {errors.password.message}</p>
            )}
          </div>
          <input
            className="btn btn-accent my-4 w-full"
            value={loading || isLoading ? "Loading..." : "signup"}
            type="submit"
          />
          {signUpError && <p className="text-red-600">{signUpError}</p>}
        </form>
        <p className="text-[14px] mt-4">
          Already have a account?
          <Link to="/sign-in" className="text-secondary">
            Sign-in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;

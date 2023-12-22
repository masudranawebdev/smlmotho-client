import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useUserSigninMutation } from "../../redux/api/authApi";
import { setToLocalStorage } from "../../utils/local-storage";
import { authKey } from "../../constants/storageKey";

const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const [userSignin, { isLoading }] = useUserSigninMutation();

  const from = location.state?.from?.pathname || "/";

  const handleLogin = async (data) => {
    try {
      setLoading(true);
      const res = await userSignin(data);
      if (res?.data?.data?.success) {
        toast.success(res?.data?.data?.message);
        reset();
        navigate(from);
        setToLocalStorage(authKey, res?.data?.data?.data?.accessToken)
      } else if (res?.data?.statusCode === 500) {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.error("Signin Error: ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen px-3 md:px-0 bg-gray-100">
      <div className="w-full md:w-96 my-3 md:my-10 border rounded bg-slate-50 px-3 md:px-10 p-5 pb-20 bg-white shadow-md">
        <h2 className="text-2xl text-center text-gray-900 my-4 font-bold border-b pb-2">
          Please Login
        </h2>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-4">
          {/* email */}
          <div className="form-control my-2 w-full max-w-xs">
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
              <p className="text-red-600">{errors.email?.message}</p>
            )}
          </div>
          {/* password */}
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
                  message: "Password must be 6 characters or longer",
                },
              })}
            />
            {errors.password && (
              <p className="text-red-600">{errors.password?.message}</p>
            )}
          </div>
          <input
            className="btn w-full"
            value={loading || isLoading ? "Loading..." : "Login"}
            type="submit"
          />
        </form>
        <p className="text-[14px] mt-3">
          You don't have account.
          <Link to="/sign-up" className="text-secondary ml-2">
            Sign-up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;

import { UserIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"; // Import useNavigate
import { useForm } from "react-hook-form";
import AuthService from "../services/AuthService";

const backgroundImageUrl = "/images/background.jpg"; // Ensure this path is correct
const googleLogoUrl =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png";

const SignUpPage = () => {
  // --- React Hook Form ---
  const {
    register,
    handleSubmit: handleRHFSubmit,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      fullName: "", // Changed 'name' to 'fullName'
      email: "",
      username: "",
      password: "",
      confirmPassword: "",
      sendNotification: false, // This field doesn't map directly to the model
    },
  });

  // --- State for UI and API results ---
  const [apiError, setApiError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] =
    useState(false);
  const navigate = useNavigate(); // Initialize useNavigate

  // Watch password value for confirmation validation
  const passwordValue = watch("password");

  // --- Handle Submission with React Hook Form ---
  const onSubmit = async (data) => {
    setApiError(null);
    setSuccessMessage(null);

    try {
      await AuthService.signup(data);
      
      setSuccessMessage("Registration successful! Redirecting..."); // Updated success message
      reset();

      // Redirect after a short delay to show the success message
      setTimeout(() => {
        navigate('/');
      }, 1000);

    } catch (err) {
      console.error("Registration error:", err);
      setApiError(err.message || "An error occurred during registration.");
    }
  };

  // --- Toggle Password Visibility ---
  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  // Helper to get input border classes based on error state
  const getInputClass = (fieldName) => {
    return `w-full h-12 px-4 pr-10 rounded-lg border-2 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:border-transparent ${
      errors[fieldName]
        ? "border-red-500 ring-red-500" // Error state
        : "border-gray-400 focus:ring-blue-500" // Default state
    }`;
  };

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      className="relative min-h-screen w-full bg-cover bg-no-repeat font-sans"
    >
      <div className="flex justify-end h-screen">
        <div className="relative flex w-full h-full justify-end">
          {/* Sidebar */}
          <div className="absolute left-0 top-0 bottom-0 z-10 md:flex-col items-end w-[calc(20%+16rem)] h-full hidden md:flex">
            <div className="h-[calc(50%-11rem)] w-64 rounded-br-[78px]"></div>
            <div className="w-64 h-44 flex items-center justify-center rounded-l-full font-inter italic font-extrabold text-3xl leading-10 text-white">
              <Link
                to={"/login"}
                className="flex items-center justify-center rounded-l-full text-white font-inter italic font-extrabold text-3xl leading-10 no-underline"
              >
                Đăng nhập
              </Link>
            </div>
            <div className="w-64 h-44 flex items-center justify-center rounded-l-full font-inter italic font-extrabold text-3xl leading-10 backdrop-blur-lg shadow-md text-black">
              Đăng ký
            </div>
          </div>

          {/* Form Container */}
          <div className="flex absolute right-0 top-0 bottom-0 w-full md:w-[calc(80%-16rem)] h-full rounded-l-none md:rounded-l-[78px] backdrop-blur-lg justify-center items-center p-4 md:p-8 overflow-y-auto">
            <div className="w-full max-w-sm md:max-w-md">
              {/* Error/Success Messages */}
              {apiError && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                  role="alert"
                >
                  <strong className="font-bold">Error: </strong>
                  <span className="block sm:inline">{apiError}</span>
                  <button
                    onClick={() => setApiError(null)}
                    className="absolute top-0 bottom-0 right-0 px-4 py-3"
                    aria-label="Close"
                  >
                     <svg className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                  </button>
                </div>
              )}
              {successMessage && (
                <div
                  className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4"
                  role="alert"
                >
                  <strong className="font-bold">Success: </strong>
                  <span className="block sm:inline">{successMessage}</span>
                   <button
                    onClick={() => setSuccessMessage(null)} // Allow closing success message manually too
                    className="absolute top-0 bottom-0 right-0 px-4 py-3"
                    aria-label="Close"
                  >
                     <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                  </button>
                </div>
              )}

              {/* Registration Form */}
              <form onSubmit={handleRHFSubmit(onSubmit)} className="w-full">
                {/* Welcome Text */}
                <div className="mb-3 text-center">
                  <h2 className="text-2xl text-white py-2">
                    Chào mừng
                    <span className="text-blue-400 px-1">bạn mới</span>!
                  </h2>
                  <p className="text-sm text-gray-300 py-1">
                    Mỗi trang truyện là một phiêu lưu mới
                  </p>
                </div>

                {/* --- Full Name Input --- */}
                <div className="relative mb-1 mt-4">
                  <input
                    id="fullName" // Match id to field name
                    type="text"
                    placeholder="Full Name" // User-friendly placeholder
                    className={getInputClass("fullName")} // Use fullName for styling
                    aria-invalid={errors.fullName ? "true" : "false"}
                    {...register("fullName", { // Register fullName
                      required: "Full Name is required",
                    })}
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <UserIcon className="w-5 h-5" />
                  </span>
                </div>
                {errors.fullName && ( // Check errors.fullName
                  <p className="text-red-500 text-xs mt-1 mb-2 text-left">
                    {errors.fullName.message}
                  </p>
                )}

                {/* --- Email Input --- */}
                <div className="relative mb-1 mt-4">
                  <input
                    id="email"
                    type="email"
                    placeholder="Email"
                    className={getInputClass("email")}
                    aria-invalid={errors.email ? "true" : "false"}
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl">
                    @
                  </span>
                </div>
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1 mb-2 text-left">
                    {errors.email.message}
                  </p>
                )}

                {/* --- UserName Input --- */}
                <div className="relative mb-1 mt-4">
                  <input
                    id="username"
                    type="text"
                    placeholder="Username"
                    className={getInputClass("username")}
                    aria-invalid={errors.username ? "true" : "false"}
                    {...register("username", {
                      required: "Username is required",
                    })}
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                    <UserIcon className="w-5 h-5" />
                  </span>
                </div>
                {errors.username && (
                  <p className="text-red-500 text-xs mt-1 mb-2 text-left">
                    {errors.username.message}
                  </p>
                )}

                {/* --- Password Input --- */}
                <div className="relative mb-1 mt-4">
                  <input
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    placeholder="Password"
                    className={getInputClass("password")}
                    aria-invalid={errors.password ? "true" : "false"}
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be at least 6 characters",
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    aria-label={isPasswordVisible ? "Hide password" : "Show password"}
                  >
                    {isPasswordVisible ? (
                      <EyeOffIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-red-500 text-xs mt-1 mb-2 text-left">
                    {errors.password.message}
                  </p>
                )}

                {/* --- Confirm Password Input --- */}
                <div className="relative mb-1 mt-4">
                  <input
                    id="confirmPassword"
                    type={isConfirmPasswordVisible ? "text" : "password"}
                    placeholder="Confirm password"
                    className={getInputClass("confirmPassword")}
                    aria-invalid={errors.confirmPassword ? "true" : "false"}
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) =>
                        value === passwordValue || "Passwords do not match!",
                    })}
                  />
                  <button
                    type="button"
                    onClick={toggleConfirmPasswordVisibility}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
                    aria-label={isConfirmPasswordVisible ? "Hide confirmation password" : "Show confirmation password"}
                  >
                    {isConfirmPasswordVisible ? (
                      <EyeOffIcon className="h-5 w-5" />
                    ) : (
                      <EyeIcon className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-xs mt-1 mb-2 text-left">
                    {errors.confirmPassword.message}
                  </p>
                )}

                {/* Checkbox (sendNotification - handle this logic on backend if needed) */}
                <div className="flex justify-start items-center my-4 text-sm">
                  <label className="flex items-center text-gray-200 cursor-pointer">
                    <input
                      type="checkbox"
                      id="sendNotification"
                      {...register("sendNotification")}
                      className="size-4 mr-2 rounded border-gray-300 text-blue-500 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    Send notification to my email
                  </label>
                </div>

                {/* Sign Up Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full h-12 rounded-lg border-solid border-gray-700 border-2 my-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold flex items-center justify-center transition duration-150 ease-in-out ${
                    isSubmitting ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                >
                  {isSubmitting ? (
                     <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                       <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                       <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                     </svg>
                  ) : (
                    "Sign up"
                  )}
                </button>

                {/* Google Sign Up Button */}
                <button
                  type="button"
                  onClick={() => console.log("Google sign-up clicked")} // Add your Google Sign Up logic here
                  disabled={isSubmitting} // Optionally disable during form submission
                  className={`w-full h-12 rounded-lg border-solid border-gray-400 border-2 my-3 bg-gray-100 hover:bg-gray-200 text-gray-800 flex items-center justify-center transition duration-150 ease-in-out ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  <img
                    src={googleLogoUrl}
                    alt="Google logo"
                    className="h-5 w-5"
                  />
                  <span className="pl-3 font-medium">Sign up with Google</span>
                </button>

                {/* Bottom Links */}
                <div className="text-center mt-4 text-sm">
                  <p className="text-gray-300 py-1">
                    Already have an account?
                    <Link
                      to="/login"
                      className="text-blue-300 hover:text-blue-100 pl-1 hover:underline"
                    >
                      Log in
                    </Link>
                  </p>
                  <p className="text-gray-300 py-1">
                    Go back to
                    <Link
                      to="/"
                      className="text-blue-300 hover:text-blue-100 pl-1 hover:underline"
                    >
                      home page
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
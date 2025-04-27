import { LockIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import { useForm } from "react-hook-form";

const backgroundImageUrl = "/images/background.jpg";
const googleLogoUrl =
  "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"; // Keep external URL or download

function LoginPage() {
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(null); // To store login error messages
  const [successMessage, setSuccessMessage] = useState(null); // To store success messages
  const [loading, setLoading] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  // --- Replace this with your actual API call logic ---
  const onSubmit = async (data) => {
    const { email, password } = data;
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    // await new Promise((resolve) => setTimeout(resolve, 1500));

    await AuthService.login(email, password)
      .then(() => {
        setSuccessMessage("Login successful! Redirecting...");
        setLoading(false);
        navigate("/admin/");
      })
      .catch((error) => {
        console.error("Login error:", error);
        setLoading(false);
        setError("Invalid email or password.");
      });
  };

  const togglePassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImageUrl})` }}
      className="relative min-h-screen w-full bg-cover bg-no-repeat font-sans"
    >
      <div className="flex justify-end h-screen">
        <div className="relative flex w-full h-full justify-end">
          <div className="absolute left-0 top-0 bottom-0 z-10 flex-col items-end w-[calc(20%+16rem)] h-full hidden md:flex">
            <div className="h-[calc(50%-11rem)] w-64 rounded-br-[78px]"></div>
            <div className="w-64 h-44 flex items-center justify-center rounded-l-full font-inter italic font-extrabold text-3xl leading-10 backdrop-blur-lg shadow-md text-black">
              Đăng nhập
            </div>

            <div className="flex-1 w-64 rounded-tr-[78px] pt-[1px]">
              <Link
                to={"/signup"}
                className="w-full h-44 flex items-center justify-center rounded-l-full text-white font-inter italic font-extrabold text-3xl leading-10 no-underline transition duration-200"
              >
                Đăng ký
              </Link>
            </div>
          </div>

          <div className="flex absolute right-0 top-0 bottom-0 w-full md:w-[calc(80%-16rem)] h-full rounded-l-none md:rounded-l-[78px] backdrop-blur-lg justify-center items-center p-4 md:p-8">
            <div className="w-full max-w-sm md:max-w-md">
              {error && (
                <div
                  className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
                  role="alert"
                >
                  <strong className="font-bold">Error: </strong>
                  <span className="block sm:inline">{error}</span>
                  <button
                    onClick={() => setError(null)}
                    className="absolute top-0 bottom-0 right-0 px-4 py-3"
                  >
                    <svg
                      className="fill-current h-6 w-6 text-red-500"
                      role="button"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <title>Close</title>
                      <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                    </svg>
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
                    onClick={() => setSuccessMessage(null)}
                    className="absolute top-0 bottom-0 right-0 px-4 py-3"
                  >
                    <svg
                      className="fill-current h-6 w-6 text-green-500"
                      role="button"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                    >
                      <title>Close</title>
                      <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
                    </svg>
                  </button>
                </div>
              )}
              <form onSubmit={handleSubmit((data) => onSubmit(data))} className="w-full">
                <div className="mb-6 text-center">
                  <h2 className="text-2xl text-white py-2">
                    Chào mừng
                    <a
                      href="#"
                      className="text-blue-400 px-1 hover:text-blue-300"
                    >
                      trở lại
                    </a>
                    !
                  </h2>
                  <p className="text-sm text-gray-300 py-1">
                    {" "}
                    Mỗi trang truyện là một phiêu lưu mới
                  </p>
                </div>

                {/* Email Input */}
                <div className="relative mb-4">
                  <input
                    id="email"
                    type="text"
                    className="w-full h-12 px-4 pr-10 rounded-lg border-2 border-gray-400 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Email"
                    {...register("email", { required: true })}
                  />
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl">
                    @
                  </span>
                </div>

                {/* Password Input */}
                <div className="relative mb-4">
                  <input
                    id="password"
                    type={isPasswordVisible ? "text" : "password"}
                    className="w-full h-12 pl-4 pr-10 rounded-lg border-2 border-gray-400 bg-white text-black placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Password"
                    {...register("password", { required: true })}
                  />
                  <LockIcon
                    onClick={togglePassword}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
                  />
                </div>

                {/* Remember Me & Recovery */}
                <div className="flex justify-between items-center mb-6 text-sm">
                  <label className="flex items-center text-gray-200 cursor-pointer">
                    <input
                      type="checkbox"
                      name="remember"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="size-4 mr-2 rounded border-gray-300 text-blue-500 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
                    />
                    Remember me
                  </label>
                  <a
                    href="#"
                    className="text-gray-300 hover:text-white hover:underline"
                  >
                    Recovery password
                  </a>
                </div>

                <button
                  onClick={handleSubmit}
                  type="submit"
                  disabled={loading}
                  className={`w-full h-12 rounded-lg border-solid border-gray-700 border-2 my-2 bg-blue-500 hover:bg-blue-600 
                    text-white font-semibold flex items-center justify-center transition duration-150 ease-in-out ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                >
                  {loading ? (
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                  ) : (
                    "Log in"
                  )}
                </button>
                <button
                  type="button" // Important: prevent form submission
                  onClick={() => {
                    console.log("Google login clicked");
                  }}
                  className="w-full h-12 rounded-lg border-solid border-gray-400 border-2 my-3 bg-gray-100 hover:bg-gray-200 text-gray-800 flex items-center justify-center transition duration-150 ease-in-out"
                >
                  <img
                    src={googleLogoUrl}
                    alt="Google logo"
                    className="h-5 w-5"
                  />
                  <span className="pl-3 font-medium">Log in with Google</span>
                </button>

                <div className="text-center mt-4 text-sm">
                  <p className="text-gray-300 py-1">
                    Don{"'"}t have an account?
                    <Link
                      to="/signup"
                      className="text-blue-300 hover:text-blue-100 pl-1 hover:underline"
                    >
                      Sign up
                    </Link>
                  </p>
                  <p className="text-gray-300 py-1">
                    Go back to
                    <Link
                      to={"/"}
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
}

export default LoginPage;

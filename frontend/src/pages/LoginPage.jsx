import { useState } from "react";
import { Loader } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";
import { Helmet } from "react-helmet";

const LoginPage = () => {
  
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { isLoggingIn, login } = useAuthStore();

  const validateForm = () => {
    if (!formData.username && !formData.password)
      return toast.error("Fields can't be empty");
    if (!formData.username.trim()) return toast.error("Username is required");
    if (!formData.password.trim()) return toast.error("Password is required");

    return true;
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const success = validateForm();

    if (success === true) {
      login(formData);
    }
  };

  if (isLoggingIn) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Login • Instagram</title>
      </Helmet>

      <div className="w-screen h-screen flex items-center justify-center">
        <div className="flex flex-col gap-5">
          <form
            onSubmit={handleLogin}
            className="max-w-[90vw] sm:max-w-[50vw] md:max-w-[25vw] min-h-[40vh] h-[60vh] flex justify-center outline outline-gray-400 sm:outline-gray-300"
          >
            {/* wrapper */}
            <div className="w-[90%] flex flex-col items-center justify-center gap-5">
              {/* logo */}

              <div className="flex flex-col items-center justify-center gap-5">
                <h3
                  style={{ fontFamily: "'Pacifico', cursive " }}
                  className="text-2xl sm:text-3xl md:text-4xl"
                >
                  Instagram
                </h3>
                <div className="flex flex-col items-center justify-center text-gray-500 text-[13px] sm:text-[14px] md:text-[15px]">
                  <span>Login to see photoes and videos</span>
                  <span>from your friends.</span>
                </div>
              </div>

              {/* inputs */}
              <div className="flex flex-col gap-3 w-[95%]">
                <input
                  name="username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="username"
                  className="outline outline-gray-200 p-1 w-[100%] h-[35px] focus:outline-gray-400 bg-[#FAFAFA] text-[12px] rounded-sm"
                />
                <input
                  name="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      [e.target.name]: e.target.value,
                    })
                  }
                  type="text"
                  placeholder="password"
                  className="outline outline-gray-200 p-1 w-[100%] h-[35px] focus:outline-gray-400 bg-[#FAFAFA] text-[12px] rounded-sm"
                />
              </div>

              {/* button */}
              <div className="w-[95%] sm:w-[90%]">
                <button className="text-center bg-[#64bffc] text-[#fff] text-[13px] rounded-lg p-2 w-full">
                  Login
                </button>
              </div>
            </div>
          </form>

          <NavLink
            to={"/signup"}
            className="w-[90vw] sm:w-[50vw] md:w-[25vw] h-[50px] sm:h-[70px] flex flex-col items-center justify-center outline outline-gray-400 sm:outline-gray-300 text-[13px]"
          >
            <p>Don't have an account?</p>
            <span className="text-blue-700">Sign up</span>
          </NavLink>

          <div></div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;

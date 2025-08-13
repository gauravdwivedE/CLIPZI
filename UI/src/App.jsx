import React from "react";
import ThemeToggle from "./components/ThemeToggle";
import IndexRouting from "./routes/IndexRouting";
import axios from "./api/axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout, setUser } from "./redux/user/userSlice";
import { useEffect } from "react";
const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const { theme } = useSelector((state) => state.theme);

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        return dispatch(logout());
      }
      try {
        const response = await axios.get("/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          dispatch(setUser(response.data.user));
        }
      } catch (error) {
        dispatch(logout());
        navigate("/");
      }
    };

    checkUser();
  }, [path]);

  return (
    <div
      className={`${
        theme === "light" ? "bg-white" : "bg-[#0E131E]"
      } min-h-screen  transition-all duration-1000 p-2 md:p-5 md:px-7`}
    >
      <IndexRouting />
      <ThemeToggle />
    </div>
  );
};

export default App;

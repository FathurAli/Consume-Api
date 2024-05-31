import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function profile() {
  const [dataProfile, setDataProfile] = useState({});

  useEffect(() => {
    axios
      .get("http://localhost:8000/profile", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setDataProfile(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const navigate = useNavigate();

  function handleLogout() {
    axios
      .get("http://localhost:8000/logout", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        localStorage.removeItem("access_tokenn");
        navigate("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
          <a
            href="#"
            class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          >
            <div className="flex flex-col ">
              <div class="rounded w-36 h-36 overflow-hidden bg-gray-100 dark:bg-gray-600">
                <svg
                  class="absolute w-36 h-36 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>

            <div class="flex flex-col justify-between p-4 leading-normal">
              <h5 className="flex flex-col items-center mb-1 text-2xl font-semibold text-gray-900 dark:text-white text-right">
                {dataProfile.username}
              </h5>
              <span className=" flex flex-col items-center text-sm text-gray-500 dark:text-gray-400 text-right">
                {dataProfile.email}
              </span>
            </div>
          </a>

          <div className="flex mt-6 space-x-40 bg-white">
            <a
              href="#"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-800"
            >
              Dashboard
            </a>
              <a
                onClick={handleLogout}
                className="
                inline-flex items-center px-9 py-2 text-sm font-medium text-center text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-800"
                        >
                Logout
              </a>
            </div>
          </div>
        </div>
    </>
  );
}

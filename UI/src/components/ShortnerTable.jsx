import React, { useState } from "react";
import { FaCopy } from "react-icons/fa6";
import { HiLink } from "react-icons/hi2";
import { HiLinkSlash } from "react-icons/hi2";
import { MdOutlineFileDownload } from "react-icons/md";
import CustomeToast from "./CustomeToast";
import axios from "../api/axios";
import Loader from "./Loader";
import useImagePopup from "../hooks/useImagePopup";
import { useSelector } from "react-redux";

const ShortnerTable = ({ data, setIsQrGenerated }) => {
  const { showPopup } = useImagePopup();
  const [loadingId, setLoadingId] = useState("");
  const { theme } = useSelector((state) => state.theme);

  const showImagePopup = (qrImage) => {
    showPopup(qrImage);
  };

  const handleCopy = async (textToCopy) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      CustomeToast();
    } catch (err) {
      CustomeToast("Failed to copy", true);
    }
  };

  const generateQrForUrl = async (id) => {
    setLoadingId(id);
    try {
      const response = await axios.post("/qrs/url", { id }, {});

      if (response.status === 201) {
        const existing = JSON.parse(localStorage.getItem("myShortened")) || [];
        const updatedUrls = existing.map((obj) => {
          if (obj._id === id) {
            return { ...obj, qrImage: response.data.qrImage };
          }
          return obj;
        });

        localStorage.setItem("myShortened", JSON.stringify(updatedUrls));
        setIsQrGenerated((prev) => !prev);
        CustomeToast(response.data.message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoadingId("");
    }
  };

  return (
    <>
      <div className="w-full overflow-x-auto text-[#C9CED6] mt-15 transition-all duration-1000">
        <div className="flex justify-center min-w-max">
          
          {data && <table className="w-[78rem] rounded-xl overflow-hidden border-separate border-spacing-y-[3px] ">
            <tr
              className={`${
                theme === "light" ? "bg-gray-300 text-gray-800" : "bg-[#181E29]"
              } transition-all duration-1000`}
            >
              <th className="text-left p-4 text-[14px] whitespace-nowrap">
                Short Link
              </th>
              <th className="text-left p-4 text-[14px] whitespace-nowrap">
                Original Link
              </th>
              <th className="text-left p-4 text-[14px] whitespace-nowrap">
                QR Code
              </th>

              <th className="text-left p-4 text-[14px] whitespace-nowrap">
                One Time
              </th>

              <th className="text-left p-4 text-[14px] whitespace-nowrap">
                Status
              </th>

              <th className="text-left p-4 text-[14px] whitespace-nowrap">
                Date
              </th>
            </tr>

            {data.length > 0 &&
              data.map((item) => (
                <tr
                  className={`${
                    theme === "light"
                      ? "bg-gray-200 text-gray-800"
                      : "bg-[rgba(30,35,45,0.35)] "
                  } transition-all duration-1000`}
                >
                  <td className="whitespace-nowrap text-[13px] py-2 pl-4 flex gap-3 items-center ">
                    {`${window.location.origin + "/" + item.shortCode}`}
                    <span
                      onClick={() =>
                        handleCopy(
                          window.location.origin + "/" + item.shortCode
                        )
                      }
                      className={`w-8 h-8 rounded-full flex justify-center items-center ${
                        theme === "light" ? "bg-gray-300" : "bg-[#1C283FB0]"
                      }  cursor-pointer transition-all duration-1000`}
                    >
                      <FaCopy />
                    </span>
                  </td>

                  <td className="whitespace-nowrap text-[13px] py-2 pl-4 max-w-[320px] overflow-hidden text-ellipsis">
                    {item.originalUrl}
                  </td>

                  <td className="whitespace-nowrap text-[13px] py-2 pl-4 flex gap-3 items-center font-light">
                    {item.qrImage ? (
                      <>
                        <img
                          className="w-5 h-5 object-contain"
                          src={`${item.qrImage}`}
                        />
                        <span
                          onClick={() => showImagePopup(item.qrImage)}
                          className={`w-8 h-8 rounded-full flex justify-center items-center ${
                            theme === "light" ? "bg-gray-300" : "bg-[#1C283FB0]"
                          } transition-all duration-1000`}
                        >
                          <MdOutlineFileDownload />
                        </span>
                      </>
                    ) : (
                      <button
                        onClick={() =>
                          loadingId !== item._id && generateQrForUrl(item._id)
                        }
                        className="text-[10px] px-3 py-2 bg-[#144EE3] cursor-pointer text-white rounded-full text-sm shadow-[12px_5px_24px_#144EE380]"
                      >
                        {loadingId === item._id ? <Loader /> : "Generate QR"}
                      </button>
                    )}
                  </td>

                  <td className="text-[13px] py-2 pl-5">
                    {item.oneTime ? "Yes" : "No"}
                  </td>

                  <td className="whitespace-nowrap text-[13px] py-2 pl-4 flex  items-center justify-between font-light  w-28">
                    <span
                      className={`${
                        item.isActive ? "text-[#1EB036]" : "text-[#B0901E]"
                      } `}
                    >
                      {item.isActive ? "Active" : "Inactive"}
                    </span>
                    <span
                      className={`w-8 h-8 rounded-full flex justify-center items-center ${
                        item.isActive
                          ? "bg-[#1EB03624]"
                          : "bg-[#B0901E30] text-[#B0901E]"
                      } `}
                    >
                      {item.isActive ? <HiLink /> : <HiLinkSlash />}
                    </span>
                  </td>

                  <td className="text-[13px] py-2 pl-4">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
          </table>}
        </div>
      </div>
    </>
  );
};

export default ShortnerTable;

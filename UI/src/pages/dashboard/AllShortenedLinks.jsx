import React, { useEffect, useState } from "react";
import { FaCopy, FaRegEye } from "react-icons/fa6";
import { HiLink } from "react-icons/hi2";
import { HiLinkSlash } from "react-icons/hi2";
import { MdDisabledVisible, MdMoreVert, MdOutlineFileDownload,} from "react-icons/md";
import CustomeToast from "../../components/CustomeToast";
import axios from "../../api/axios";
import Loader from "../../components/Loader";
import useImagePopup from "../../hooks/useImagePopup";
import ActiveLinkPopup from "../../components/ActiveLinkPopup";
import InactiveLinkPopup from "../../components/InactiveLinkPopup";
import ChangePasswordPopup from "../../components/ChangePasswordPopup";
import { useSelector } from "react-redux";
import Loader2 from "../../components/Loader2";

const AllShortenedLinks = () => {
  const { theme } = useSelector((state) => state.theme);
  const { showPopup } = useImagePopup();
  const [loadingId, setLoadingId] = useState("");
  const [shortened, setShortended] = useState([]);
  const [dataLoad, setDataLoad] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [openPopup2, setOpenPopup2] = useState(false);
  const [openPopup3, setOpenPopup3] = useState(false);
  const [linkId, setLinkId] = useState("");
  const [loading, setLoading] = useState(false);

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
        CustomeToast(response.data.message);
        setDataLoad((prev) => !prev);
      }
    } catch (error) {
    } finally {
      setLoadingId("");
    }
  };

  useEffect(() => {
    const getShortened = async () => {
      setLoading(true);
      try {
        const response = await axios.get("/urls", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        setShortended(response.data.shortened);
      } catch (error) {
         CustomeToast(error.response?.data?.error || error.message)
      } finally {
        setLoading(false);
      }
    };
    getShortened();
  }, [dataLoad]);

  return (
    <>
      <div className="w-full overflow-x-auto text-[#C9CED6] mt-15 transition-all duration-1000">
        {openPopup && (
          <ActiveLinkPopup
            setDataLoad={setDataLoad}
            linkId={linkId}
            setLinkId={setLinkId}
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          />
        )}
        {openPopup2 && (
          <InactiveLinkPopup
            setDataLoad={setDataLoad}
            linkId={linkId}
            setLinkId={setLinkId}
            openPopup={openPopup2}
            setOpenPopup={setOpenPopup2}
          />
        )}
        {openPopup3 && (
          <ChangePasswordPopup
            setDataLoad={setDataLoad}
            linkId={linkId}
            openPopup={openPopup3}
            setOpenPopup={setOpenPopup3}
          />
        )}

        {loading ? (
          <Loader2 />
        ) : (
          <div className="flex justify-center min-w-max">
            {shortened.length > 0 ? (
              <table className=" transition-all w-[110rem] rounded-xl overflow-hidden border-separate border-spacing-y-[3px]">
                <tr
                  className={`${
                    theme === "light"
                      ? "bg-gray-300 text-gray-800"
                      : "bg-[#181E29]"
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
                    Clicks
                  </th>

                  <th className="text-left p-4 text-[14px] whitespace-nowrap">
                    Status
                  </th>
                  <th className="text-left p-4 text-[14px] whitespace-nowrap">
                    Password
                  </th>
                  <th className="text-left p-4 text-[14px] whitespace-nowrap">
                    Date
                  </th>
                  <th className="text-left p-4 text-[14px] whitespace-nowrap">
                    Start After
                  </th>
                  <th className="text-left p-4 text-[14px] whitespace-nowrap">
                    Expire After
                  </th>

                  <th className="text-left p-4 pl-8 text-[14px] whitespace-nowrap">
                    Actions
                  </th>
                </tr>

                {shortened.length > 0 &&
                  shortened.map((item) => (
                    <tr
                      key={item._id}
                      className={`${
                        theme === "light"
                          ? "bg-gray-200 border-gray-400 text-gray-800"
                          : "bg-[#181E29] border-[#353C4A] text-white"
                      } bg-[rgba(24,30,41,0.35)] transition-all duration-1000`}
                    >
                      <td className="whitespace-nowrap text-[13px] py-2 pl-4 flex gap-3 items-center">
                        {`${window.location.origin + "/" + item.shortCode}`}
                        <span
                          onClick={() =>
                            handleCopy(
                              window.location.origin + "/" + item.shortCode
                            )
                          }
                          className={`w-8 h-8 rounded-full flex justify-center items-center ${
                            theme === "light"
                              ? "bg-gray-300"
                              : "bg-[#1C283FB0] "
                          }  cursor-pointer`}
                        >
                          <FaCopy />
                        </span>
                      </td>
                      {/* 
                  <td className="whitespace-nowrap text-[13px] py-2 pl-4 ">
                    {item.originalUrl}
                  </td> */}

                      <td className="whitespace-nowrap text-[13px] py-2 pl-4 max-w-[320px] overflow-hidden text-ellipsis">
                        {item.originalUrl}
                      </td>

                      <td className="whitespace-nowrap text-[13px] py-2 pl-4 flex gap-3 items-center font-light">
                        {item.qrImage ? (
                          <>
                            <img
                              className="w-5 h-5 object-contain"
                              src={`${item.qrImage}`}
                              alt="QR"
                            />
                            <span
                              onClick={() => showImagePopup(item.qrImage)}
                              className={`w-8 h-8 rounded-full flex justify-center items-center ${
                                theme === "light"
                                  ? "bg-gray-300"
                                  : "bg-[#1C283FB0]"
                              }`}
                            >
                              <MdOutlineFileDownload />
                            </span>
                          </>
                        ) : (
                          <button
                            onClick={() =>
                              loadingId !== item._id &&
                              generateQrForUrl(item._id)
                            }
                            className="text-[10px] px-3 py-2 bg-[#144EE3] cursor-pointer text-white rounded-full text-sm shadow-[12px_5px_24px_#144EE380]"
                          >
                            {loadingId === item._id ? (
                              <Loader />
                            ) : (
                              "Generate QR"
                            )}
                          </button>
                        )}
                      </td>

                      <td className="text-[13px] py-2 pl-5">
                        {item.oneTime ? "Yes" : "No"}
                      </td>


                      <td className="text-[13px] py-2 pl-5">
                        {item.clicks }
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

                      <td className="text-[13px] text-center">
                        {item.password ? "Yes" : "No"}
                      </td>

                      <td className="text-[13px] py-2 pl-4">
                        {new Date(item.createdAt).toLocaleString("en-GB", {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                          hour12: true,
                        })}
                      </td>
                      <td className="text-[13px] py-2 pl-4">
                        {item.startAfterTime
                          ? new Date(item.startAfterTime).toLocaleString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                              }
                            )
                          : "Immediate"}
                      </td>

                      <td className="text-[13px] py-2 pl-4">
                        {item.expireAfterTime
                          ? new Date(item.expireAfterTime).toLocaleString(
                              "en-GB",
                              {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric",
                                hour: "numeric",
                                minute: "2-digit",
                                hour12: true,
                              }
                            )
                          : "Never"}
                      </td>
                      <td className="text-[13px] py pl-10 px-8 flex gap-5 ">
                        <span className=" text-lg cursor-pointer">
                          {" "}
                          {item.isActive ? (
                            <MdDisabledVisible
                              onClick={() => {
                                setLinkId(item._id), setOpenPopup2(true);
                              }}
                            />
                          ) : (
                            <FaRegEye
                              onClick={() => {
                                setLinkId(item._id), setOpenPopup(true);
                              }}
                            />
                          )}
                        </span>

                        <span className=" text-lg cursor-pointer">
                          <MdMoreVert
                            onClick={() => {
                              setLinkId(item._id), setOpenPopup3(true);
                            }}
                          />
                        </span>
                      </td>
                    </tr>
                  ))}
              </table>
            ) : (
              <p className="text-[#C9CED6]">No Links found generated by you</p>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default AllShortenedLinks;

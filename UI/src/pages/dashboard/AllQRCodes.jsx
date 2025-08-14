import React, { useEffect, useState } from "react";
import { FaCopy } from "react-icons/fa6";
import { MdDelete, MdOutlineFileDownload } from "react-icons/md";
import CustomeToast from "../../components/CustomeToast";
import axios from "../../api/axios";
import useImagePopup from "../../hooks/useImagePopup";
import DeleteQRPopup from "../../components/DeleteQRPopup";
import { useSelector } from "react-redux";
import Loader2 from "../../components/Loader2";

const AllQRCodes = () => {
  const { theme } = useSelector((state) => state.theme);
  const { showPopup } = useImagePopup();
  const [myQRs, setMyQRs] = useState([]);
  const [dataLoad, setDataLoad] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [QRId, setQRId] = useState(false);
  const [loading, setLoading] = useState(true)

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

  useEffect(() => {
    const getQRs = async () => {
      setLoading(true)
      try {
        const response = await axios.get("/qrs", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (response.status === 200) {
          setMyQRs(response.data.qrs);
        }
      } catch (error) {
        CustomeToast(error.response?.data?.error || error.message)
      }
      finally{
        setLoading(false)
      }
    };
    getQRs();
  }, [dataLoad]);

  return (
    <div
      className={`w-full overflow-x-auto mt-15 transition-all duration-1000 ${
        theme === "light" ? "text-gray-800" : "text-[#C9CED6]"
      }`}
    >
      {openPopup && (
        <DeleteQRPopup
          openPopup={openPopup}
          setOpenPopup={setOpenPopup}
          QRId={QRId}
          setDataLoad={setDataLoad}
        />
      )}

     {loading ? <Loader2 />: <div className="flex justify-center min-w-max">
        {myQRs.length > 0 ? (
          <table className="w-[78rem] rounded-xl overflow-hidden border-separate border-spacing-y-[3px]">
            <thead>
              <tr
                className={`transition-all duration-1000 ${
                  theme === "light" ? "bg-gray-300" : "bg-[#181E29]"
                }`}
              >
                <th className="text-left p-4 text-[14px] whitespace-nowrap">
                  URL
                </th>
                <th></th>
                <th className="text-left p-4 text-[14px] whitespace-nowrap">
                  QR Code
                </th>
                <th></th>
                <th className="text-left p-4 text-[14px] whitespace-nowrap">
                  Date
                </th>
                <th className="text-left p-4 text-[14px] whitespace-nowrap">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {myQRs.map((item) => (
                <tr
                  key={item._id}
                  className={`transition-all duration-1000 ${
                    theme === "light"
                      ? "bg-gray-200"
                      : "bg-[rgba(24,30,41,0.35)]"
                  }`}
                >
                  {/* URL */}
                  <td className="whitespace-nowrap text-[13px] py-2 pl-4 flex gap-3 items-center">
                    <span
                      className="truncate max-w-[400px]"
                      title={item.url}
                    >
                      {item.url}
                    </span>
                    <span
                      onClick={() => handleCopy(item.url)}
                      className={`w-8 h-8 rounded-full flex justify-center items-center cursor-pointer transition-all duration-300 ${
                        theme === "light"
                          ? "bg-gray-300 "
                          : "bg-[#1C283FB0]"
                      }`}
                    >
                      <FaCopy />
                    </span>
                  </td>

                  <td></td>

                  {/* QR Image */}
                  <td className="whitespace-nowrap text-[13px] py-2 pl-4 flex gap-3 items-center font-light">
                    <>
                      <img
                        className="w-5 h-5 object-contain"
                        src={`${item.qrcode}`}
                        alt="QR"
                      />
                      <span
                        onClick={() => showImagePopup(item.qrcode)}
                        className={`w-8 h-8 rounded-full flex justify-center items-center transition-all duration-300 ${
                          theme === "light"
                            ? "bg-gray-300 "
                            : "bg-[#1C283FB0]"
                        }`}
                      >
                        <MdOutlineFileDownload />
                      </span>
                    </>
                  </td>

                  <td></td>

                  {/* Date */}
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

                  {/* Actions */}
                  <td className="text-[13px] py pl-10 px-8 flex gap-5 relative">
                    <span className="text-lg cursor-pointer">
                      <MdDelete
                        onClick={() => {
                          setQRId(item._id);
                          setOpenPopup(true);
                        }}
                      />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-[#C9CED6]">No QR found generated by you</p>
        )}
      </div> }
    </div>
  );
};

export default AllQRCodes;

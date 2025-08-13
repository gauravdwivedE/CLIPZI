import Swal from "sweetalert2";
import CustomeToast from "../components/CustomeToast"; // adjust path as needed

const useImagePopup = () => {
  const showPopup = (imageUrl) => {
    Swal.fire({
      title: '<span style="color:#fff;">QR Code</span>',
      html: `
        <div style="display: flex; justify-content: center; width: 100%;">
          <div style="padding: 10px;">
            <img 
              src="${imageUrl}" 
              alt="QR Code"
              style="width: 200px; height: 200px; border-radius: 8px; box-shadow: 0 0 12px rgba(20,78,227,0.3);" 
            />
          </div>
        </div>
      `,
      background: "#0E131E",
      showCancelButton: true,
      showDenyButton: true,
      confirmButtonText: "Download",
      denyButtonText: "Share",
      cancelButtonText: "Close",
      customClass: {
        popup: "border border-[#144EE3] rounded-xl",
        confirmButton: "swal2-download-btn",
        denyButton: "swal2-share-btn",
        cancelButton: "swal2-cancel-btn",
      },
      buttonsStyling: false,
      didOpen: () => {
        const style = document.createElement("style");
        style.innerHTML = `
          .swal2-confirm.swal2-download-btn,
          .swal2-deny.swal2-share-btn,
          .swal2-cancel.swal2-cancel-btn {
            background: transparent;
            border: 1px solid #144EE3;
            color: #FFFFFF;
            padding: 10px 18px;
            font-size: 14px;
            border-radius: 8px;
            margin: 0 4px;
            box-shadow: 0 0 10px rgba(20,78,227,0.3);
            transition: all 0.3s ease;
          }

          .swal2-confirm.swal2-download-btn:hover {
            background: #144EE3;
          }

          .swal2-deny.swal2-share-btn:hover {
            background: #EB568E;
            border-color: #EB568E;
          }

          .swal2-cancel.swal2-cancel-btn:hover {
            background: #1a1f2f;
          }
        `;
        document.head.appendChild(style);
      },
      preConfirm: () => {
        const link = document.createElement("a");
        link.href = imageUrl;
        link.download = "qr-code.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        CustomeToast("Image downloaded!");
      },
      preDeny: async () => {
        try {
          const response = await fetch(imageUrl);
          const blob = await response.blob();
          const file = new File([blob], "qr-code.png", { type: blob.type });

          if (navigator.canShare && navigator.canShare({ files: [file] })) {
            await navigator.share({
              title: "QR Code",
              text: "Check this out!",
              files: [file],
            });
            CustomeToast("Image shared!");
            return true; // ✅ close popup
          }

          if (navigator.share) {
            await navigator.share({
              title: "QR Code",
              text: "Check this out!",
              url: imageUrl,
            });
            CustomeToast("Link shared!");
            return true; // ✅ close popup
          }

          // Fallback: open image in new tab
          window.open(imageUrl, "_blank");
          CustomeToast("Opened in new tab");
          return true; // ✅ close popup
        } catch (err) {
          if (err.name !== "AbortError") {
            CustomeToast("Sharing failed", true);
          }
          return false;
        }
      },
    });
  };

  return { showPopup };
};

export default useImagePopup;

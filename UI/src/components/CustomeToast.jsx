import { toast } from "react-hot-toast";

const CustomeToast = (message = "Copied", isError = false) => {
  const type = isError ? "error" : "success";

  // Get screen width to determine device type
  const width = window.innerWidth;

  // Define styles for each device type
  let style = {
    background: "#0E131E",
    border: "1px solid #144EE3",
    color: "#FFFFFF",
    padding: "14px 20px",
    borderRadius: "10px",
    boxShadow: "0 0 10px rgba(20,78,227,0.3)",
    fontSize: "14px",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    boxSizing: "border-box",
  };

  if (width <= 480) {
    // Mobile styles
    style = {
      ...style,
      minWidth: "150px",
      maxWidth: "80vw",
      fontSize: "12px",
      padding: "10px 14px",
    };
  } else if (width <= 768) {
    // Tablet styles
    style = {
      ...style,
      minWidth: "250px",
      maxWidth: "70vw",
      fontSize: "13px",
      padding: "12px 16px",
    };
  } else {
    // Laptop/Desktop styles
    style = {
      ...style,
      minWidth: "400px",
      maxWidth: "50vw",
      fontSize: "14px",
      padding: "14px 20px",
    };
  }

  toast[type](message, {
    style,
    iconTheme: {
      primary: "#144EE3",
      secondary: "#EB568E",
    },
  });
};

export default CustomeToast;

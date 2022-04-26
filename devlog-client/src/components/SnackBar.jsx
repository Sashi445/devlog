import ReactDom from "react-dom";
import { FaInfoCircle,FaTimesCircle,FaCheckCircle } from "react-icons/fa";

const SnackBar = ({ isOpen, message, type }) => {
  const snackType = {
    success: "green",
    error: "red",
    info: "blue",
  };
  const snackStyles = {
    position: "fixed",
    bottom: "0",
    left: "0",
    right: "0",
    width: "250px",
    zIndex: "9999",
    margin: "15px",
    border : "1px solid black", 
    borderLeft: `10px solid ${snackType[type] ? snackType[type] : "black"}`,
    color: "black",
    backgroundColor: "white",
    padding: "10px",
    fontSize: "14px",
    borderRadius: "5px",
    textAlign: "start",
    boxShadow: "0 0 10px rgba(0,0,0,0.5)",
    transition: "all 0.5s",
  };
  const iconStyles = { marginLeft: "5px", marginTop: "-2px" };
  if (!isOpen) return null;

  const iconRender = ()=>{
    if(type==="success"){
      return <FaCheckCircle style={iconStyles}/>
    }else if(type==="error"){
      return <FaTimesCircle style={iconStyles}/>
    }else{
      return <FaInfoCircle style={iconStyles}/>
    }
  };

  return ReactDom.createPortal(
    <div style={snackStyles}>
      <span>
        {iconRender()} {message}
      </span>
    </div>,
    document.getElementById("portal")
  );
};

export default SnackBar;

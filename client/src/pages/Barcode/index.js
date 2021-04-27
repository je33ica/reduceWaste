import { useState } from "react";
import NavBar from "../../components/NavBar";
import Scanner from "../../components/Scanner";
import navbarIcons from "../../icons/navbarIcons";

const Barcode = (props) => {
  
  const [scanning, setScanning] = useState(false);
  const [result, setResult] = useState(null)
  const toggleScanner = () => {
    setScanning(!scanning)
  }

  const readBarcode = (resultFromScan) => {
    if(resultFromScan?.codeResult?.code){
      setResult(resultFromScan.codeResult.code);
      toggleScanner()
    }
    return
  }


  const navBarItems = [
    { path: "/account", text: "Account", icon: navbarIcons.user }, //change icon?
    { path: "/dashboard", text: "Your store cupboard", icon: navbarIcons.barcode },
    { path: "/receipt", text: "Upload receipt", icon: navbarIcons.upload }, //chnage icon
    { path: "/addProducts", text: "Add products", icon: navbarIcons.add },
  ];
  return (
    <>
      <NavBar navBarItems={navBarItems} />
      <h1>Barcode page</h1>
      <button type="button" onClick={toggleScanner}>{scanning ? "Stop" : "Start Scanner"}</button>
      {scanning && <Scanner readBarcode={readBarcode} />}
      {result && <h1>Your barcode is {result}</h1>}
    </>
  )
};

export default Barcode;

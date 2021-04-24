// const invalidChars = ["$", "£", "€", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const invalid = /[0-9$£€]/gi;

const ocrParser = (arrFromOcr) => {
  return arrFromOcr.reduce((accArr, ocrObject) => {
    if (invalid.test(ocrObject.text)) {
      return accArr;
    } else if (ocrObject.text.toLowerCase().includes("www.")){
      return accArr;
    } else if (ocrObject.text.toLowerCase().includes("tesco")){
      return accArr
    } else if (ocrObject.text.toLowerCase().includes("aldi")){
      return accArr
    } else if (ocrObject.text.toLowerCase().includes("ltd")){
      return accArr
    } else if (ocrObject.text.toLowerCase().includes("£")){
      return accArr
    } else if (ocrObject.text.toLowerCase().includes("$")){
      return accArr
    } else if (ocrObject.text.toLowerCase().includes("multibuy")){
      return accArr
    } else if (ocrObject.text.toLowerCase().includes("€")){
      return accArr
    } else if (ocrObject.text.toLowerCase().includes("manager")){
      return accArr
    } else if (ocrObject.text.toLowerCase().includes(",")){
      return accArr
    } else if (ocrObject.text.toLowerCase().includes(".")){
      return accArr
    } else if (ocrObject.text.toLowerCase().includes("total")){
      return accArr
    } 

    accArr.push(ocrObject.text);
    return accArr;
  }, []);
};

export default ocrParser;

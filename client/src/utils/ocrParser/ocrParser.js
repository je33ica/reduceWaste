// const invalidChars = ["$", "£", "€", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const invalid = /[0-9$£€]/gi;

const ocrParser = (arrFromOcr) => {
  return arrFromOcr.reduce((accArr, ocrObject) => {
    if (invalid.test(ocrObject.text)) {
      return accArr;
    } else if (ocrObject.text.includes("www.")){
      return accArr;
    } else if (ocrObject.text.includes("TESCO STORES")){
      return accArr
    } else if (ocrObject.text.includes("ALDI")){
      return accArr
    } else if (ocrObject.text.includes("LTD")){
      return accArr
    }

    accArr.push(ocrObject.text);
    return accArr;
  }, []);
};

export default ocrParser;

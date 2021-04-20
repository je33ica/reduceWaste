// const invalidChars = ["$", "£", "€", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
const invalid = /[0-9$£€]/ig


const ocrParser = (arrFromOcr) => {
  return arrFromOcr.reduce((accArr, ocrObject) => {
    console.log("the text is: ", ocrObject.text)
    console.log('the rest of regex is:', invalid.test(ocrObject.text))
    if (invalid.test(ocrObject.text)){
      return accArr
    }

    accArr.push(ocrObject.text)
    return accArr
  }, [])
}

export default ocrParser
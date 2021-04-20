import Loading from "../Loading";
import PopUpAlert from "../PopUpAlert";

const ImageUpload = ({uploadImage, displayPopup, loading}) => {
 
  return (
    <>
    <input
      type="file"
      onChange={uploadImage}
      multiple
      style={{ marginTop: "20px", marginBottom: "20px" }}
    />
    {loading && <Loading />}
    {displayPopup.show && (
        <PopUpAlert type={displayPopup.type} message={displayPopup.message} />
      )}
    </>
  );
};

export default ImageUpload;
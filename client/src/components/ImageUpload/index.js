import Loading from "../Loading";
import PopUpAlert from "../PopUpAlert";

const ImageUpload = ({ uploadImage, displayPopup, loading }) => {
  return (
    <>
      <input
        type="file"
        onChange={uploadImage}
        style={{ marginTop: "20px", marginBottom: "20px" }}
        className="btn"
        style={{ cursor: "default" }}
      />
      {loading && <Loading />}
      {displayPopup.show && (
        <PopUpAlert type={displayPopup.type} message={displayPopup.message} />
      )}
    </>
  );
};

export default ImageUpload;

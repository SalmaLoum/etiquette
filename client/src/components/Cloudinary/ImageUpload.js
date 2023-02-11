import { openUploadWidget } from "../utils/CloudinaryService";

const ImageUpload = (props) => {
  const uploadImageWidget = () => {
    console.log(props);
    let myUploadWidget = openUploadWidget(
      {
        cloudName: props.cloud_name,
        uploadPreset: props.upload_preset,
        tags: ["myname"],
        maxImageWidth: 600,
        sources: [
          "local",
          "url",
          "camera",
          "instagram",
          "image_search",
          "google_drive",
          "facebook",
          "dropbox",
          "shutterstock",
          "getty",
          "istock",
          "unsplash"
        ]
      },
      function (error, result) {
        if (!error && result.event === "success") {
          props.onImageUpload(result.info.public_id);
        }
      }
    );
    myUploadWidget.open();
  };

  return (
    <button className="greenButton" onClick={uploadImageWidget}>
      Upload Image
    </button>
  );
};

export default ImageUpload;

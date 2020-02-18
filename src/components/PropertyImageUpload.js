import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { getPresignedUrl, saveFileToS3, saveImage } from "../services/ApiService";
import { getPropertyImages } from "../reducers/actions";

export const PropertyImageUpload = ({ property_id }) => {
  const dispatch = useDispatch();

  const onDrop = useCallback(
    acceptedFiles => {
      let imageIndex = 0;
      acceptedFiles.forEach(file => {
        const reader = new FileReader();
        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = async () => {
          const fileArrayBuffer = reader.result;
          const preSignedUrl = await getPresignedUrl(property_id, file.name);
          await saveFileToS3(file.name, preSignedUrl, fileArrayBuffer);
          const imageUrl = preSignedUrl.split("?")[0];
          await saveImage(0, property_id, imageUrl, null);
          imageIndex++;
          if (imageIndex === acceptedFiles.length) {
            dispatch(getPropertyImages(property_id));
          }
        };

        reader.readAsArrayBuffer(file);
      });
    },
    [property_id, dispatch]
  );

  const maxSize = 1048576;

  const { getRootProps, getInputProps, isDragActive, isDragReject, rejectedFiles } = useDropzone({
    onDrop,
    accept: "image/png, image/gif, image/jpg, image/jpeg",
    maxSize
  });

  const isFileTooLarge = rejectedFiles.length > 0 && rejectedFiles[0].size > maxSize;

  return (
    <div {...getRootProps()} id="propertyImageDropZone">
      <input {...getInputProps()} />
      {!isDragActive && "Click here or drop a file to upload!"}
      {isDragActive && !isDragReject && "Drop it like it's hot!"}
      {isDragReject && "File type not accepted, sorry!"}
      {isFileTooLarge && <div className="text-danger mt-2">File is too large.</div>}
    </div>
  );
};

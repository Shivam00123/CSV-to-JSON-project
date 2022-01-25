import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useDispatch } from "react-redux";
import { nextStep } from "../redux/action";

function MyDropzone() {
  const [Headers, setHeaders] = useState("");
  const dispatch = useDispatch();
  const onDrop = useCallback((acceptedFiles) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      reader.onerror = () => console.log("Something went wrong");
      reader.onload = () => {
        const fileContent = reader.result;
        setHeaders(fileContent.split("\r\n"));
      };
      reader.readAsBinaryString(file);
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ".csv,.xls",
  });
  useEffect(() => {
    if (Headers) {
      dispatch(nextStep(2, Headers.splice(0, Headers.length - 1)));
    }
  }, [Headers]);

  const dragDiv = {
    border: "1px solid black",
    width: "500px",
    height: "fit-content",
    backgroundColor: "#fff",
    padding: "10px",
    borderRadius: "10px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: "pointer",
  };

  return (
    <div {...getRootProps()} className="dropzone" style={dragDiv}>
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop the files here ...</p> : <p>Drag or Click</p>}
    </div>
  );
}
export default MyDropzone;

import { useEffect, useState } from "react";
import { connect } from "react-redux";

const Download = ({ data }) => {
  const [open, setOpen] = useState(false);
  const [fileName, setFileName] = useState("");
  const handleJsonFile = async (fileName) => {
    const json = JSON.stringify(data);
    const blob = new Blob([json], { type: "application/json" });
    const href = await URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = href;
    link.download = fileName + ".json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadFile = () => {
    setFileName(fileName.split(".")[0]);
    setOpen(false);
    handleJsonFile(fileName);
  };
  useEffect(() => {
    document.addEventListener("mousedown", (e) => {
      if (e.target.className.includes("parent")) {
        setOpen(false);
      }
    });
  }, []);

  const styleDiv = {
    width: "100vw",
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    backgroundColor: "gray",
  };
  const stylePrompt = {
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translateX(-50%)",
    width: "200px",
    height: "fit-content",
    border: "1px solid black",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    backgroundColor: "yellow",
    borderRadius: "5px",
  };

  return (
    <div style={styleDiv} className="parent">
      <button
        disabled={open}
        style={{ backgroundColor: open ? "#c1c1c1" : "" }}
        onClick={() => setOpen(true)}
        className="styleButton"
      >
        Download
      </button>
      {open && (
        <div style={stylePrompt} onClick={(e) => e.stopPropagation()}>
          <h6>Click outside the box to close</h6>
          <input
            type="text"
            onChange={(e) => setFileName(e.target.value)}
            placeholder="Enter file name"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleDownloadFile();
              }
            }}
          />
          {fileName ? (
            <button className="styleButton" onClick={handleDownloadFile}>
              Save
            </button>
          ) : (
            <button
              disabled
              style={{ padding: "10px 20px", marginTop: "10px" }}
            >
              Save
            </button>
          )}
        </div>
      )}
    </div>
  );
};

function mapStateToProps({ data }) {
  return {
    data,
  };
}

export default connect(mapStateToProps)(Download);

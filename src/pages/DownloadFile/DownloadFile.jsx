import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function DownloadFile() {
  const { type } = useParams();
  const id = localStorage.getItem("userid");

  useEffect(() => {
    // Fetch the file when the type or id changes
    axios
      .get(`http://localhost:5000/download/${type}/${id}`, {
        responseType: "arraybuffer",
      })
      .then((response) => {
        const blob = new Blob([response.data], {
          type: "application/pdf",
        });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = 'insurance.pdf'; // Set the file name for download
        a.click();
        window.URL.revokeObjectURL(url);
      });
  }, [type, id]); // Run the effect when type or id changes

  return (
    <div>DownloadFile</div>
  );
}

export default DownloadFile;

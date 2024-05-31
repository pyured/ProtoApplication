import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.scss";

function Dashboard() {
  const [file, setFile] = useState(null);
  const [link, setLink] = useState("");
  const [urls, setUrls] = useState([]);
  const [docuemnts, setDocuemnts] = useState([]);

  // for file upload
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  useEffect(() => {
    axios
      .get("https://proto-api.azurewebsites.net/links_list")
      .then((response) => {
        const data = response.data.list
        let urls = data.filter(element => element.type == '1');
        setUrls(urls);
        let docuemnt = data.filter(element => element.type == '2');
        setDocuemnts(docuemnt);
        console.log(response.data.list);
      });
  }, []);

  const handleUploadClick = () => {
    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("https://proto-api.azurewebsites.net/upload", formData)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error uploading file: ", error);
      });
  };

  // for web scrape
  const handleLinkChange = (e) => {
    setLink(e.target.value);
  };

  const handleLinkUpload = () => {
    if (link === "") {
      return;
    }
    axios
      .post("https://proto-api.azurewebsites.net/web_scrape?url_link=" + link)
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error uploading link: ", error);
      });
  };

  return (
    <div className="upload-body">
      <div className="file-upload">
        <div>
          <h1>Upload PDF</h1>
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUploadClick}>Upload</button>
        </div>
        <div className="prev-urls">
          <h3>Previously Uploaded Documents</h3>
          <ul>
            {urls.length > 0 &&
              docuemnts.map((url, i) => (
                <li key={i} className="prev-url">
                  {url.name}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className="url-scrape">
        <div className="url-input">
          <h1>URL Scraper</h1>
          <input
            type="text"
            onChange={handleLinkChange}
            placeholder="Enter link"
          />
          <button onClick={handleLinkUpload}>Enter</button>
        </div>
        <div className="prev-urls">
          <h3>Previously Uploaded URLs</h3>
          <ul>
            {urls.length > 0 &&
              urls.map((url, i) => (
                <li key={i} className="prev-url">
                  {url.name}
                </li>
              ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Dashboard;

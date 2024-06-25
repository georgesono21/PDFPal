import React, { useEffect, useState } from "react";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../home/Navbar";
import { PDFUploadByUser } from "../../firebase";

import "./Upload.css";

const PDFUploader = () => {
	const [pdfURL, setPdfURL] = useState(null);
	const [fileName, setFileName] = useState(null);
	const [uploading, setUploading] = useState(false);
	const [uploaded, setUploaded] = useState(false);
	const navigate = useNavigate();

	const handleFileChange = (e) => {
		const file = e.target.files[0];

		if (file && file.type === "application/pdf") {
			const pdfURL = URL.createObjectURL(file);
			setFileName(file.name);
			setPdfURL(pdfURL);
		} else {
			alert("Please select a PDF file.");
		}
	};

	const handlePDFUpload = async (e) => {
		// upload logic here

		const dateUploaded = new Date();
		setUploading(true);

		try {
			// Use await here to wait for the promise to resolve
			let res = await PDFUploadByUser(
				pdfURL,
				auth.currentUser.uid,
				fileName,
				dateUploaded
			);

			console.log(res);

			setUploading(false);
			setUploaded(true);
		} catch (error) {
			console.error("Error uploading PDF:", error);
			// Handle the error appropriately, e.g., show an error message to the user
			setUploading(false);
		}
	};
	const uploadAnotherPDF = (e) => {
		setPdfURL(null);
		setFileName(null);
		setUploaded(false);
		setUploading(false);
	};

	const handleHome = (e) => {
		navigate("/home");
	};

	return (
		// <Home> </Home>
		<div className="upload">
			<Navbar> </Navbar>
			<div className="upload-container">
				<h1>Upload a PDF</h1>

				<div class="parent">
					{!uploaded && (
						<div class="child">
							<input type="file" accept=".pdf" onChange={handleFileChange} />
						</div>
					)}
					{pdfURL && !uploading && !uploaded && (
						<div className="child">
							<button onClick={handlePDFUpload}>Upload</button>
						</div>
					)}
					{uploading && <div className="child">Uploading...</div>}
					{uploaded && pdfURL && (
						<div>
							<div className="child">Uploaded!</div>
							<div className="child">
								<button onClick={uploadAnotherPDF}>Upload Another File</button>
							</div>
						</div>
					)}
				</div>

				{pdfURL && (
					<div id="pdf-preview">
						{/* <h2>PDF Preview:</h2> */}
						<embed
							src={pdfURL}
							type="application/pdf"
							width="100%"
							height="600"
						/>
					</div>
				)}
			</div>
		</div>
	);
};

const UploadWithAuthCheck = () => {
	const user = auth.currentUser; // Check if a user is currently authenticated
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			// If the user is not authenticated, navigate to the landing page
			navigate("/");
			console.log("User is not authenticated. Navigating back to landing.");
		}
	}, [user, navigate]);

	return user ? <PDFUploader /> : null;
};

// export default PDFUploader;
export default UploadWithAuthCheck;

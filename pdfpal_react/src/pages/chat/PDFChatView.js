import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Document, Page, pdfjs } from "react-pdf";

import Navbar from "../home/Navbar";
import Chatbot from "./Chat";
import "./PDFChatView.css";

const PDFChatView = () => {
	const [downloadURL, setDownloadURL] = useState("");
	const location = useLocation();

	useEffect(() => {
		const searchParams = new URLSearchParams(location.search);
		const url = searchParams.get("downloadURL");

		if (url) {
			setDownloadURL(url);
		}

		// You can do additional actions based on the downloadURL here
	}, [location.search]);

	return (
		<div className="container">
			<Navbar />
			<div className="pdf-viewer">
				<div className="pdf-container">
					<embed
						src={downloadURL}
						type="application/pdf"
						width="100%"
						height="100%"
					/>
				</div>
				<div className="chat-container">
					<Chatbot />
				</div>
			</div>
		</div>
	);
};

export default PDFChatView;

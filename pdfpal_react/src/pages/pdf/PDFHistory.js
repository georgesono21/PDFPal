import React, { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import axios from "axios";
import Navbar from "../home/Navbar";
import {
	auth,
	db,
	subscribeToPDFCollection,
	deletePDF,
	retrievePdf,
} from "../../firebase";
import { useNavigate, Link } from "react-router-dom";
import { PDFChatView } from "../chat/PDFChatView";

import "./PDFHistory.css";

export const PDFHistory = () => {
	const [PDFFiles, setPDFFiles] = useState([]);
	const navigate = useNavigate();

	async function openPdfChat(pdfId) {
		// You can fetch the download URL based on the selectedPdfId
		// For now, let's assume you have the URL in a variable
		const uid = auth.currentUser.uid;
		const downloadUrl = await retrievePdf(uid, pdfId);

		console.log(downloadUrl);

		// Use URLSearchParams to create a query string
		const queryParams = new URLSearchParams();
		queryParams.set("downloadURL", downloadUrl);

		// Use navigate to go to the specified route with query parameters

		let pdfURL = "pdfURL";

		try {
			const response = await axios.post("http://127.0.0.1:5000", {
				pdfURL: downloadUrl,
			});

			if (response.status === 200) {
				const params = queryParams.toString();
				navigate(`/pdf-chat-view?${params}`);
			} else {
				console.error("Failed to get response from the server");
				// You can handle the error here, e.g., display a message to the user
			}
		} catch (error) {
			console.error("An error occurred:", error);
			// Handle the error as needed, e.g., display a message to the user
		}
	}

	const PDFList = ({ list }) => {
		if (list.length) {
			return (
				<ul className="pdf-list">
					{list.map((pdf, index) => (
						<li key={index} className="pdf-item">
							<div className="pdf-item-header">
								<button
									className="pdf-button"
									onClick={() => openPdfChat(pdf.id)}
								>
									<h3>{pdf.fileName ? pdf.fileName : "No Title"}</h3>
								</button>
								<button
									className="delete-button"
									onClick={() => deletePDF(pdf.id)}
								>
									Delete
								</button>
							</div>
							<ul>
								<li>
									<strong>Date Uploaded:</strong>{" "}
									{pdf.dateUploaded
										? new Date(
												pdf.dateUploaded.seconds * 1000
										  ).toLocaleDateString()
										: "No Date Uploaded"}
								</li>
							</ul>
						</li>
					))}
				</ul>
			);
		} else {
			return (
				<div>
					<h1> No PDFs... (upload a PDF!)</h1>
				</div>
			);
		}
	};

	useEffect(() => {
		const unsubscribe = subscribeToPDFCollection(
			auth.currentUser.uid,
			setPDFFiles
		);
		return () => unsubscribe(); // Cleanup the subscription when the component unmounts
	}, []); // Empty dependency array to ensure the effect runs only once on mount

	return (
		<div className="pdf-history-container">
			{/* <h2 className="pdf-history-title">Uploaded PDFs: </h2> */}
			<PDFList list={PDFFiles} />
		</div>
	);
};

const PDFHistoryPage = () => {
	return (
		<div>
			<Navbar></Navbar>
			<PDFHistory></PDFHistory>
		</div>
	);
};

const PDFHistoryWithAuthCheck = () => {
	const user = auth.currentUser; // Check if a user is currently authenticated
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			// If the user is not authenticated, navigate to the landing page
			navigate("/");
		}
	}, [user, navigate]);

	return user ? <PDFHistoryPage /> : null;
};

export default PDFHistoryWithAuthCheck;

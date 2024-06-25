// Navbar component
import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";

import "./Home.css";

const Navbar = () => {
	const navigate = useNavigate();

	const handlePDFHistoryClick = () => {
		navigate("/pdf-history");
	};

	const handleAbout = () => {
		navigate("/about-us");
	};

	const handlePDFUpload = () => {
		navigate("/upload");
	};

	const handleChat = () => {
		navigate("/chat");
	};

	const handleLogout = () => {
		signOut(auth)
			.then(() => {
				// Sign-out successful.
				navigate("/login");
				console.log("Signed out successfully");
			})
			.catch((error) => {
				// An error happened.
			});
	};

	return (
		<nav className="header">
			<ul className="nav-list">
				<li>
					<label className="logo">PDFPAL</label>
				</li>
				<li>
					<a onClick={handleAbout}>About</a>
				</li>
				{/* <li>
					<a onClick={handleChat}>Chat</a>
				</li> */}
				<li>
					<a onClick={handlePDFHistoryClick}>PDF History</a>
				</li>
				<li>
					<a onClick={handlePDFUpload}>PDF Upload</a>
				</li>
				{/* <li>
					<a href="">Suggestions</a>
				</li> */}

				<li>
					<div className="logout">
						<button onClick={handleLogout}>Logout</button>
					</div>
				</li>
			</ul>
		</nav>
	);
};

export default Navbar;

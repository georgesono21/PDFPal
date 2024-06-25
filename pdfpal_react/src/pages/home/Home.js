import React, { useEffect } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import { PDFHistory } from "../pdf/PDFHistory";

import "./Home.css";

// Home component
const Home = () => {
	return (
		<div className="home-container">
			<Navbar></Navbar>
			<PDFHistory></PDFHistory>
		</div>
	);
};

const HomeWithAuthCheck = () => {
	const user = auth.currentUser; // Check if a user is currently authenticated
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			// If the user is not authenticated, navigate to the landing page
			navigate("/");
		}
	}, [user, navigate]);

	return user ? <Home /> : null;
};

export default HomeWithAuthCheck;

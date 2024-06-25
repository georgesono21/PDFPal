import React, { useState, useEffect } from "react";
import Home from "./pages/home/Home";
import Signup from "./pages/auth/Signup";
import Login from "./pages/auth/Login";
import Chat from "./pages/chat/Chat";
import Landing from "./pages/landing/Landing";
import PDFUploader from "./pages/pdf/Upload";
import PDFHistory from "./pages/pdf/PDFHistory";
import PDFChatView from "./pages/chat/PDFChatView";
import About from "./pages/about/About";

import { BrowserRouter as Router } from "react-router-dom";
import { Routes, Route } from "react-router-dom";

import "./App.css";
import AboutPage from "./pages/about/About";

function App() {
	return (
		<Router>
			<div>
				<section>
					<Routes>
						{/* {" "} */}
						<Route path="/" element={<Landing />} />
						<Route path="/signup" element={<Signup />} />
						<Route path="/login" element={<Login />} />
						<Route path="/chat" element={<Chat />} />
						<Route path="/home" element={<Home />} />
						<Route path="/upload" element={<PDFUploader />} />
						<Route path="/pdf-history" element={<PDFHistory />} />
						<Route path="/pdf-chat-view" element={<PDFChatView />} />
						<Route path="/about-us" element={<About />} />
					</Routes>
				</section>
			</div>
		</Router>
	);
}

export default App;

import React from "react";
import { auth } from "../../firebase";
import { NavLink, useNavigate } from "react-router-dom";

import "./Landing.css";

const Landing = () => {
	const navigate = useNavigate();

	function goToLogin() {
		navigate("/login");
	}

	function goToSignup() {
		navigate("/signup");
	}

	return (
		<div className="landing">
			<div className="div">
				<div className="overlap">
					<div className="overlap-group">
						<div className="pdfpal-logo">PDFPAL</div>
						<p className="your-trusted">
							<span className="span">
								Your trusted companion for all things PDF! 📄💬
								<br />
							</span>
							<span className="question-header">
								<br />
								What is PDFPal?
								<br />
							</span>
							<span className="question-body">
								PDFPal is your personal AI-powered assistant that&#39;s here to
								make working with PDF documents a breeze. We understand that
								dealing with PDFs can sometimes be a daunting task, whether
								you&#39;re a student, a professional, or just someone who needs
								to work with these ubiquitous files. That&#39;s where PDFPal
								comes in!
								<br />
								<br />
							</span>
							<span className="question-header">
								How PDFPal Works?
								<br />
							</span>
							<span className="question-body">
								1. Upload Your PDF: Just upload your PDF document, and PDPpal
								will instantly analyze its content.
								<br />
								2. Engage in Conversation: PDFPal will interpret the content and
								allow you to engage in a natural and intuitive chat-based
								interaction.
								<br />
								3. Get Things Done: Whether you need to extract text, generate
								summaries, search for specific information, or perform other
								PDF-related tasks, PDFPal has you covered.
								<br />
							</span>
							<span className="question-header">
								<br />
								Why Choose PDFPal?
								<br />
							</span>
							<span className="question-body">
								• Efficiency: Say goodbye to the hassle of scrolling through
								endless pages or trying to find that one piece of information in
								a lengthy PDF. PDFPal makes it easy to get the information you
								need quickly.
								<br />
								• Accessibility: PDFPal is accessible 24/7 from anywhere with an
								internet connection. No need for downloads or installations –
								just log in and get started.
								<br />
								• Productivity: Save time and increase productivity by letting
								PDFPal handle PDF-related tasks, so you can focus on what truly
								matters.
								<br />
								• Security: We take your privacy seriously. Your PDF documents
								are processed securely, and we do not store any of your uploaded
								content.
								<br />
							</span>
							<span className="question-header">
								<br />
								Who Can Benefit from PDFPal?
								<br />
							</span>
							<span className="question-body">
								Students: PDFPal can help you research and study more
								effectively by summarizing long research papers or extracting
								key information.
								<br />
								Professionals: From legal documents to business reports, PDFPal
								simplifies the process of extracting valuable insights and data
								from your PDF files.
								<br />
								Researchers: PDFPal aids in analyzing and cross-referencing
								information from academic journals, conference papers, and
								technical documents.
							</span>
						</p>
					</div>
					<div className="home-wrapper">
						<NavLink className="no-style" to="/">
							Home
						</NavLink>
					</div>
				</div>
				<div className="signup-login-container">
					<div className="login-container">
						<button className="login-signup-rectangle" onClick={goToLogin}>
							<div className="login-text-wrapper">Login</div>
						</button>
					</div>
					<div className="signup-container">
						<button className="login-signup-rectangle" onClick={goToSignup}>
							<div className="signup-text-wrapper">Sign Up</div>
						</button>
					</div>
				</div>
				<div className="register-text-wrapper" onClick={goToSignup}>
					<NavLink className="no-style" to="/signup">
						Register
					</NavLink>
				</div>
				<div className="contact-text-wrapper">
					<NavLink className="no-style" to="/">
						Contact Us
					</NavLink>
				</div>
			</div>
		</div>
	);
};

export default Landing;

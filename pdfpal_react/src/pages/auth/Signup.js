/* include html here  */
//https://www.freecodecamp.org/news/use-firebase-authentication-in-a-react-app/

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { createNewUserDocument } from "../../firebase";

import "./Signup.css";

const Signup = () => {
	const navigate = useNavigate();

	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onSubmit = async (e) => {
		e.preventDefault();

		await createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				createNewUserDocument(user.uid, firstName, lastName, email);
				navigate("/home");
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
				// ..
			});
	};

	function goToLanding() {
		navigate("/");
	}

	function goToLogin() {
		navigate("/login");
	}

	return (
		<div className="desktop">
			<div className="div">
				<div className="overlap-group">
					<div className="sign-up-shadow" />
					<div className="sign-up-rectangle" />
					<div className="password-shadow" />
					<div className="password-rectangle" />
					<div className="email-shadow" />
					<div className="email-rectangle" />
					<div className="last-name-shadow" />
					<div className="last-name-rectangle" />
					<div className="first-name-shadow" />
					<div className="first-name-rectangle" />
					<div className="sign-up-box">Sign Up</div>
					<form>
						<div className="first-name-input">
							{/* <label htmlFor="first-name">First Name</label> */}
							<input
								type="text"
								label="First Name"
								class="form-input"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								required
								placeholder="First Name"
							/>
						</div>

						<div className="last-name-input">
							{/* <label htmlFor="first-name">Last Name</label> */}
							<input
								type="text"
								label="Last Name"
								class="form-input"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								required
								placeholder="Last Name"
							/>
						</div>

						<div className="email-input">
							{/* <label htmlFor="first-name">Last Name</label> */}
							<input
								type="text"
								label="Email"
								class="form-input"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								placeholder="Email"
							/>
						</div>
						<div className="password-input">
							{/* <label htmlFor="first-name">Last Name</label> */}
							<input
								type="password"
								label="Password"
								class="form-input"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								placeholder="Password"
							/>
						</div>

						<button type="submit" onClick={onSubmit}>
							<div className="sign-up-button">
								<div className="sign-up-text">Sign up!</div>
							</div>
						</button>
					</form>

					<img
						className="password-logo"
						alt="Password logo"
						src="https://c.animaapp.com/K5qztAXN/img/password-logo.svg"
					/>
					<img
						className="email-logo"
						alt="Email logo"
						src="https://c.animaapp.com/K5qztAXN/img/email-logo.svg"
					/>
					<img
						className="last-name-logo"
						alt="Last name logo"
						src="https://c.animaapp.com/K5qztAXN/img/last-name-logo.svg"
					/>
					<img
						className="first-name-logo"
						alt="First name logo"
						src="https://c.animaapp.com/K5qztAXN/img/first-name-logo.svg"
					/>
				</div>

				<button type="button" className="login-button" onClick={goToLogin}>
					Login
				</button>

				<button
					type="button"
					className="contact-us-button"
					onClick={() => alert("You will be taken to our contact page")}
				>
					Contact Us
				</button>

				<button type="button" className="home-button" onClick={goToLanding}>
					Home
				</button>

				<button type="button" className="pdfpal-button" onClick={goToLanding}>
					PDFPAL
				</button>
			</div>
		</div>
	);
};

export default Signup;

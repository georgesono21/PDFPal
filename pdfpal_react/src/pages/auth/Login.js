//https://www.freecodecamp.org/news/use-firebase-authentication-in-a-react-app/

import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import { NavLink, useNavigate } from "react-router-dom";

import "./Login.css";
// completed
const Login = () => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const onLogin = (e) => {
		e.preventDefault();
		signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				navigate("/home");
				console.log(user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
				alert("Invalid user/password. Please log in again.");
			});
	};

	function goToLanding() {
		navigate("/");
	}

	function goToSignup() {
		navigate("/signup");
	}

	// return (
	// 	<>
	// 		<main>
	// 			<section>
	// 				<div>
	// 					<h1> PDF Pal</h1>

	// 					<form>
	// 						<div>
	// 							<label htmlFor="email-address">Email address</label>
	// 							<input
	// 								id="email-address"
	// 								name="email"
	// 								type="email"
	// 								required
	// 								placeholder="Email address"
	// 								onChange={(e) => setEmail(e.target.value)}
	// 							/>
	// 						</div>

	// 						<div>
	// 							<label htmlFor="password">Password</label>
	// 							<input
	// 								id="password"
	// 								name="password"
	// 								type="password"
	// 								required
	// 								placeholder="Password"
	// 								onChange={(e) => setPassword(e.target.value)}
	// 							/>
	// 						</div>

	// 						<div>
	// 							<button onClick={onLogin}>Login</button>
	// 						</div>
	// 					</form>

	// 					<p className="text-sm text-white text-center">
	// 						No account yet? <NavLink to="/signup">Sign up</NavLink>
	// 					</p>
	// 				</div>
	// 			</section>
	// 		</main>
	// 	</>
	// );

	return (
		<div className="login">
			<div className="div">
				<div className="overlap-group">
					<div className="rectangle" />
					<div className="rectangle-2" />
					<div className="text-wrapper">Login</div>
					<div className="rectangle-3" />
					<div className="rectangle-4" />
					<div className="rectangle-5" />
					<div className="rectangle-6" />
					{/* <div className="text-wrapper-2">Username</div>
          <div className="text-wrapper-3">Password</div> */}
					<img
						className="key-solid"
						alt="Key solid"
						src="https://c.animaapp.com/xTUHHceI/img/key-solid-1.svg"
					/>
					<img
						className="user-solid"
						alt="User solid"
						src="https://c.animaapp.com/xTUHHceI/img/user-solid-1.svg"
					/>
					{/* <div className="rectangle-7" /> */}
					{/* <div className="rectangle-8" /> */}
					{/* <div className="text-wrapper-4">Login</div> */}
					{/* <div className="text-wrapper-5">Create New Account</div> */}
					<form>
						<div className="username-input">
							{/* <label htmlFor="first-name">First Name</label> */}
							<input
								type="text"
								label="First Name"
								class="form-input"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								placeholder="Username"
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

						{/* fix this to right function onLOGIN */}
						<button type="submit" onClick={onLogin}>
							<div className="login-button">
								<div className="login-text">Login!</div>
							</div>
						</button>
					</form>
				</div>
				<button type="button" className="register-button" onClick={goToSignup}>
					Register
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

				{/* <div className="text-wrapper-6">PDFPAL</div> */}
				{/* <div className="text-wrapper-7">Home</div> */}
				{/* <div className="text-wrapper-8">Register</div> */}
				{/* <div className="text-wrapper-9">Contact Us</div> */}
			</div>
		</div>
	);
};

export default Login;

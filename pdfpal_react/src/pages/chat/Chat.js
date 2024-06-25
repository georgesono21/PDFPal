import React, { Component, useEffect } from "react";
import axios from "axios";
import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import Navbar from "../home/Navbar";

import "./Chat.css";

class Chatbot extends Component {
	constructor() {
		super();
		this.state = {
			messages: [],
			inputText: "",
		};
		this.chatWindowRef = React.createRef();
	}

	handleInputChange = (e) => {
		this.setState({ inputText: e.target.value });
	};

	handleSendMessage = async () => {
		const { inputText, messages } = this.state;

		// Add user message to the state

		const newUserMessage = { text: inputText, user: true };
		this.setState(
			{
				messages: [...messages, newUserMessage],
				inputText: "",
			},
			async () => {
				try {
					// Make a GET request to your Flask server with the user's question as a query parameter
					const response = await axios.get("http://127.0.0.1:5000", {
						params: {
							question: inputText,
						},
					});

					const { question, response: answer } = response.data;

					// Add the bot's response to the state
					const newBotMessage = { text: answer, user: false };
					this.setState(
						(prevState) => ({
							messages: [...prevState.messages, newBotMessage],
						}),
						() => {
							// Scroll down to the new message
							const chatWindow = this.chatWindowRef.current;
							chatWindow.scrollTop = chatWindow.scrollHeight;
						}
					);
				} catch (error) {
					console.error("Failed to get response from the server", error);
				}
			}
		);
	};

	renderMessages() {
		const { messages } = this.state;

		return messages.map((message, index) => (
			<div
				key={index}
				className={message.user ? "user-message" : "bot-message"}
			>
				{message.text}
			</div>
		));
	}

	render() {
		return (
			<div className="chat">
				<div className="chatbot">
					<h1>Chat</h1> {/* Add the heading here */}
					<div className="chat-window" ref={this.chatWindowRef}>
						{this.renderMessages()}
					</div>
					<div className="input-container">
						<input
							type="text"
							placeholder="Ask a question..."
							value={this.state.inputText}
							onChange={this.handleInputChange}
						/>
						<button onClick={this.handleSendMessage}>Send</button>
					</div>
				</div>
			</div>
		);
	}
}

const ChatbotwithAuthCheck = () => {
	const user = auth.currentUser; // Check if a user is currently authenticated
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) {
			// If the user is not authenticated, navigate to the landing page
			navigate("/");
		}
	}, [user, navigate]);

	return user ? <Chatbot /> : null;
};

export default ChatbotwithAuthCheck;

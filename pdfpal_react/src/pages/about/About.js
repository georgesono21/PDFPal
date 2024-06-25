// About.js

import React from "react";
import Navbar from "../home/Navbar";
import "./About.css";

const About = () => {
	return (
		<div className="about-page">
			<Navbar />
			<div className="about-container">
				<div className="team-members-section">
					<h2>Team Members</h2>
					<ul className="team-members-list">
						<li className="member-item">
							<span className="member-name">Aaran Guha</span> (3rd year)
						</li>
						<li className="member-item">
							<span className="member-name">Aaditya Jadhav</span> (3rd year)
						</li>
						<li className="member-item">
							<span className="member-name">George Sono</span> (3rd year)
						</li>
						<li className="member-item">
							<span className="member-name">Harshil Gupta</span> (3rd year)
						</li>
						<li className="member-item">
							<span className="member-name">Sid Dusi</span> (4th year)
						</li>
						{/* ... other team members ... */}
					</ul>
				</div>

				<div className="supervising-ta-section">
					<h2>Supervising TA</h2>
					<ul className="supervising-ta-list">
						<li className="ta-item">
							<span className="ta-name">Roy Shadmon</span>
						</li>
					</ul>
				</div>
			</div>
		</div>
	);
};

export default About;

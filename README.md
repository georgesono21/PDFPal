# PDFPal

PDFPal is a React application designed for a user to interact with a PDF through a Chatbot. It leverages various LLM libraries and AI tools to provide a seamless experience for handling text-specific questions in dense PDF documents. This was made as a software engineering project for CSE115A at UCSC in the Fall 2023.

## Table of Contents

- [Dependencies](#dependencies)
- [Development Setup](#setup)
- [Testing](#testing)
- [Contributors](#contributors)
- [Credits](#credits)

## Dependencies

PDFPal relies on the following dependencies:

- **@testing-library/jest-dom**: Provides custom Jest matchers for more readable tests.
- **@testing-library/react**: A library for testing React components.
- **@testing-library/user-event**: A companion library for testing user interactions with React components.
- **axios**: A promise-based HTTP client for making requests.
- **firebase**: A comprehensive platform for building web and mobile applications.
- **react**: A JavaScript library for building user interfaces.
- **react-dom**: React package for working with the DOM.
- **react-pdf**: A React component for displaying PDFs.
- **react-scripts**: Scripts and configuration for Create React App.
- **uuid**: A library for generating unique identifiers.
- **web-vitals**: Library for measuring web vital metrics.
- **@babel/plugin-proposal-private-property-in-object**: A Babel plugin for handling private properties in objects.
- **react-router-dom**: A library for declarative routing in React applications.

Make sure to run `npm install` or `yarn install` to install these dependencies before starting the project.

## Setup

1. Clone the repository: `git clone https://github.com/georgesono21/pdfpal.git` (SSH users: `git@github.com:georgesono21/pdfpal.git`)
2. Navigate to the project directory: `cd pdfpal`
3. Install dependencies: `npm install` or `yarn install`
4. Start the development server: `npm start` or `yarn start`

Note: The accompanying `flask-server` must also be ran (see README in /pdfpal_flask for more info) at the same time to access Chatbot and Chatbot features. Only PDF uploading and retrieving is possible w/o the server.

## Testing

Run test suites with the Jest Framework using the command:

```bash
npm test
```

There are test suites for Landing, Home and About pages.

## Contributors:

- [Aaran Guha](https://www.linkedin.com/in/aaran-guha/) (3rd year)
- [Aaditya Jadhav](https://www.linkedin.com/in/aaditya-jadhav/) (3rd year)
- [George Sono](https://www.linkedin.com/in/yoshinobu-sono/) (3rd year)
- [Harshil Gupta](https://www.linkedin.com/in/harshil-gupta-634253224/) (3rd year)
- [Sid Dusi](https://www.linkedin.com/in/siddusi/) (4th year)
- Roy Shadmon (supervising TA)

## Credits:

- [Firebase Authentication in a React App](https://www.freecodecamp.org/news/use-firebase-authentication-in-a-react-app/)
- [Firebase Documentation](https://firebase.google.com/docs)
- [OpenAI Platform Documentation](https://platform.openai.com/docs/introduction)
- [ChatGPT](https://chat.openai.com)
- [Stack Overflow](https://stackoverflow.com)

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from transformers import GPT2TokenizerFast
from langchain.document_loaders import PyPDFLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain.embeddings import OpenAIEmbeddings
from langchain.vectorstores import FAISS
from langchain.chains.question_answering import load_qa_chain
from langchain.llms import OpenAI
from langchain.chains import ConversationalRetrievalChain
import requests
from io import BytesIO
import tempfile
import PyPDF2
import textract


app = Flask(__name__)
CORS(app)

os.environ["TOKENIZERS_PARALLELISM"] = "false"
os.environ["OPENAI_API_KEY"] = ""

pdfURL = None
chatHistory = []

qa = None
db = None


def extract_text_from_pdf_url(pdf_url):
    # Download the PDF file
    response = requests.get(pdf_url)

    if response.status_code == 200:
        # Create a PDF file object
        pdf_file = BytesIO(response.content)

        # Create a PDF reader object
        pdf_reader = PyPDF2.PdfReader(pdf_file)

        # Initialize an empty string to store the extracted text
        text = ""

        # Iterate through all pages and extract text
        for page_num in range(len(pdf_reader.pages)):
            page = pdf_reader.pages[page_num]
            text += page.extract_text()

        return text
    else:
        print(f"Failed to download the PDF. Status code: {response.status_code}")
        return None


def reintialize(pdfurl):
    global pdfURL, qa, db

    prevPdfURL = pdfURL
    pdfURL = pdfurl  # Corrected assignment

    # print(f"reinitialized to {pdfURL} from {prevPdfURL}")

    text = extract_text_from_pdf_url(pdfURL)

    # print(text)

    tokenizer = GPT2TokenizerFast.from_pretrained("gpt2")

    def count_tokens(text: str) -> int:
        return len(tokenizer.encode(text))

    text_splitter = RecursiveCharacterTextSplitter(
        chunk_size=512,
        chunk_overlap=24,
        length_function=count_tokens,
    )
    chunks = text_splitter.create_documents([text])

    embeddings = OpenAIEmbeddings()
    db = FAISS.from_documents(chunks, embeddings)
    chain = load_qa_chain(OpenAI(temperature=0), chain_type="stuff")
    qa = ConversationalRetrievalChain.from_llm(
        OpenAI(temperature=0.1), db.as_retriever()
    )

    print(f"reinitialized to {pdfURL} from {prevPdfURL}")


def getResponse(user_input):
    global chatHistory, qa
    result = qa({"question": user_input, "chat_history": chatHistory})
    chatHistory.append((user_input, result["answer"]))

    return result["answer"]



@app.route("/", methods=["GET"])
def get_response_request():
    question = request.args.get("question", None)

    response = "Please ask a question..."
    if question:
        response = getResponse(question)

    response_data = {"question": question, "response": response}
    response = jsonify(response_data)
    # response.headers.add("Access-Control-Allow-Origin", "*")

    return response, 200


@app.route("/", methods=["POST"])
def updatePDF():
    if request.is_json:
        data = request.get_json()
        requestPdfURL = data.get("pdfURL", None)

        reintialize(pdfurl=requestPdfURL)

        return jsonify({"response": "successc"}), 200
    else:
        return jsonify({"error": "Invalid JSON data"}), 400


if __name__ == "__main__":
    app.run()

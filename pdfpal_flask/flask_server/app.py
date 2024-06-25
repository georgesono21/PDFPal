from flask import Flask, request, jsonify
from time import sleep
from flask_cors import CORS


# ai imports
from PyPDF2 import PdfReader
from langchain.vectorstores import ElasticVectorSearch, Pinecone, Weaviate, FAISS
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.text_splitter import (
    CharacterTextSplitter,
    RecursiveCharacterTextSplitter,
)
import os
from langchain.chains.question_answering import load_qa_chain
from langchain.llms import OpenAI

app = Flask(__name__)
CORS(app)

pdfURL = None

""" https://github.com/bhaskatripathi/pdfGPT/blob/main/api.py


    prompt += (
        "Instructions: Compose a comprehensive reply to the query using the search results given. "
        "Cite each reference using [ Page Number] notation (every result has this number at the beginning). "
        "Citation should be done at the end of each sentence. If the search results mention multiple subjects "
        "with the same name, create separate answers for each. Only include information found in the results and "
        "don't add any additional information. Make sure the answer is correct and don't output false content. "
        "If the text does not relate to the query, simply state 'Text Not Found in PDF'. Ignore outlier "
        "search results which has nothing to do with the question. Only answer what is asked. The "
        "answer should be short and concise. Answer step-by-step. \n\nQuery: {question}\nAnswer: "
    )

"""


def reintialize(pdfurl):
    global pdfURL

    prevPdfURL = pdfURL
    pdfURL = pdfurl  # Corrected assignment

    print(f"reinitialized to {pdfURL} from {prevPdfURL}")


def getResponse(q):
    return f"the answer to {q} is: ur mom"


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

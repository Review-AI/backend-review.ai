from flask import Blueprint, request, jsonify
from .manager import get_product_description, get_chat_answer
llm_openai = Blueprint("llm_openai", __name__)

@llm_openai.route("/get_product_description", methods=["POST"])
def product_description():
    payload = request.get_json()
    print(payload)
    result = get_product_description(payload['clientID'], payload['reviews'])
    return jsonify({"status": "success", "data": result})


@llm_openai.route("/get_chat_answer", methods=["POST"])
def chat_answer():
    payload = request.get_json()
    print(payload)
    result = get_product_description(payload['clientID'], payload['question'])
    return jsonify({"status": "success", "data": result})
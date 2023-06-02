from flask import Flask
from flask_cors import CORS   
from api.llm_openai import llm_openai

app = Flask(__name__)
CORS(app)

app.register_blueprint(llm_openai, url_prefix="/predict")

@app.route('/')
def index():
    return 'Web App with Python Flask!'

# if __name__ == "__main__":
#     app.run(debug=True)
#     app.run(host='127.0.0.1', port=5001)


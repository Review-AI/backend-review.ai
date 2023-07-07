from flask import Flask, request, render_template
from flask_cors import CORS   
from api.llm_openai import llm_openai

app = Flask(__name__)
CORS(app)

app.register_blueprint(llm_openai, url_prefix="/predict")

@app.route('/')
def index():
    return 'Web App with Python Flask!'

@app.route('/privacy')
def privacy():
    return render_template('privacy.html')

@app.after_request
def add_cors(resp):
    """
        Ensures all responses have the CORS headers. This ensures any failures are also accessible
    """
    resp.headers['Access-Control-Allow-Origin'] = request.headers.get('Origin', '*')
    resp.headers['Access-Control-Allow-Credentials'] = 'true'
    resp.headers['Access-Control-Allow-Methods'] = 'POST, OPTIONS, GET, PUT, DELETE'
    resp.headers['Access-Control-Allow-Headers'] = request.headers.get('Access-Control-Request-Headers', 'Authorization')
    if app.debug:
        resp.headers['Access-Control-Max-Age'] = '1'
    return resp

if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5001)


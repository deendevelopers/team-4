To setup the repo create a virtual environment and install the libraries:

`pip install -r requirements.txt`

### Serve production build

Install dependencies and generate production build:

`cd frontend && npm install && npm run build`

serve using Flask:

`cd .. && python3 serve.py`

Application runs on `localhost:5000`

### Development:
Run separate terminals:

frontend:

`cd frontend && npm start`

runs on `localhost:3000`

server:

`python3 serve.py`

runs on `localhost:5000`

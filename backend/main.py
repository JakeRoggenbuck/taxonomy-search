from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
)

@app.get("/")
def read_root(request: Request):
    params = request.query_params
    words = ["hello", "world", "how", "are", "you"]
    return [x for x in words if params["q"] in x]

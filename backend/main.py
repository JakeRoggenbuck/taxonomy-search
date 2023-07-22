from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
import sqlite3

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['*'],
)


@app.get("/")
def read_root(request: Request):
    con = sqlite3.connect("ITIS.sqlite")
    cur = con.cursor()
    params = request.query_params

    res = cur.execute(
        "SELECT * FROM longnames WHERE completename LIKE ? LIMIT 20",
        ("%" + params["q"] + "%",),
    )

    return [x[1] for x in res]

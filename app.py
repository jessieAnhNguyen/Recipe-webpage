from flask import Flask, render_template, request
from flask_bootstrap import Bootstrap

app = Flask(__name__)
Bootstrap(app)


@app.route("/")
def home():
    addIngredient = request.args.get("ingredient")
    return render_template("index.html", newIngredient=addIngredient)

from flask import Flask, render_template
import psutil

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/system")
def system_info():
    cpu = psutil.cpu_percent(interval=1)
    ram = psutil.virtual_memory().percent

    return{
        "cpu": cpu,
        "ram": ram
    }

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000)

from flask import Flask, render_template
import psutil
import platform
from monitor import get_mac_temperatures

app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api/system")
def system_info():
    cpu = psutil.cpu_percent(interval=1)
    ram = psutil.virtual_memory().percent
    os_name = platform.system()

    if os_name == "Darwin":
        os_name = "macOS"
    elif os_name == "Windows":
        os_name = "Windows"
    data = {
        "cpu": cpu,
        "ram": ram,
        "cpu_temp": None,
        "gpu_temp": None,
        "architecture": platform.machine(),
        "os": os_name
    }

    if platform.system() == "Darwin":
        temperatures = get_mac_temperatures()
        data["cpu_temp"] = temperatures["cpu_temp"]
        data["gpu_temp"] = temperatures["gpu_temp"]
    return data

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=8000)
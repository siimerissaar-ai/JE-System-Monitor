import psutil
import json
import subprocess

if __name__ == '__main__':
    cpu_usage = psutil.cpu_percent(interval=1)
    ram_usage = psutil.virtual_memory().percent

    print(f"CPU Usage: {cpu_usage}%")
    print(f"RAM Usage: {ram_usage}%")

def get_mac_temperatures():
    result = subprocess.run(
        ["macmon", "pipe", "-s", "1"],
        capture_output=True,
        text=True,
        check=True
    )

    data = json.loads(result.stdout)

    cpu_temp = data["temp"]["cpu_temp_avg"]
    gpu_temp = data["temp"]["gpu_temp_avg"]

    return {
        "cpu_temp": cpu_temp,
        "gpu_temp": gpu_temp
    }
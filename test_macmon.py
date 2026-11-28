import subprocess
import json

result = subprocess.run(
    ["macmon", "pipe", "-s", "1"],
    capture_output=True,
    text=True,
    check=True
)

data = json.loads(result.stdout)

cpu_temp = data["temp"]["cpu_temp_avg"]
gpu_temp = data["temp"]["gpu_temp_avg"]

print(f"CPU Temperature: {cpu_temp:.1f}°C")
print(f"GPU Temperature: {gpu_temp:.1f}°C")
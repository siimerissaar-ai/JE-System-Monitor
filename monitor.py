import psutil

cpu_usage = psutil.cpu_percent(interval=1)
ram_usage = psutil.virtual_memory().percent

print(f"CPU Usage: {cpu_usage}%")
print(f"RAM Usage: {ram_usage}%")
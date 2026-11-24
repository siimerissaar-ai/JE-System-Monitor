
function updateCpuTemperature(temperature) {
    document.getElementById("cpu-temp").textContent = `${temperature}°C`;
}

let cpuTemperature = 68;

updateCpuTemperature(cpuTemperature);
function updateSystemData() {
    fetch("/api/system")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        }
        .then(data => {
            document.getElementById("ram-usage").textContent = `${data.ram}%`;
            document.getElementById("cpu-usage").textContent = `CPU usage: ${data.cpu}%`;
            document.getElementById("connection-status").textContent = "Connected";
            document.getElementById("connection-status").classList.remove("disconnected");
            document.getElementById("connection-status").classList.add("connected");
        })
        .catch(error => {
            console.error("Connecting to the server failed:", error);

            document.getElementById("connection-status").textContent = "Disconnected";
            document.getElementById("connection-status").classList.remove("connected");
            document.getElementById("connection-status").classList.add("disconnected");

            document.getElementById("cpu-usage").textContent = "Cpu Usage: N/A";
            document.getElementById("ram-usage").textContent = "N/A";
        });
}

updateSystemData();

setInterval(updateSystemData, 2000);
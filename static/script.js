
function updateCpuTemperature(temperature) {
    document.getElementById("cpu-temp").textContent = `${temperature}°C`;
}

let cpuTemperature = 68;

updateCpuTemperature(cpuTemperature);
function updateSystemData() {
    fetch("/api/system")
        .then(response => response.json())
        .then(data => {
            document.getElementById("ram-usage").textContent = `${data.ram}%`;
            document.getElementById("cpu-usage").textContent = `CPU usage: ${data.cpu}%`;
        })
        .catch(error => {
            console.error("Connecting to the server failed:", error);
        });
}

updateSystemData();

setInterval(updateSystemData, 2000);
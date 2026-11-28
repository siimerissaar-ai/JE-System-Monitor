
function updateCpuTemperature(temperature) {
    document.getElementById("cpu-temp").textContent = `${temperature}°C`;
}

let gpuMissingCount = 0;

function updateSystemData() {
    fetch("/api/system")
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            document.getElementById("system-architecture").textContent = data.architecture;
            document.getElementById("system-os").textContent = data.os;
            
            document.getElementById("ram-usage").textContent = `${data.ram}%`;
            document.getElementById("cpu-usage").textContent = `CPU usage: ${data.cpu}%`;
            document.getElementById("connection-status").textContent = "Connected";
            document.getElementById("connection-status").classList.remove("disconnected");
            document.getElementById("connection-status").classList.add("connected");

            if (data.cpu_temp !== null){
                updateCpuTemperature(data.cpu_temp.toFixed(1));
            } else {
                document.getElementById("cpu-temp").textContent = "N/A";
            }

            if (data.gpu_temp !== null) {
                gpuMissingCount = 0;
                document.getElementById("gpu-temp").textContent = `${data.gpu_temp.toFixed(1)}°C`;
            } else {
                gpuMissingCount++;

                if (gpuMissingCount >= 3) {
                    document.getElementById("gpu-temp").textContent = "N/A";
                }
            }
        })
        .catch(error => {
            console.error("Connecting to the server failed:", error);

            document.getElementById("connection-status").textContent = "Disconnected";
            document.getElementById("connection-status").classList.remove("connected");
            document.getElementById("connection-status").classList.add("disconnected");

            document.getElementById("cpu-usage").textContent = "Cpu Usage: N/A";
            document.getElementById("ram-usage").textContent = "N/A";
            document.getElementById("cpu-temp").textContent = "N/A";
            document.getElementById("gpu-temp").textContent = "N/A";
        });
}

updateSystemData();

setInterval(updateSystemData, 2000);
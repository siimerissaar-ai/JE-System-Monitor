
function updateCpuTemperature(temperature) {
    document.getElementById("cpu-temp").textContent = `${temperature}°C`;
}

let cpuTemperature = 68;

updateCpuTemperature(cpuTemperature);

fetch("/api/system")
    .then(response => response.json())
    .then(data => {
        document.getElementById("ram-usage").textContent = `${data.ram}%`;
    });
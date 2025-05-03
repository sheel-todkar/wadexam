
        // Local repository map of city weather data
        const cityWeatherData = {
            "New York": { temperature: "15°C", humidity: "60%", conditions: "Cloudy" },
            "London": { temperature: "10°C", humidity: "70%", conditions: "Rainy" },
            "Tokyo": { temperature: "20°C", humidity: "50%", conditions: "Sunny" },
            "Paris": { temperature: "18°C", humidity: "55%", conditions: "Partly Cloudy" },
            "Mumbai": { temperature: "30°C", humidity: "80%", conditions: "Humid" },
            "Pune": { temperature: "28°C", humidity: "65%", conditions: "Sunny" }
        };

        // Simulate AJAX fetch from local repository
        function fetchWeather(city) {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (cityWeatherData[city]) {
                        resolve(cityWeatherData[city]);
                    } else {
                        reject("City not found in the repository.");
                    }
                }, 500); // simulate network delay
            });
        }

        document.getElementById("weatherForm").addEventListener("submit", function(event) {
            event.preventDefault();
            const city = document.getElementById("cityInput").value.trim();
            const resultDiv = document.getElementById("weatherResult");
            resultDiv.innerHTML = "Loading...";

            fetchWeather(city)
                .then(data => {
                    resultDiv.innerHTML = `
                        <h3>Weather in ${city}</h3>
                        <p><strong>Temperature:</strong> ${data.temperature}</p>
                        <p><strong>Humidity:</strong> ${data.humidity}</p>
                        <p><strong>Conditions:</strong> ${data.conditions}</p>
                    `;
                })
                .catch(error => {
                    resultDiv.innerHTML = `<p class="error">${error}</p>`;
                });
        })
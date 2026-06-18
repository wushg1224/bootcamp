// API_KEY 在 config.js 里定义
const API_URL = "https://api.openweathermap.org/data/2.5/weather";

// 获取 DOM 元素
const form = document.getElementById("weather-form");
const cityInput = document.getElementById("city-input");
const errorMsg = document.getElementById("error-msg");
const weatherCard = document.getElementById("weather-card");

// 天气数据元素
const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");

// 监听表单提交
form.addEventListener("submit", function (e) {
    // TODO 1: 阻止表单默认提交行为
    // 提示: e.preventDefault()
    e.preventDefault();


    const city = cityInput.value.trim();
    if (!city) return;

    fetchWeather(city);
});

async function fetchWeather(city) {
    weatherCard.classList.add("hidden");
    errorMsg.classList.add("hidden");

    try {
        // TODO 2: 用 fetch 请求天气 API
        // 提示: const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=zh_cn`);
        const response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric&lang=zh_cn`);

        // TODO 3: 检查响应状态，如果不 ok 就抛出错误
        // 提示: if (!response.ok) throw new Error("城市未找到");
        if (!response.ok) throw new Error("城市未找到");

        // TODO 4: 把响应解析为 JSON
        // 提示: const data = await response.json();
        const data = await response.json();
        console.log(data);

        // TODO 5: 调用 displayWeather(data) 展示数据
        // displayWeather(data);
        displayWeather(data);

    } catch (error) {
        // TODO 6: 显示错误信息
        // 提示: errorMsg.textContent = error.message;
        //       errorMsg.classList.remove("hidden");
        errorMsg.textContent = error.message;
        errorMsg.classList.remove("hidden");
    }
}

function displayWeather(data) {
    // TODO 7: 从 data 中提取数据并填充到页面
    // data 的结构大致是:
    // {
    //   name: "London",
    //   main: { temp: 15.2, humidity: 72 },
    //   weather: [{ description: "多云", icon: "04d" }],
    //   wind: { speed: 3.5 }
    // }
    //
    // 提示:
    // cityName.textContent = data.name;
    // temperature.textContent = `${Math.round(data.main.temp)}°C`;
    // description.textContent = data.weather[0].description;
    // humidity.textContent = `${data.main.humidity}%`;
    // wind.textContent = `${data.wind.speed} m/s`;
    // weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    //
    // weatherCard.classList.remove("hidden");
    cityName.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    description.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity}%`;
    wind.textContent = `${data.wind.speed} m/s`;
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    weatherCard.classList.remove("hidden");
}

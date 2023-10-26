const scrapeData = require('./scraper');

// Получите данные, вызвав функцию scrapeData
scrapeData().then(items => {
  const dataContainer = document.getElementById("data-container");

  // Переберите массив данных и создайте элементы для вывода каждой записи
  items.forEach(item => {
    const titleElement = document.createElement("h2");
    titleElement.textContent = item.title;

    linkElement.textContent = "Ссылка";

    // Добавьте созданные элементы в контейнер данных
    dataContainer.appendChild(titleElement);
  });
});
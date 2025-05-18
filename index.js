const endpoints = [
    { name: 'Users', url: 'https://jsonplaceholder.typicode.com/users' },
    { name: 'Posts', url: 'https://jsonplaceholder.typicode.com/posts' },
    { name: 'Comments', url: 'https://jsonplaceholder.typicode.com/comments' },
];

const fetchJson = (url) => fetch(url).then((response) => response.json());

function renderSection(title, items) {
    const container = document.getElementById('data-list');
    const section = document.createElement('section');
    const heading = document.createElement('h2');
    heading.textContent = title;
    section.appendChild(heading);
    const list = document.createElement('ul');
    items.slice(0, 5).forEach((item) => {
        const listItem = document.createElement('li');
        listItem.textContent = JSON.stringify(item);
        list.appendChild(listItem);
    });
    section.appendChild(list);
    container.appendChild(section);
}

async function fetchData() {
    const container = document.getElementById('data-list');
    try {
        const promises = endpoints.map((endpoint) => fetchJson(endpoint.url));
        const results = await Promise.all(promises);
        endpoints.forEach((endpoint, index) => renderSection(endpoint.name, results[index]));
    } catch (error) {
        container.textContent = 'Error fetching data';
    }
}

document.addEventListener('DOMContentLoaded', () => fetchData());

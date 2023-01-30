import { API_KEY, endpoint, country, language } from '../config';

export async function Services(category = 'general') {
    let articles = await fetch(`${endpoint}?country=${country}&category=${category}&language=${language}`, {
        headers: {
            'X-API-KEY': API_KEY
        }
    });

    let result = await articles.json();
    articles = null;

    return result.articles;
}
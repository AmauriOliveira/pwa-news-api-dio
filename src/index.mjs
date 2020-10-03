import express from 'express';
import cors from 'cors';

import economy from './economy.json';
import technology from './technology.json';
import world from './world.json';

const GROUP_NEWS = {
    economy,
    technology,
    world,
};

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());


app.get('/api', (request, response) => {
    return response.json({
        economy,
        technology,
        world,
    });
});

app.get('/api/:subject', (request, response) => {
    const { subject } = request.params;

    return response.json(GROUP_NEWS[subject]);
});

app.get('/api/:subject/:id', (request, response) => {
    const { subject, id } = request.params;

    const allNews = GROUP_NEWS[subject];
    const news = allNews.value.find(news => news.id === id);

    return response.json(news)
});

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
});
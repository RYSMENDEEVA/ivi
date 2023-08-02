import axios from "axios";

export const instance = axios.create({
    baseURL: 'https://api.kinopoisk.dev/v1',
    headers: {"X-API-KEY": "18CG96Z-99H4SZE-QF1VY0N-E6FZ33X"}
})
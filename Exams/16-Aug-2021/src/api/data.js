import * as api from './api.js';

export const login = api.login;
export const register = api.register;
export const logout = api.logout;

export async function getAllGames() {
    return api.get('/data/games?sortBy=_createdOn%20desc');
}

export async function createGame(album) {
    return api.post('/data/games', album);
}


export async function getGameById(id) {
    return api.get('/data/games/' + id);
}

export async function deleteGameById(id) {
    return api.del('/data/games/' + id);
}

export async function editGames(id, album) {
    return api.put('/data/games/' + id, album);
}

import {ServerInfo} from "./ServerInfo";

const BASE_URL = "https://api.minetools.eu/ping/";
const headers = { 'Content-Type': 'application/json' }

export async function pingServer(ip: string): Promise<ServerInfo[]> {
    try {
        // Формируем URL с параметром count
        const url = `${BASE_URL}${ip}`;

        // Выполняем запрос
        const response = await fetch(url, { headers });

        // Проверяем успешность ответа
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Возвращаем данные из ответа

        return await response.json();
    } catch (error) {
        console.error('Error fetching top by online:', error);
        throw error; // Пробрасываем ошибку выше по цепочке
    }
}

export async function pingServerWithPort(ip: string, port: number): Promise<ServerInfo[]> {
    try {
        // Формируем URL с параметром count
        const url = `${BASE_URL}${ip}/${port}`;

        // Выполняем запрос
        const response = await fetch(url, { headers });

        // Проверяем успешность ответа
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        // Возвращаем данные из ответа

        return await response.json();
    } catch (error) {
        console.error('Error fetching top by online:', error);
        throw error; // Пробрасываем ошибку выше по цепочке
    }
}
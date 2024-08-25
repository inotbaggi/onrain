import {ServerInfo} from "./ServerInfo";
import {OnlineRecord} from "./OnlineRecord";

const BASE_URL = "https://onrain-s.qubixmc.net/api/v1";
const headers = { 'Content-Type': 'application/json' }

export async function getTopByOnline(count: number): Promise<ServerInfo[]> {
    try {
        // Формируем URL с параметром count
        const url = `${BASE_URL}/top/online?count=${count}`;

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

export async function getServerInfo(id: number): Promise<ServerInfo> {
    try {
        // Формируем URL с параметром count
        const url = `${BASE_URL}/server/${id}`;

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

export async function getServerInfoByIp(id: string): Promise<string> {
    try {
        // Формируем URL с параметром count
        const url = `${BASE_URL}/server/ip/${id}`;
        console.log(url)
        // Выполняем запрос
        const response = await fetch(url, { headers });

        // Проверяем успешность ответа
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        // Возвращаем данные из ответа
        return await response.text();
    } catch (error) {
        console.error('Error fetching top by online:', error);
        throw error; // Пробрасываем ошибку выше по цепочке
    }
}

export async function getServerRecords(id: number, type: string): Promise<OnlineRecord[]> {
    try {
        // Формируем URL с параметром count
        const url = `${BASE_URL}/server/records/${id}/${type}`;

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
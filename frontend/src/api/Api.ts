import {ServerInfo} from "./ServerInfo";
import {OnlineRecord} from "./OnlineRecord";

const BASE_URL = "http://192.168.0.12:8080/api/v1";

export async function getTopByOnline(count: number): Promise<ServerInfo[]> {
    try {
        // Формируем URL с параметром count
        const url = `${BASE_URL}/top/online?count=${count}`;

        // Выполняем запрос
        const response = await fetch(url);

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
        const response = await fetch(url);

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

export async function getServerRecords(id: number, type: string): Promise<OnlineRecord[]> {
    try {
        // Формируем URL с параметром count
        const url = `${BASE_URL}/server/records/${id}/${type}`;

        // Выполняем запрос
        const response = await fetch(url);

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
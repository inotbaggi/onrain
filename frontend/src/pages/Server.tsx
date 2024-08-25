import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {Button, Card, message, Spin, Typography} from 'antd';
import {Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {ServerInfo} from "../api/ServerInfo";
import {getServerInfo, getServerRecords} from "../api/Api";
import {OnlineRecord} from "../api/OnlineRecord";
import {defaultIcon} from "../AppClass";

const timePeriods = [
    {
        named: "За час",
        type: "hour"
    },
    {
        named: "За день",
        type: "day"
    },
    {
        named: "За 3 дня",
        type: "three-day"
    },
    {
        named: "За неделю",
        type: "week"
    },
    {
        named: "За месяц",
        type: "month"
    }
    ,
    {
        named: "За год",
        type: "year"
    }
]

export default function Server() {
    const {id} = useParams();
    const [loading, setLoading] = useState<boolean>(true);
    const [chartLoading, setChartLoading] = useState<boolean>(true);

    const [period, setPeriod] = useState(timePeriods[0]);
    const [selectedPeriod, setSelectedPeriod] = useState<number>(0);

    const [data, setData] = useState<ServerInfo | null>(null);
    const [records, setRecords] = useState<OnlineRecord[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const serverInfo = await getServerInfo(Number(id));
                setData(serverInfo);
            } catch (error: any) {
                console.error('Failed to fetch server info:', error);
                message.error(`Ошибка получения данных (getServerInfo): ${error.status || error.message || "Unknown error"}`);
            } finally {
                setLoading(false);
            }
        };

        const fetchChartsData = async () => {
            try {
                setChartLoading(true);
                const serverRecords = await getServerRecords(Number(id), period.type);
                setRecords(serverRecords);
               // message.info(serverRecords.length)
            } catch (error: any) {
                console.error('Failed to fetch server records:', error);
                message.error(`Ошибка получения данных (getServerRecords): ${error.status || error.message || "Unknown error"}`);
            } finally {
                setChartLoading(false);
            }
        };

        fetchData();
        fetchChartsData();
    }, [id, period]);

    return (
        <div className="p-2 w-full container mx-auto">
            <div className="flex flex-col items-center justify-center">
                {loading ? (
                    <div className="flex justify-center">
                        <Spin size="large"/>
                    </div>
                ) : (
                    <div className="mb-4 w-screen sm:w-screen md:w-screen lg:w-1/2 items-center justify-center flex flex-col gap-y-2">
                        <Typography className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                            {data?.serverName}
                        </Typography>
                        {chartLoading ? (
                            <div className="flex justify-center">
                                <Spin size="large"/>
                            </div>
                        ) : (
                            <ResponsiveContainer height={300} width={'95%'}>
                                <AreaChart data={records} margin={{top: 20, right: 30, left: 20, bottom: 5}}>
                                    <CartesianGrid strokeDasharray="3 3"/>
                                    <XAxis tickFormatter={(date) => {
                                        return new Date(date).toLocaleDateString(
                                            "ru-RU",
                                            {
                                                day: 'numeric',
                                                month: 'numeric',
                                                year: "numeric",
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                hourCycle: 'h24',
                                                timeZone: "Europe/Moscow"
                                            }
                                        )
                                    }
                                    } dataKey="time"/>
                                    <YAxis/>
                                    <Tooltip/>
                                    <Area
                                        type="monotone"
                                        dataKey="onlineCount"
                                        stroke="#FFCC66"
                                        fill="#FFCC66"
                                        connectNulls={true} // Соединяет null значения
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        )}
                        <div className={"flex flex-row items-center justify-center flex-wrap gap-4"}>
                            {timePeriods.map((dataPeriod, index) => {
                                return <Button type={selectedPeriod == index ? "primary" : "default"} onClick={() => {
                                    setPeriod(dataPeriod)
                                    setSelectedPeriod(index)
                                }}>{dataPeriod.named}</Button>
                            })}
                        </div>
                        <Typography className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                            Статистика
                        </Typography>
                        <Card>
                            <div className="flex flex-row items-center justify-center gap-4">
                                <img src={`${data.imageHash == null ? defaultIcon : data.imageHash}`} alt="Logo" className="w-32 h-32 sm:w-16 sm:h-16"/>
                                <div className={"text-xl flex flex-col gap-2"}>
                                    <div>
                                        <div>Игроков играет: {data.online}</div>
                                        <div>Играло в пике: {data.peakOnline}</div>
                                    </div>
                                    <div>
                                        IP: {data.hideIp ? "Недоступен обычным пользователям" : data.ip}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
}
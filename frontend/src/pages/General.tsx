import {Input, message, Spin, Typography} from "antd";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import GeneralServer from "../components/GeneralServer";
import {getServerInfo, getServerInfoByIp, getTopByOnline} from "../api/Api";
import {useEffect, useState} from "react";
import {ServerInfo} from "../api/ServerInfo";
import {SearchProps} from "antd/es/input";

const {Search} = Input;
const onSearch: SearchProps['onSearch'] = async (value, _e, info) => {
    const serverInfo = await getServerInfoByIp(value)
    if (serverInfo == "-1") {
        window.location.href = `/ping/${value}`
    } else {
        window.location.href = `/server/${serverInfo}`
    }
}

export default function General() {
    const [loading, setLoading] = useState<boolean>(true);
    const [data, setData] = useState<ServerInfo[]>([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await getTopByOnline(10);
                setData(res);
            } catch (error) {
                console.error('Failed to fetch data:', error);
                message.error(`Ошибка получения данных: ${error.status}`);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [])

    return (
        <div className="p-4 w-full container mx-auto">
            <div className="flex flex-col items-center justify-center">
                <div className="mb-2">
                    <Typography className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold">
                        Мониторинг онлайна Minecraft серверов
                    </Typography>
                </div>
                <div className="">
                    <Typography className="text-lg sm:text-lg md:text-xl lg:text-1xl text-gray-400 text-center">
                        Самый простой способ посмотреть онлайн любого сервера, а также посмотреть лидеров!
                    </Typography>
                </div>
                <div className="mb-2">
                    <Typography className="text-lg sm:text-lg md:text-xl lg:text-1xl text-gray-400 text-center">
                        Напиши айпи ниже, чтобы посмотреть онлайн проекта!
                    </Typography>
                </div>
                <div className="mb-6">
                    <Search placeholder="play.qubixmc.net" onSearch={onSearch}/>
                </div>
            </div>

            <div className="flex flex-col items-center justify-center">
                <div className="mb-4">
                    <Typography className="text-xl sm:text-2xl md:text-3xl lg:text-4xl">
                        Лидеры серверов по онлайну
                    </Typography>
                </div>
                <div>
                    {loading ? (
                        <div className="flex justify-center">
                            <Spin size="large"/>
                        </div>
                    ) : (
                        <div className="">
                            {data.map((server) => (
                                <GeneralServer key={server.id} data={server}/>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

/*
<div>
    <GeneralServer
        id={"play.hypixel.net"}
        imageHash={HASH}
        online={0}
        peakOnline={122312}
        port={25565} serverName={"Hypixel Network"}/>
</div>*/

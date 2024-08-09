import {message, Spin, Typography} from "antd";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import GeneralServer from "../components/GeneralServer";
import {getTopByOnline} from "../api/Api";
import {useEffect, useState} from "react";
import {ServerInfo} from "../api/ServerInfo";

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
        <div className="p-2 w-full container mx-auto">
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

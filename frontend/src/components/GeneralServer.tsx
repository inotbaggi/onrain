import {ServerInfo} from "../api/ServerInfo";
import React from "react";
import {Button, Card} from "antd";
import CopyIp from "./CopyIp";
import {RightOutlined, SearchOutlined} from "@ant-design/icons";
import {defaultIcon} from "../AppClass";

interface GeneralServerProp {
    data: ServerInfo;
}

export default function GeneralServer(prop: GeneralServerProp) {
    return (
        <div className={"pb-4"}>
            <Card style={{ width: '100%', maxWidth: 650 }}>
                <div className="flex flex-col sm:flex-row sm:space-x-6 space-y-4 sm:space-y-0 items-center">
                    <img src={`${prop.data.imageHash == null ? defaultIcon : prop.data.imageHash}`} alt="Logo" className="w-16 h-16 sm:w-12 sm:h-12" />
                    <div className="flex-1 text-center sm:text-left">
                        <h2 className="text-xl sm:text-lg font-semibold">{prop.data.serverName}</h2>
                        <CopyIp text={prop.data.hideIp ? "Скрыто" : prop.data.ip} />
                    </div>
                    <div className="text-center sm:text-left">
                        <p className="text-lg font-semibold">Онлайн: {prop.data.online}</p>
                        <p className="text-lg font-semibold">Пиковый онлайн: {prop.data.peakOnline}</p>
                    </div>
                    <div>
                        <Button onClick={() => {
                            window.location.href = `/server/${prop.data.id}`
                        }} shape="circle" icon={<RightOutlined/>} />
                    </div>
                </div>
            </Card>
        </div>
    )
}

/*
<LineChart
    xAxis={[
        {
            id: 'Дата',
            data: dataChart.map((data) => {return data.time}),
            scaleType: 'time',
            valueFormatter: (date) => date.toLocaleDateString(),
        },
    ]}
    series={[
        {
            data: dataChart.map((data) => {return  data.value}),
            area: true,
        },
    ]}
    width={350}
    height={200}
/>

*/

import {ServerInfo} from "../api/ServerInfo";
import React from "react";
import {Card} from "antd";
import CopyIp from "./CopyIp";

export default function GeneralServer(data: ServerInfo) {
    return (
        <Card>
            <div className="flex flex-row space-x-12 content-center">
                <img src={`${data.imageHash}`} alt="Logo" className="w-12 h-12"/>
                <div>
                    <h2 className="text-lg font-semibold">{data.serverName}</h2>
                    <CopyIp text={data.id}/>
                </div>
                <div className="">
                    <p className="text-lg font-semibold">Онлайн: {data.peakOnline}</p>
                    <p className="text-lg font-semibold">Пиковый онлайн: 0</p>
                </div>
            </div>
        </Card>
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

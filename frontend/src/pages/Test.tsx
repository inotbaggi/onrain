import {Button, message} from "antd";
import {getServerInfoByIp} from "../api/Api";

export default function Test() {
    return (
        <div className="flex items-center justify-between">
            <Button onClick={async () => {
                const info = await getServerInfoByIp("play.hypixel.net")
                message.info(`${info}`);
            }}>getServerInfoByIp</Button>
        </div>
    )
}
export interface ServerInfo {
    id: string;
    ip: string;
    serverName: string;
    port: number;
    imageHash: string;
    online: number;
    peakOnline: number;
    hideIp: boolean;
}
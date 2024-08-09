import {App, Button, Dropdown, MenuProps, message, Space, Tooltip} from "antd";
import {
    AppstoreAddOutlined,
    DownOutlined,
    ExclamationCircleOutlined,
    StarOutlined,
    UserOutlined
} from '@ant-design/icons';
import React, {useState} from "react";
import {HookAPI} from "antd/es/modal/useModal";

let modalHook: HookAPI = null

function handleButtonClick(id: string) {
    switch (id) {
        case "1": {
            const modalInstance = modalHook.info({
                title: "Добавить сервер в мониторинг",
                content: (
                    <div className={"pb-4"}>
                        Чтобы добавить сервер в мониторинг обратись к владельцу проекта в Telegram
                    </div>
                ),
                okText: "Перейти в Telegram",
                footer: (_, {OkBtn}) => (
                    <>
                        <Button onClick={() => {
                            modalInstance.destroy()
                        }}>Закрыть</Button>
                        <OkBtn/>
                    </>
                ),
                onOk: () => {
                    window.location.href = "https://inotbaggi.t.me/"
                }
            })
            break
        }
        case "2": {
            window.location.href = "https://qubixmc.net"
            break
        }
        case "3": {
            const modalInstance = modalHook.warning({
                title: "Сообщить о проблеме",
                okText: "Перейти в Telegram",
                footer: (_, {OkBtn}) => (
                    <>
                        <Button onClick={() => {
                            modalInstance.destroy()
                        }}>Закрыть</Button>
                        <OkBtn/>
                    </>
                ),
                onOk: () => {
                    window.location.href = "https://inotbaggi.t.me/"
                }
            })
        }
    }
};

const handleMenuClick: MenuProps['onClick'] = (e) => {
    switch (e.key) {
        case "1": {
            const modalInstance = modalHook.info({
                title: "Добавить сервер в мониторинг",
                content: (
                    <div className={"pb-4"}>
                        Чтобы добавить сервер в мониторинг обратись к владельцу проекта в Telegram
                    </div>
                ),
                footer: (_, {OkBtn}) => (
                    <>
                        <Button onClick={() => {
                            modalInstance.destroy()
                        }}>Закрыть</Button>
                        <OkBtn/>
                    </>
                ),
                okText: "Перейти в Telegram",
                onOk: () => {
                    window.location.href = "https://inotbaggi.t.me/"
                }
            })
            break
        }
        case "3": {
            const modalInstance = modalHook.warning({
                title: "Сообщить о проблеме",
                footer: (_, {OkBtn}) => (
                    <>
                        <Button onClick={() => {
                            modalInstance.destroy()
                        }}>Закрыть</Button>
                        <OkBtn/>
                    </>
                ),
                okText: "Перейти в Telegram",
                onOk: () => {
                    window.location.href = "https://inotbaggi.t.me/"
                }
            })
            break
        }
        case "2": {
            window.location.href = "https://qubixmc.net"
        }
    }
};

const buttons = [
    {
        id: "1",
        named: "Запросить сервер",
        icon: <AppstoreAddOutlined/>,
        danger: false,
    },
    {
        named: 'QubixMC',
        id: '2',
        icon: <StarOutlined />,
        danger: false,
    },
    {
        named: 'Сообщить об ошибке',
        id: '3',
        icon: <ExclamationCircleOutlined/>,
        danger: true,
    }
]

const menuPropsMobile = {
    items: [
        {
            label: 'Запросить сервер',
            key: '1',
            icon: <AppstoreAddOutlined key={"dropdown-2"}/>,
            danger: false,
            disabled: false,
        },
        {
            label: 'QubixMC',
            key: '2',
            icon: <StarOutlined />,
            danger: false,
        },
        {
            label: 'Сообщить об ошибке',
            key: '3',
            icon: <ExclamationCircleOutlined key={"dropdown-1"}/>,
            danger: true,
            disabled: false,
        },
    ],
    onClick: handleMenuClick,
};

export default function Header() {
    const {modal} = App.useApp();
    modalHook = modal
    return (<header className=" p-4">
        <div className="container mx-auto flex justify-between items-center">
            <a href={"/"} className="text-white text-2xl">Onrain Monitoring</a>
            <Dropdown trigger={['click']} className={"md:hidden"} menu={menuPropsMobile}>
                <Button>
                    <Space>
                        Меню
                        <DownOutlined/>
                    </Space>
                </Button>
            </Dropdown>
            { /* Buttons */}
            <div className="hidden md:flex space-x-4">
                {buttons.map((item, i) => (
                    <Button danger={item.danger} onClick={() => handleButtonClick(item.id)}>
                        <Space>
                            {item.icon}
                            {item.named}
                        </Space>
                    </Button>
                ))}
            </div>
        </div>
    </header>)
}
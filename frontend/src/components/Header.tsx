import {App, Button, Dropdown, MenuProps, message, Space, Tooltip} from "antd";
import {AppstoreAddOutlined, DownOutlined, ExclamationCircleOutlined, UserOutlined} from '@ant-design/icons';
import React, {useState} from "react";
import {HookAPI} from "antd/es/modal/useModal";

function handleButtonClick(id: string, modal: HookAPI) {
    switch (id) {
        case "1": {
            modal.info({
                title: "Добавить сервер в мониторинг",
                content: (
                    <div className={"pb-4"}>
                        Чтобы добавить сервер в мониторинг обратись к владельцу проекта в Telegram
                    </div>
                ),
                okText: "Перейти в Telegram",
                onOk: () => {
                    window.location.href = "https://inotbaggi.t.me/"
                }
            })
            break
        }
        case "2": {
            modal.warning({
                title: "Сообщить о проблеме",
                okText: "Перейти в Telegram",
                onOk: () => {
                    window.location.href = "https://inotbaggi.t.me/"
                }
            })
        }
    }
};

const handleMenuClick: MenuProps['onClick'] = (e) => {
    message.info('Click on menu item.');
    console.log('click', e);
};

const buttons = [
    {
        id: "1",
        named: "Запросить сервер",
        icon: <AppstoreAddOutlined/>,
        danger: false,
    },
    {
        named: 'Сообщить об ошибке',
        id: '2',
        icon: <ExclamationCircleOutlined/>,
        danger: true,
    }
]

const menuPropsMobile = {
    items: [
        {
            label: 'Запросить сервер',
            key: '3',
            icon: <AppstoreAddOutlined key={"dropdown-2"}/>,
            danger: false,
            disabled: false,
        },
        {
            label: 'Сообщить об ошибке',
            key: '4',
            icon: <ExclamationCircleOutlined key={"dropdown-1"}/>,
            danger: true,
            disabled: false,
        },
    ],
    onClick: handleMenuClick,
};

export default function Header() {
    const {modal} = App.useApp();
    return (<header className=" p-4">
        <div className="container mx-auto flex justify-between items-center">
            <h1 className="text-white text-2xl">Onrain Monitoring</h1>
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
                    <Button danger={item.danger} onClick={() => handleButtonClick(item.id, modal)}>
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
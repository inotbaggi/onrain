import React from "react";

interface CopyIpProps {
    text: string;
}

export default function CopyIp(data: CopyIpProps) {
    const [renderText, setRenderText] = React.useState(data.text)
    const handleClick = () => {
        navigator.clipboard.writeText(data.text)
            .then(() => {
                setRenderText('Скопировано')
                setTimeout(function () {
                    setRenderText(data.text)
                }, 2500)
            })
            .catch((error) => {
                console.error('Failed to copy text: ', error);
            });
    };
    return (
        <p onClick={handleClick}
           className="bg-white hover:bg-gray-200 cursor-pointer rounded-2xl text-center text-sm text-black">{renderText}</p>
    )
}
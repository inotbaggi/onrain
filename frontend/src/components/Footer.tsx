export default function Footer() {
    return (
        <footer className="text-white py-4 mt-8">
            <div className="container mx-auto text-center">
                <p className={"text-sm text-red-500"}>
                    Onrain обладает информацией об онлайне во время его работы.
                    <p>Он не знает, что пару лет назад на N проекте было много людей.</p>
                    <p>Пиковый онлайн подсчитывается во время пинга, а не за все время жизни сервера (это не реально)</p>
                </p>

                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Все права защищены.
                </p>
                <p className="text-sm mt-2">
                    <a href="https://github.com/inotbaggi/onrain" className="text-blue-400 hover:underline">Github</a> |{' '}
                    <a href="https://inotbaggi.t.me" className="text-blue-400 hover:underline">Project owner</a>
                </p>
            </div>
        </footer>
    )
}
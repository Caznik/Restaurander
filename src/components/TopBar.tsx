function TopBar() {
    return(
        <>
            <header className="bg-white shadow-sm border-b border-gray-200 px-4 py-3">
                <div className="max-w-6xl mx-auto flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="p-2 rounded-lg">
                            <span>Logo</span>
                        </div>
                    </div>

                    <h1 className="text-red-500">Restaurander</h1>

                    <button className="hover:bg-gray-100 p-2 rounded-full transition-colors">
                        <span>Perfil</span>
                    </button>
                </div>
            </header>
        </>
    )
}

export default TopBar;
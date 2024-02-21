const Footer= () => {
    return(
        <div className="bg-blue-800 py-8">
            <div className="container mx-auto flex justify-between">
                <span className="text-white font-bold text-3xl tracking-tight">
                    MernHolidays.com
                </span>
                <span className="text-white font-bold flex tracking-tight gap-4">
                    <p className="cursor-pointer">Privacy Policy</p>
                    <p className="cursor-pointer">Terms of Service</p>
                </span>
            </div>
        </div>
    )
}
export default Footer
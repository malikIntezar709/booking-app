import { useEffect } from "react"

type ToastProps={
    message:string,
    type:"Success" |  "Error",
    onClose:()=> void
}

const Toast=({message, type, onClose}: ToastProps)=>{
    useEffect(()=>{
        const timer=setTimeout(()=>{
            onClose()
        },5000);

        return () => {
            clearTimeout(timer)
        }
    },[onClose])
    const styles=`fixed top-16 right-4 z-50 p-4 rounded-md ${type === 'Success' ? 'bg-green-600' : 'bg-red-600' } text-white max-w-md`
    return(
        <div className={styles}>
            <div className="flex justify-center items-center">
                <span className="text-lg font-semibold">{message}</span>
            </div>
        </div>
    )
}

export default Toast
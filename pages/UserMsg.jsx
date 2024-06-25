import { eventBusService } from "../services/event-bus.service.js"

const { useState, useEffect,useRef } = React


export function UserMsg() {

    const [msg, setMsg] = useState(null)
    const timeoutId = useRef()

    useEffect(() => {
       const onRemoveListener = eventBusService.on('show-user-msg', msg => {
            clearTimeout(timeoutId.current)
            setMsg(msg)
            timeoutId.current = setTimeout(closeMsg,1500)
        })
        return () => onRemoveListener()
    })

    function closeMsg(){
        setMsg(null)
        
    }

    if (!msg) return null
    return (
        <section className={`user-msg ${msg.type}`}>
            <p>{msg.txt}</p>
        </section>
    )
}
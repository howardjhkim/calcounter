import React, {useState} from "react"
import Calendarapp from 'react-calendar'
import '../Calendar.css';




export default function Calendar() {
    const [date, setDate] = useState(new Date())
    const onChange = date => {
        setDate(date)
    }
    
    
    return (
        <div>
            <Calendarapp onChange={onChange} value={date} />
        </div>
    )
}
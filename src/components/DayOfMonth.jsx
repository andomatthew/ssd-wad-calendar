/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"

import Event from "./Event"

export default function DayOfMonth({ date, events }) {
  const [totalEvents, setTotalEvents] = useState(0)

  useEffect(() => {
    setTotalEvents(events?.length)
  }, [events.length, totalEvents])

  return (
    <div className="w-[14vw] min-h-[7vw] border relative flex flex-col p-1 gap-y-1">
      <span>{date}</span>
      {events?.map((event, idx) => (
        <Event key={idx} event={event} />
      ))}
    </div>
  )
}

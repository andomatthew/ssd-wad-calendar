import { useEffect, useState } from "react"
import PropTypes from "prop-types"

import Event from "./Event"

export default function DayOfMonth({
  date,
  events,
  setShowDialogDelete,
  setSelectedItem,
  setShowDialogUpdate,
  setSelectedDate,
  setIsUpdate,
}) {
  const [totalEvents, setTotalEvents] = useState(0)

  function handleClickAddEvent(ev) {
    if (
      (ev?.target?.id.includes("event") ||
        ev?.target?.id.includes("day-of-month")) &&
      totalEvents < 3
    ) {
      setShowDialogUpdate(true)
      setSelectedDate(date)
    }
  }

  useEffect(() => {
    setTotalEvents(events?.length)
  }, [events.length, totalEvents])

  return (
    <div
      id="day-of-month"
      className="w-[14vw] min-h-[7vw] border border-gray-400 relative flex flex-col p-1 gap-y-1 cursor-pointer"
      onClick={(ev) => handleClickAddEvent(ev)}
    >
      <span id="day-of-month__date">{date}</span>
      {events?.map((event, idx) => (
        <Event
          key={idx}
          event={event}
          setShowDialogDelete={setShowDialogDelete}
          setSelectedItem={setSelectedItem}
          setShowDialogUpdate={setShowDialogUpdate}
          setIsUpdate={setIsUpdate}
        />
      ))}
    </div>
  )
}

DayOfMonth.propTypes = {
  date: PropTypes.number,
  events: PropTypes.object,
  setShowDialogDelete: PropTypes.func,
  setSelectedItem: PropTypes.func,
  setShowDialogUpdate: PropTypes.func,
  setSelectedDate: PropTypes.func,
  setIsUpdate: PropTypes.bool,
}

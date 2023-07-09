import { useCallback } from "react"
import PropTypes from "prop-types"

import Event from "./Event"

export default function DayOfMonth({
  date = 0,
  events = [],
  setShowDialogDelete = () => {},
  setSelectedItem = () => {},
  setShowDialogUpdate = () => {},
  setIsUpdate = () => {},
}) {
  const handleClickAddEvent = useCallback(
    (ev) => {
      ev.preventDefault()
      if (
        ev?.target?.id.includes("event") ||
        ev?.target?.id.includes("day-of-month")
      ) {
        setShowDialogUpdate(true)
      }
    },
    [setShowDialogUpdate]
  )

  return (
    <div
      id="day-of-month"
      className="w-[14vw] min-h-[7vw] border border-gray-400 relative flex flex-col p-1 gap-y-1 cursor-pointer"
      onClick={(ev) => handleClickAddEvent(ev)}
    >
      <span id="day-of-month__date">{date}</span>
      {events?.map((event) => (
        <Event
          key={event?.id}
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
  events: PropTypes.array,
  setShowDialogDelete: PropTypes.func,
  setSelectedItem: PropTypes.func,
  setShowDialogUpdate: PropTypes.func,
  setIsUpdate: PropTypes.func,
}

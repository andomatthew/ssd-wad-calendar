import dayOfWeek from "../utils/dayOfWeek"

export default function CalendarHeader() {
  return (
    <div className="calendar__header flex flex-wrap bg-black ">
      {dayOfWeek.map((day) => (
        <div key={day} className="text-white text-center text-lg w-[14vw]">
          {day}
        </div>
      ))}
    </div>
  )
}

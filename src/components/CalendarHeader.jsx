import { DAYS_OF_WEEK } from "../constants"

export default function CalendarHeader() {
  return (
    <div className="calendar__header flex flex-wrap bg-black ">
      {DAYS_OF_WEEK?.map((day) => (
        <div key={day} className="text-white text-center text-lg w-[14vw]">
          {day}
        </div>
      ))}
    </div>
  )
}

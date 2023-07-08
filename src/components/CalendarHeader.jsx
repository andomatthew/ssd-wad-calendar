/* eslint-disable react/prop-types */
export default function CalendarHeader({ dayList }) {
  return (
    <div className="calendar__header flex flex-wrap">
      {dayList.map((day) => (
        <div
          key={day}
          className="bg-black text-white text-center text-lg w-[14vw]"
        >
          {day}
        </div>
      ))}
    </div>
  )
}

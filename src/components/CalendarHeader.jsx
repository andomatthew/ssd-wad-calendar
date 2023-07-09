/* eslint-disable react/prop-types */
export default function CalendarHeader({ dayList }) {
  return (
    <div className="calendar__header flex flex-wrap bg-black ">
      {dayList.map((day) => (
        <div key={day} className="text-white text-center text-lg w-[14vw]">
          {day}
        </div>
      ))}
    </div>
  )
}

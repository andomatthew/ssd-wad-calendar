import { useEffect, useState } from "react"

import "./assets/main.css"

const dayList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]

const monthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]

function App() {
  const [currentMonthInNumber, setCurrentMonthInNumber] = useState(0)
  const [currentMonth, setCurrentMonth] = useState("")
  const [currentYear, setCurrentYear] = useState(0)
  const [totalDaysCurrentMonth, setTotalDaysCurrentMonth] = useState(0)
  const [offsetDate, setOffsetDate] = useState(0)

  function initCurrentMonth() {
    const now = new Date()
    const currentMonthLocal = monthList[now.getMonth()]
    setCurrentMonth(currentMonthLocal)
    setCurrentMonthInNumber(now.getMonth())
  }

  function initCurrentYear() {
    const now = new Date()
    const currentYearLocal = now.getFullYear()
    setCurrentYear(currentYearLocal)
  }

  function initTotalDaysCurrentMonth() {
    const nextMonthDate = new Date(currentYear, currentMonthInNumber + 1, 1)
    const lastDayOfMonth = new Date(nextMonthDate - 1)
    const totalDaysInCurrentMonth = lastDayOfMonth.getDate()
    setTotalDaysCurrentMonth(totalDaysInCurrentMonth)
  }

  function setOffset() {
    const startDay = new Date(
      currentYear,
      currentMonthInNumber,
      1
    ).toLocaleDateString(undefined, { weekday: "long" })
    const offset = dayList.findIndex((day) => day === startDay)
    setOffsetDate(offset)
  }

  useEffect(() => {
    initCurrentMonth()
    initCurrentYear()
    initTotalDaysCurrentMonth()
    setOffset()
  })

  return (
    <main>
      <h1 className="text-2xl text-center font-bold mb-4">
        {currentMonth} {currentYear}
      </h1>
      <div className="wrapper mx-auto">
        <div className="calendar flex flex-col">
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
          <div className="calendar__body flex flex-wrap">
            {new Array(offsetDate).fill(0).map((_, itemIdx) => (
              <div key={itemIdx} className="w-[14vw] min-h-[7vw]"></div>
            ))}

            {new Array(totalDaysCurrentMonth).fill(0).map((_, itemIdx) => (
              <div key={itemIdx} className="w-[14vw] min-h-[7vw] border">
                {itemIdx + 1}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default App

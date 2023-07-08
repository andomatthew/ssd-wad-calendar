import { useEffect, useState } from "react"

import CalendarHeader from "./components/CalendarHeader"
import CalendarOffset from "./components/CalendarOffset"
import DayOfMonth from "./components/DayOfMonth"

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
  const [events, setEvents] = useState([])

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

  function setEventsToDayOfMonth(date = 0) {
    const result = events.filter((event) => event.date === date)
    return result
  }

  useEffect(() => {
    const persistList = JSON.parse(localStorage.getItem("list"))
    if (persistList?.length && !events?.length) {
      setEvents(persistList)
    }
  }, [events])

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
          <CalendarHeader dayList={dayList} />
          <div className="calendar__body flex flex-wrap">
            <CalendarOffset offset={offsetDate} />

            {new Array(totalDaysCurrentMonth).fill(0).map((_, itemIdx) => (
              <DayOfMonth
                key={itemIdx}
                date={itemIdx + 1}
                events={setEventsToDayOfMonth(itemIdx + 1)}
              />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

export default App

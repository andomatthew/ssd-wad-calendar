import { useEffect, useState } from "react"

import CalendarHeader from "./components/CalendarHeader"
import CalendarOffset from "./components/CalendarOffset"
import DayOfMonth from "./components/DayOfMonth"
import DialogDeleteConfirmation from "./components/Dialog/DialogDeleteConfirmation"
import DialogUpdateEvent from "./components/Dialog/DialogUpdateEvent"

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
  const [selectedItem, setSelectedItem] = useState(null)
  const [selectedDate, setSelectedDate] = useState(0)
  const [showDialogDelete, setShowDialogDelete] = useState(false)
  const [showDialogUpdate, setShowDialogUpdate] = useState(false)
  const [form] = useState({
    eventName: "",
    time: {
      value: 0,
      meridiem: "AM",
    },
    invitees: "",
    id: "",
    date: 0,
  })
  const [isUpdate, setIsUpdate] = useState(false)

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

  function deleteEvent() {
    const list = JSON.parse(localStorage.getItem("list"))
    const filteredList = list.filter((item) => item?.id !== selectedItem?.id)
    localStorage.setItem("list", JSON.stringify(filteredList))
    setEvents(filteredList)
    setShowDialogDelete(false)
  }

  function createEvent(body) {
    const obj = {
      ...body,
      id: Date.now().toString(36),
      date: selectedDate,
    }
    setEvents((arr) => [...arr, obj])
    const updatedEvents = [...events]
    updatedEvents.push(obj)
    localStorage.setItem("list", JSON.stringify(updatedEvents))
    setShowDialogUpdate(false)
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
                setShowDialogDelete={setShowDialogDelete}
                setSelectedItem={setSelectedItem}
                setShowDialogUpdate={setShowDialogUpdate}
                setSelectedDate={setSelectedDate}
              />
            ))}
          </div>
        </div>
      </div>
      {showDialogDelete && (
        <DialogDeleteConfirmation
          setShowDialogDelete={setShowDialogDelete}
          selectedItem={selectedItem}
          handleDeleteEvent={deleteEvent}
        />
      )}
      {showDialogUpdate && (
        <DialogUpdateEvent
          form={form}
          isUpdate={isUpdate}
          setShowDialogUpdate={setShowDialogUpdate}
          createEvent={createEvent}
        />
      )}
    </main>
  )
}

export default App

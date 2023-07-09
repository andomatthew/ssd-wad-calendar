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

const colors = [
  "bg-red-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-yellow-500",
  "bg-lime-500",
  "bg-green-500",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-sky-500",
  "bg-blue-500",
  "bg-indigo-500",
  "bg-violet-500",
  "bg-purple-500",
  "bg-fuchsia-500",
  "bg-pink-500",
  "bg-rose-500",
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
  const [form, setForm] = useState({
    eventName: "",
    time: {
      value: 0,
      meridiem: "AM",
    },
    invitees: "",
    id: "",
    date: 0,
    bgColor: "",
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
      bgColor: setColorToEvent(selectedDate),
    }
    setEvents((arr) => [...arr, obj])
    const updatedEvents = [...events]
    updatedEvents.push(obj)
    localStorage.setItem("list", JSON.stringify(updatedEvents))
    setShowDialogUpdate(false)
  }

  function updateEvent(body) {
    const updatedEvents = events.map((event) =>
      event.id === body.id ? body : event
    )
    setEvents(updatedEvents)
    localStorage.setItem("list", JSON.stringify(updatedEvents))
    setShowDialogUpdate(false)
  }

  function resetForm() {
    setForm({
      eventName: "",
      time: {
        value: 0,
        meridiem: "AM",
      },
      invitees: "",
      id: "",
      date: 0,
    })
  }

  function setColorToEvent(selectedDate) {
    const unUsedColors = colors.filter(
      (color) =>
        color !==
        events.find(
          (event) => event.bgColor === color && event?.date === selectedDate
        )?.bgColor
    )
    return unUsedColors[Math.floor(Math.random() * (unUsedColors.length - 1))]
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

  useEffect(() => {
    if (isUpdate) {
      setForm({
        ...selectedItem,
      })
    }
  }, [isUpdate, selectedItem])

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
                setIsUpdate={setIsUpdate}
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
          setIsUpdate={setIsUpdate}
          resetForm={resetForm}
          updateEvent={updateEvent}
        />
      )}
    </main>
  )
}

export default App

import { useEffect, useMemo, useCallback, useState } from "react"

import CalendarHeader from "./components/CalendarHeader"
import CalendarOffset from "./components/CalendarOffset"
import DayOfMonth from "./components/DayOfMonth"
import DialogDeleteConfirmation from "./components/Dialog/DialogDeleteConfirmation"
import DialogUpdateEvent from "./components/Dialog/DialogUpdateEvent"

import { DAYS_OF_WEEK, MONTH_OF_YEAR, COLORS } from "./constants"
import setPersistedData from "./utils/setPersistedData"
import getPersistedData from "./utils/getPersistedData"

import "./assets/main.css"

const App = () => {
  const [currentMonthInNumber, setCurrentMonthInNumber] = useState(0)
  const [currentMonth, setCurrentMonth] = useState("")
  const [currentYear, setCurrentYear] = useState(0)
  const [totalDaysCurrentMonth, setTotalDaysCurrentMonth] = useState(0)
  const [offsetDate, setOffsetDate] = useState(0)
  const [events, setEvents] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)

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

  const restrictedDates = useMemo(() => {
    const result = events.map((event) => event?.date)
    return result
  }, [events])

  const setColorToEvent = useCallback(
    (selectedDate) => {
      const unUsedColors = COLORS.filter(
        (color) =>
          color !==
          events.find(
            (event) => event.bgColor === color && event?.date === selectedDate
          )?.bgColor
      )
      return unUsedColors[Math.floor(Math.random() * (unUsedColors.length - 1))]
    },
    [events]
  )

  const initCurrentMonth = useCallback(() => {
    const now = new Date()
    const currentMonthLocal = MONTH_OF_YEAR[now.getMonth()]
    setCurrentMonth(currentMonthLocal)
    setCurrentMonthInNumber(now.getMonth())
  }, [])

  const initCurrentYear = useCallback(() => {
    const now = new Date()
    const currentYearLocal = now.getFullYear()
    setCurrentYear(currentYearLocal)
  }, [])

  const initTotalDaysCurrentMonth = useCallback(() => {
    const nextMonthDate = new Date(currentYear, currentMonthInNumber + 1, 1)
    const lastDayOfMonth = new Date(nextMonthDate - 1)
    const totalDaysInCurrentMonth = lastDayOfMonth.getDate()
    setTotalDaysCurrentMonth(totalDaysInCurrentMonth)
  }, [currentMonthInNumber, currentYear])

  const setOffset = useCallback(() => {
    const startDay = new Date(
      currentYear,
      currentMonthInNumber,
      1
    ).toLocaleDateString(undefined, { weekday: "long" })
    const offset = DAYS_OF_WEEK.findIndex((day) => day === startDay)
    setOffsetDate(offset)
  }, [currentMonthInNumber, currentYear])

  const setEventsToDayOfMonth = useCallback(
    (date = 0) => {
      const result = events.filter((event) => event.date === date)
      return result
    },
    [events]
  )

  const deleteEvent = useCallback(() => {
    const list = getPersistedData()
    const filteredList = list.filter((item) => item?.id !== selectedItem?.id)
    setPersistedData(filteredList)
    setEvents(filteredList)
    setShowDialogDelete(false)
  }, [selectedItem])

  const createEvent = useCallback(
    (body) => {
      const obj = {
        ...body,
        id: Date.now().toString(36),
        bgColor: setColorToEvent(body?.date),
      }
      setEvents((arr) => [...arr, obj])
      const updatedEvents = [...events]
      updatedEvents.push(obj)
      setPersistedData(updatedEvents)
      setShowDialogUpdate(false)
    },
    [events, setColorToEvent]
  )

  const resetForm = useCallback(() => {
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
  }, [])

  const updateEvent = useCallback(
    (body) => {
      const obj = {
        ...body,
        bgColor: setColorToEvent(body?.date),
      }
      const updatedEvents = events.map((event) =>
        event.id === obj.id ? obj : event
      )
      setEvents(updatedEvents)
      setPersistedData(updatedEvents)
      setShowDialogUpdate(false)
      resetForm()
    },
    [events, setColorToEvent, resetForm]
  )

  useEffect(() => {
    const persistList = getPersistedData()
    if (persistList?.length && !events?.length) {
      setEvents(persistList)
    }
  }, [events])

  useEffect(() => {
    initCurrentMonth()
    initCurrentYear()
    initTotalDaysCurrentMonth()
    setOffset()
  }, [initCurrentMonth, initCurrentYear, initTotalDaysCurrentMonth, setOffset])

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
          <CalendarHeader />
          <div className="calendar__body flex flex-wrap bg-gray-300">
            <CalendarOffset offset={offsetDate} />

            {new Array(totalDaysCurrentMonth).fill(0).map((_, itemIdx) => (
              <DayOfMonth
                key={itemIdx}
                date={itemIdx + 1}
                events={setEventsToDayOfMonth(itemIdx + 1)}
                setShowDialogDelete={setShowDialogDelete}
                setSelectedItem={setSelectedItem}
                setShowDialogUpdate={setShowDialogUpdate}
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
          restrictedDates={restrictedDates}
          totalDaysCurrentMonth={totalDaysCurrentMonth}
        />
      )}
    </main>
  )
}

export default App

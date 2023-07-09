import { useState, useEffect, useMemo } from "react"
import PropTypes from "prop-types"

import IconXmark from "../Icons/IconXmark"

export default function DialogUpdateEvent({
  form,
  isUpdate,
  setShowDialogUpdate,
  createEvent,
  setIsUpdate,
  resetForm,
  updateEvent,
  restrictedDates,
  totalDaysCurrentMonth,
}) {
  const [eventName, setEventName] = useState("")
  const [time, setTime] = useState("")
  const [meridiem, setMeridiem] = useState("AM")
  const [invitees, setInvitees] = useState("")
  const [date, setDate] = useState("")

  const isAllowedSubmit = useMemo(() => {
    const matcher = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/

    const isValidEventName = !!eventName.length
    const isValidTime = time >= 0 && time <= 12
    const isValidInvitees = matcher.test(invitees)
    const isValidEventDate =
      !!date.length && date >= 1 && date <= totalDaysCurrentMonth
    const isAbleToAddEvents = !!(
      countSpecificDuplicates(restrictedDates, date) < 3
    )

    return (
      isValidEventName &&
      isValidTime &&
      isValidInvitees &&
      isValidEventDate &&
      (isAbleToAddEvents || isUpdate)
    )
  }, [
    eventName,
    time,
    invitees,
    date,
    restrictedDates,
    totalDaysCurrentMonth,
    isUpdate,
  ])

  function countSpecificDuplicates(arr, specificDate) {
    let counter = 0

    for (let i = 0; i < arr?.length; i++) {
      if (arr[i] === Number(specificDate)) {
        counter++
      }
    }
    return counter
  }

  function handleSubmit(ev) {
    ev.preventDefault()
    const body = {
      eventName,
      time: { value: Number(time), meridiem },
      invitees,
      date: Number(date),
    }
    if (!isUpdate) {
      createEvent(body)
    } else {
      updateEvent({
        ...body,
        id: form.id,
        bgColor: form.bgColor,
      })
    }
  }

  function handleClickClose() {
    setIsUpdate(false)
    setShowDialogUpdate(false)
    resetForm()
  }

  useEffect(() => {
    if (!!form.eventName && !!form.time && form.invitees && form.date) {
      setEventName(form.eventName)
      setTime(form.time.value)
      setMeridiem(form.time.meridiem)
      setInvitees(form.invitees)
      setDate(String(form.date))
    }
  }, [form])

  return (
    <div className="overlay bg-[rgba(100,116,139,0.5)] h-screen w-screen flex justify-center items-center fixed top-0">
      <dialog open={true} className="justify-around w-[30vw] rounded-md">
        <div className="flex justify-end">
          <button
            className="bg-red-500 py-1 px-1 rounded-full text-white"
            onClick={handleClickClose}
          >
            <IconXmark />
          </button>
        </div>
        <form
          onSubmit={(ev) => handleSubmit(ev)}
          className="flex flex-col gap-y-4"
        >
          <div className="flex gap-x-2">
            <div className="flex flex-col gap-y-1 w-2/3">
              <label htmlFor="input-event-name">Event Name</label>
              <input
                id="input-event-name"
                type="text"
                className="border rounded-md p-2"
                value={eventName}
                onChange={(ev) => setEventName(ev.target.value)}
              />
            </div>
            <div className="flex flex-col gap-y-1 w-1/3">
              <label htmlFor="input-event-date">Event Date</label>
              <input
                id="input-event-date"
                type="number"
                className="border rounded-md p-2"
                value={date}
                min={1}
                max={totalDaysCurrentMonth}
                onChange={(ev) => setDate(ev.target.value)}
              />
            </div>
          </div>
          <div className="flex gap-x-2">
            <div className="flex flex-col gap-y-1 w-2/3">
              <label htmlFor="input-event-time">
                Time <span>(range from 1 ~ 12)</span>
              </label>
              <input
                id="input-event-time"
                type="number"
                className="border rounded-md p-2"
                value={time}
                min={1}
                max={12}
                onChange={(ev) => setTime(ev.target.value)}
              />
            </div>
            <div className="flex flex-col gap-y-1 w-1/3">
              <label htmlFor="input-event-meridiem">Meridiem</label>
              <select
                id="input-event-meridiem"
                className="border rounded-md p-2"
                value={meridiem}
                onChange={(ev) => setMeridiem(ev.target.value)}
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
          <div className="flex flex-col gap-y-1">
            <label htmlFor="input-event-invitees">
              Invitees <span>(must be an email)</span>
            </label>
            <input
              id="input-event-invitees"
              type="email"
              className="border rounded-md p-2"
              value={invitees}
              onChange={(ev) => setInvitees(ev.target.value)}
            />
          </div>
          <button
            className={`p-2 rounded-md text-slate-100 ${
              isAllowedSubmit ? "bg-green-500 " : "bg-slate-500 opacity-20"
            }`}
            type="submit"
            disabled={!isAllowedSubmit}
          >
            {" "}
            {isUpdate ? "Update Event" : "Create Event"}{" "}
          </button>
        </form>
      </dialog>
    </div>
  )
}

DialogUpdateEvent.propTypes = {
  form: PropTypes.object,
  isUpdate: PropTypes.bool,
  setShowDialogUpdate: PropTypes.func,
  createEvent: PropTypes.func,
  setIsUpdate: PropTypes.func,
  resetForm: PropTypes.func,
  updateEvent: PropTypes.func,
  restrictedDates: PropTypes.array,
  totalDaysCurrentMonth: PropTypes.number,
}

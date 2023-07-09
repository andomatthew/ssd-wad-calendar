import { useState, useEffect, useMemo } from "react"
import PropTypes from "prop-types"

import Xmark from "../Icons/Xmark"

export default function DialogUpdateEvent({
  form,
  isUpdate,
  setShowDialogUpdate,
  createEvent,
  setIsUpdate,
  resetForm,
  updateEvent,
}) {
  const [eventName, setEventName] = useState("")
  const [time, setTime] = useState("")
  const [meridiem, setMeridiem] = useState("AM")
  const [invitees, setInvitees] = useState("")

  const isAllowedSubmit = useMemo(() => {
    const matcher = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$/

    const isValidEventName = !!eventName.length
    const isValidTime = time >= 0 && time <= 12
    const isValidInvitees = matcher.test(invitees)

    return isValidEventName && isValidTime && isValidInvitees
  }, [eventName, time, invitees])

  function handleSubmit(ev) {
    ev.preventDefault()
    const body = {
      eventName,
      time: { value: Number(time), meridiem },
      invitees,
    }
    if (!isUpdate) {
      createEvent(body)
    } else {
      updateEvent({
        ...body,
        id: form.id,
        date: form.date,
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
    if (!!form.eventName && !!form.time && form.invitees) {
      setEventName(form.eventName)
      setTime(form.time.value)
      setMeridiem(form.time.meridiem)
      setInvitees(form.invitees)
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
            <Xmark />
          </button>
        </div>
        <form
          onSubmit={(ev) => handleSubmit(ev)}
          className="flex flex-col gap-y-4"
        >
          <div className="flex flex-col gap-y-1">
            <label htmlFor="input-event-name">Event Name</label>
            <input
              id="input-event-name"
              type="text"
              className="border rounded-md p-2"
              value={eventName}
              onChange={(ev) => setEventName(ev.target.value)}
            />
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
                min={0}
                max={23}
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
}

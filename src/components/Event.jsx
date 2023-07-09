/* eslint-disable react/prop-types */
export default function Event({
  event,
  setShowDialogDelete,
  setSelectedItem,
  setShowDialogUpdate,
  setIsUpdate,
}) {
  function handleClick() {
    setSelectedItem(event)
    setShowDialogDelete(true)
  }

  function handleClickUpdate() {
    setIsUpdate(true)
    setSelectedItem(event)
    setShowDialogUpdate(true)
  }

  return (
    <div
      id="event"
      className={`${
        event?.bgColor ?? "bg-slate-500"
      } flex-grow flex flex-col justify-around text-sm relative group cursor-pointer`}
    >
      <div className="gap-x-1  absolute top-0 right-0 hidden group-hover:flex">
        <button
          className="uppercase border rounded-sm px-2"
          onClick={handleClick}
        >
          del
        </button>
        <button
          className="uppercase border rounded-sm px-2"
          onClick={handleClickUpdate}
        >
          update
        </button>
      </div>
      <p id="event-name">{event.eventName}</p>
      <p id="event-time">
        {event.time.value} {event.time.meridiem}
      </p>
      <p id="event-invitees">{event.invitees}</p>
    </div>
  )
}

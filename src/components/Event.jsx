/* eslint-disable react/prop-types */
export default function Event({ event, setShowDialogDelete, setSelectedItem }) {
  function handleClick() {
    setSelectedItem(event)
    setShowDialogDelete(true)
  }
  return (
    <div
      id="event"
      className="bg-purple-300 flex-grow flex flex-col justify-around text-sm relative group cursor-pointer"
    >
      <div className="gap-x-1  absolute top-0 right-0 hidden group-hover:flex">
        <button
          className="uppercase border rounded-sm px-2"
          onClick={handleClick}
        >
          del
        </button>
        <button className="uppercase border rounded-sm px-2">update</button>
      </div>
      <p id="event-name">{event.eventName}</p>
      <p id="event-time">{event.time}</p>
      <p id="event-invitees">{event.invitees}</p>
    </div>
  )
}

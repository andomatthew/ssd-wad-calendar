/* eslint-disable react/prop-types */
export default function Event({ event, setShowDialogDelete, setSelectedItem }) {
  function handleClick() {
    setSelectedItem(event)
    setShowDialogDelete(true)
  }
  return (
    <div className="bg-purple-300 flex-grow flex flex-col justify-around text-sm relative group">
      <div className="gap-x-1  absolute top-0 right-0 hidden group-hover:flex">
        <button
          className="uppercase border rounded-sm px-2"
          onClick={handleClick}
        >
          del
        </button>
        <button className="uppercase border rounded-sm px-2">update</button>
      </div>
      <p>{event.eventName}</p>
      <p>{event.time}</p>
      <p>{event.invitees}</p>
    </div>
  )
}

import PropTypes from "prop-types"

import Trash from "./Icons/Trash"
import PencilSquare from "./Icons/PencilSquare"

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
      } flex-grow flex flex-col justify-around text-sm relative group cursor-pointer text-white`}
    >
      <div className="gap-x-1 py-1 absolute top-1 right-1 hidden group-hover:flex rounded-sm bg-inherit mix-blend-overlay border">
        <button className="uppercase rounded-sm px-1" onClick={handleClick}>
          <Trash />
        </button>
        <button
          className="uppercase rounded-sm px-1"
          onClick={handleClickUpdate}
        >
          <PencilSquare />
        </button>
      </div>
      <p id="event-name">{event.eventName}</p>
      <p id="event-invitees">{event.invitees}</p>
      <p id="event-time">
        {event.time.value} {event.time.meridiem}
      </p>
    </div>
  )
}

Event.propTypes = {
  event: PropTypes.object,
  setShowDialogDelete: PropTypes.func,
  setSelectedItem: PropTypes.func,
  setShowDialogUpdate: PropTypes.func,
  setIsUpdate: PropTypes.func,
}

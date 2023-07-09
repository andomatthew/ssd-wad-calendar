import PropTypes from "prop-types"

import IconTrash from "./Icons/IconTrash"
import IconPencilSquare from "./Icons/IconPencilSquare"

export default function Event({
  event = {},
  setShowDialogDelete = () => {},
  setSelectedItem = () => {},
  setShowDialogUpdate = () => {},
  setIsUpdate = () => {},
}) {
  function handleClickDelete() {
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
      } flex-grow flex flex-col justify-around text-sm relative group cursor-pointer text-white px-2 gap-y-1 h-[50%] max-h-[140px]`}
    >
      <div className="gap-x-1 py-2 absolute top-1 right-1 hidden group-hover:flex rounded-sm bg-gray-950 mix-blend-overlay border">
        <button
          className="uppercase rounded-sm px-1"
          onClick={handleClickDelete}
        >
          <IconTrash />
        </button>
        <button
          className="uppercase rounded-sm px-1"
          onClick={handleClickUpdate}
        >
          <IconPencilSquare />
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
  event: PropTypes.shape({
    eventName: PropTypes.string.isRequired,
    invitees: PropTypes.string.isRequired,
    time: PropTypes.shape({
      value: PropTypes.number.isRequired,
      meridiem: PropTypes.string.isRequired,
    }),
    bgColor: PropTypes.string,
  }).isRequired,
  setShowDialogDelete: PropTypes.func,
  setSelectedItem: PropTypes.func,
  setShowDialogUpdate: PropTypes.func,
  setIsUpdate: PropTypes.func,
}

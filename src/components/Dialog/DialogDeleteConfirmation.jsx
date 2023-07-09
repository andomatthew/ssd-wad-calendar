import { useCallback } from "react"
import PropTypes from "prop-types"

export default function DeleteConfirmation({
  setShowDialogDelete = () => {},
  selectedItem = {},
  handleDeleteEvent = () => {},
}) {
  const handleCancelClick = useCallback(
    () => setShowDialogDelete(false),
    [setShowDialogDelete]
  )

  const handleDeleteClick = useCallback(
    () => handleDeleteEvent(),
    [handleDeleteEvent]
  )
  return (
    <div className="overlay bg-[rgba(100,116,139,0.5)] h-screen w-screen flex justify-center items-center fixed top-0">
      <dialog
        open={true}
        className="flex flex-col justify-between w-[30vw] h-[20vh] rounded-md"
      >
        <h6>
          Are you sure want to delete event {selectedItem?.eventName} on Date{" "}
          {selectedItem.date}?
        </h6>
        <div className="flex justify-end gap-x-2">
          <button className="uppercase px-4 py-1" onClick={handleCancelClick}>
            cancel
          </button>
          <button
            className="uppercase bg-red-500 text-white px-4 py-1 rounded-md"
            onClick={handleDeleteClick}
          >
            delete
          </button>
        </div>
      </dialog>
    </div>
  )
}

DeleteConfirmation.propTypes = {
  setShowDialogDelete: PropTypes.func,
  selectedItem: PropTypes.shape({
    eventName: PropTypes.string,
    date: PropTypes.number,
  }),
  handleDeleteEvent: PropTypes.func,
}

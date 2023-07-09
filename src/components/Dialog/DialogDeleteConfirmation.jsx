/* eslint-disable react/prop-types */
export default function DeleteConfirmation({
  setShowDialogDelete,
  selectedItem,
  handleDeleteEvent,
}) {
  return (
    <div className="overlay bg-[rgba(100,116,139,0.5)] h-screen w-screen flex justify-center items-center fixed top-0">
      <dialog
        open={true}
        className="flex flex-col justify-between w-[30vw] h-[20vh] rounded-md"
      >
        <h6>
          Are you sure want to delete event {selectedItem?.eventName} on{" "}
          {selectedItem.date}?
        </h6>
        <div className="flex justify-end gap-x-2">
          <button
            className="uppercase px-4 py-1"
            onClick={() => setShowDialogDelete(false)}
          >
            cancel
          </button>
          <button
            className="uppercase bg-red-500 text-white px-4 py-1 rounded-md"
            onClick={() => handleDeleteEvent()}
          >
            delete
          </button>
        </div>
      </dialog>
    </div>
  )
}

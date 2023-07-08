/* eslint-disable react/prop-types */
export default function Event({ event }) {
  return (
    <div className="bg-purple-300 flex-grow flex flex-col justify-around text-sm">
      <p>{event.eventName}</p>
      <p>{event.time}</p>
      <p>{event.invitees}</p>
    </div>
  )
}

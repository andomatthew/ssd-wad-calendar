import PropTypes from "prop-types"

export default function CalendarOffset({ offset = 0 }) {
  return Array.from({ length: offset }, (_, itemIdx) => (
    <div key={itemIdx} className="w-[14vw] min-h-[7vw]"></div>
  ))
}

CalendarOffset.propTypes = {
  offset: PropTypes.number,
}

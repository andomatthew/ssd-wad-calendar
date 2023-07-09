import PropTypes from "prop-types"

export default function CalendarOffset({ offset }) {
  return new Array(offset)
    .fill(0)
    .map((_, itemIdx) => (
      <div key={itemIdx} className="w-[14vw] min-h-[7vw]"></div>
    ))
}

CalendarOffset.propTypes = {
  offset: PropTypes.number,
}

export default function getPersistedData(keyword = "list") {
  return JSON.parse(localStorage.getItem(keyword))
}

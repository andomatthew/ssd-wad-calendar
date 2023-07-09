export default function setPersistedData(list) {
  localStorage.setItem("list", JSON.stringify(list))
}

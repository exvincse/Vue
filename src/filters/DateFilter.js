export default function (n) {
  let year = new Date(n).getFullYear()
  let month = new Date(n).getMonth()
  let day = new Date(n).getDate()
  let cdate = year + '/' + (month + 1) + '/' + day
  return cdate
}

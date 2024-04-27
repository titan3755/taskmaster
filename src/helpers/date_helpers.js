export function dateSeparator(dateStr) {
    let monthArray = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
    let date = new Date(dateStr)
    let day = date.getDate()
    let month = monthArray[date.getMonth()]
    let year = date.getFullYear()
    return `${day} ${month} ${year}`
}
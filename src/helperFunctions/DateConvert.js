export const DateConvert = (date) => {
  let newDate = date.replace('T', ' ')

  newDate = newDate.substring(0, newDate.length - 5)
  let [d,t] = newDate.split(' ')

  return [d,t]
}
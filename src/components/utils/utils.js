
exports.formatDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const monthArr = [
    'Jan', 'Feb', 'Mar', 
    'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec'
  ];
  const month = monthArr[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`  
}

exports.formatTime = (dateString) => {
  const date = new Date(dateString);
  const hour = date.getHours();
  const minute = date.getMinutes();

  return `${hour}:${minute}`
}

exports.formatTimeDate = (dateString) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const monthArr = [
    'Jan', 'Feb', 'Mar', 
    'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep',
    'Oct', 'Nov', 'Dec'
  ];
  const month = monthArr[date.getMonth()];
  const year = date.getFullYear();
  let hour = date.getHours();
  let amPm = 'am'
  if (hour > 12) {
    hour -= 12;
    amPm = 'pm'
  } 
  const minute = date.getMinutes();
  const minuteStr = minute < 10 ? '0' + minute : '' + minute;
  return `${hour}:${minuteStr}${amPm}, ${day} ${month} ${year}`

}

exports.formatBodySample = (str) => {
  // console.log(str.substr(0, 37) + '... the substring')
  return str.length > 40 ? str.substring(0, 37) + '...' : str;
}
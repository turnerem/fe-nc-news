
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
  return str.length > 40 ? str.substring(0, 37) + '...' : str;
}

exports.capitalize = (str) => {
  return str[0].toUpperCase() + str.substring(1)
}

exports.countsPerTimeUnit = (data) => {
  const countObj = {}
  data.forEach(elem => {
    let jsDate = new Date(elem.created_at);
    let mth = jsDate.getMonth() + 1;
    let yr = jsDate.getFullYear();
    let day = jsDate.getDate()
    

    let mthChar = (mth < 10) ? '0' + mth : '' + mth;
    let dayChar = (day < 10) ? '0' + day : '' + day;
    
    let formattedDate = `${yr}-${mthChar}-${dayChar}`
    countObj.hasOwnProperty(formattedDate) ? countObj[formattedDate] ++ : countObj[formattedDate] = 1;
  })
  const dateArr = Object.keys(countObj).map(key => {
    
    return { date: key, count: countObj[key]}
    
  })
  
  return dateArr
}

// const simulateDates = (minYrMth, maxYrMth, n) => {
  
// }
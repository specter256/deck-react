export default class Utils {
  static getCurrentDate() {
    const currentDate = new Date();
    let year = currentDate.getFullYear();
    let day: any = currentDate.getDate();
    let month: any = currentDate.getMonth() + 1;
    let hours: any = currentDate.getHours();
    let minutes: any = currentDate.getMinutes();
    let seconds: any = currentDate.getSeconds();

    if (day < 10) { day = '0' + day; }
    if (month < 10) { month = '0' + month; }
    if (hours < 10) { hours  = '0' + hours; }
    if (minutes < 10) { minutes  = '0' + minutes; }
    if (seconds < 10) { seconds  = '0' + seconds; }

    const date = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;

    return date;
  }
}

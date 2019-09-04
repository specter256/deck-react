export default class Utils {
  static getCurrentDate() {
    return this.formatDate(new Date(), true);
  }

  static formatDate(srcDate: Date | string, iso: boolean = false) {
    const date = new Date(srcDate);

    let year = date.getFullYear();
    let day: any = date.getDate();
    let month: any = date.getMonth() + 1;
    let hours: any = date.getHours();
    let minutes: any = date.getMinutes();
    let seconds: any = date.getSeconds();

    if (day < 10) { day = '0' + day; }
    if (month < 10) { month = '0' + month; }
    if (hours < 10) { hours  = '0' + hours; }
    if (minutes < 10) { minutes  = '0' + minutes; }
    if (seconds < 10) { seconds  = '0' + seconds; }

    let formattedDate: string;

    if (iso) {
      formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    } else {
      formattedDate = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
    }

    return formattedDate;
  }
}

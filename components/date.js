/*
* @Author: Mario Ravalli
* @Date:   2021-02-19 18:01:42
* @Last Modified by:   Mario Ravalli
* @Last Modified time: 2021-03-23 15:12:38
*/
import { parseISO, format } from 'date-fns'

export default function Date({ dateString }) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}><div className="text-right"><i>{format(date, 'LLLL d, yyyy')}</i></div></time>
}

/*
* @Author: Mario Ravalli
* @Date:   2021-02-19 18:01:42
* @Last Modified by:   Mario Ravalli
* @Last Modified time: 2021-02-21 00:13:05
*/
import { parseISO, format } from 'date-fns'

export default function Date({ dateString }) {
  const date = parseISO(dateString)
  return <time dateTime={dateString}><div className="text-center">{format(date, 'd LLLL')}</div><div className="text-center">{format(date, 'yyyy')}</div></time>
}

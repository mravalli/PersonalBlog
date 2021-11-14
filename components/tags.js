/*
* @Author: Mario Ravalli
* @Date:   2021-11-14 11:41:37
* @Last Modified by:   Mario Ravalli
* @Last Modified time: 2021-11-14 12:04:32
*/

export default function Tags({arrayTags}) {
  const tags = [];
  for (let tag of arrayTags) {
    tags.push(
      <span className="inline-block p-1 mb-2 mr-1 text-xs italic font-medium tracking-widest text-indigo-800 bg-indigo-200 rounded">
        #{tag}
      </span>
    )
  }
  return (tags)
}
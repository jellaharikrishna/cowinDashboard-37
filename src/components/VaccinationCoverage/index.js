import {BarChart, Bar, XAxis, YAxis, Legend} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {coverageData} = props

  const coverageDataFormatter = number => {
    if (number > 1000) {
      return `${(number / 1000).toString()}`
    }
    return number.toString()
  }

  return (
    <div className="vaccination-coverage-container">
      <h1 className="vaccination-coverage-heading">Vaccination Coverage</h1>
      <BarChart
        width={1000}
        height={300}
        data={coverageData}
        margin={{
          top: 5,
        }}
      >
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stroke: 'gray',
            strokeWidth: 0,
            fontFamily: 'Roboto',
          }}
        />
        <YAxis
          tickFormatter={coverageDataFormatter}
          tick={{
            stroke: 'gray',
            strokeWidth: 0,
            fontFamily: 'Roboto',
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 20,
            textAlign: 'center',
            fontSize: 12,
            fontFamily: 'Roboto',
          }}
        />
        <Bar
          dataKey="dose1"
          name="Dose 1"
          radius={[10, 10, 0, 0]}
          fill="#5a8dee"
          barSize="20%"
        />
        <Bar
          dataKey="dose2"
          name="Dose 2"
          radius={[5, 5, 0, 0]}
          fill="#f54394"
          barSize="20%"
        />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage

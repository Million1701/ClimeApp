import React from 'react'

const arr = []
const PronosticDates = ({ el, time, start, fin }) => {
    const openDesplize = (e) => {
        e.target.nextElementSibling.classList.toggle('open')
        if (e.target.nextElementSibling.classList.value.includes('open')) {
            if (arr.includes(e.target.nextElementSibling)) {
            } else {
                arr.push(e.target.nextElementSibling)
                arr.map((el, idx, array) => {
                    if (array.length > 1 && array.length !== -1) {
                        el.classList.remove("open")
                        return array.shift()
                    }
                })
            }
        }
    }

    return (
        <div className='week'>
            <h3 className="week__time" onClick={openDesplize}>{time}</h3>
            <div className='content__table close'>
                <table className='table'>
                    <tr className='table__thead'>
                        <th>Hours</th>
                        <th>Temp</th>
                        <th>Weather</th>
                        <th>Minimum Temp</th>
                        <th>Maximum Temp</th>
                        <th>Description</th>
                    </tr>
                    {el.main.map((element, i) => (element.hour >= start && element.hour <= fin && (
                        <tr key={i} className="table__tfoot">
                            <td>{element.hour}</td>
                            <td><img src={element.clime} alt="clime" /></td>
                            <td>{(element.temp - 273.15).toFixed(0)}°C</td>
                            <td>{(element.temp_min - 273.15).toFixed(1)}°C</td>
                            <td>{(element.temp_max - 273.15).toFixed(1)}°C</td>
                            <td>{element.description}</td>
                        </tr>
                    )
                    ))}
                </table>
            </div>
        </div>
    )
}

export default PronosticDates
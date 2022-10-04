import { useState } from 'react'
import { requestServer } from '../helper/requestServer';
import rain from "../Images/rain.png"
import clouds from "../Images/clouds-and-sun.png"

const API_KEY = "0484d0f8de9dcaf8924cc4324729015c";

const dias = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];

const date = new Date()

export const useResponse = () => {
    const [dato, setDato] = useState(null)
    const [datotwo, setDatotwo] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)
    const [textInicio, setTextInicio] = useState(true)
    const [background, setBackground] = useState("")

    const sendRequest = async (e, countryDate, setCountryDate, countrys) => {
        if (countryDate.country !== "") {
            e.preventDefault()
            const url = `https://api.openweathermap.org/data/2.5/weather?&q=${countryDate.country}&appid=${API_KEY}&lang=es`;
            const urltwo = `https://api.openweathermap.org/data/2.5/forecast?&q=${countryDate.country}&appid=${API_KEY}&lang=es`

            setTextInicio(false)
            setLoading(true)
            await requestServer(url)
                .then(res => {
                    if (!res.err) {
                        setDato(res)
                        setError(null)
                        if (date.getHours() >= 6 && date.getHours() < 12) {
                            setBackground("content-api-morning")
                            console.log(date.getHours())
                        } else if (date.getHours() >= 12 && date.getHours() < 18) {
                            setBackground("content-api-afternoon")
                        } else {
                            setBackground("content-api-evening")
                        }
                    } else {
                        setDato(null)
                        setError(res)
                    }

                })


            await requestServer(urltwo)
                .then(res => {
                    if (!res.err) {
                        res.list.map(el => {
                            const hour = el.dt_txt.slice(11, 16)
                            let day = new Date(el.dt_txt)
                            const nombreDia = dias[day.getDay()]
                            return [el.dt_txt = nombreDia,
                            el.main.hour = hour]
                        })

                        const fechas = []
                        const obj = {}

                        res.list.filter((el) => {
                            el.weather.map(ele => {
                                return [el.main["clime"] = ele.main === "Rain" ? rain : clouds,
                                el.main["description"] = ele.description]
                            })
                            return [
                                obj[el.dt_txt] ? false
                                    : obj[el.dt_txt] = {},
                                obj[el.dt_txt].day = el.dt_txt,
                                obj[el.dt_txt].main ? false : obj[el.dt_txt].main = [],
                                obj[el.dt_txt].main.push(el.main),
                            ]
                        })

                        for (const property in obj) {
                            fechas.push(obj[property])
                        }
                        setError(null)
                        setDatotwo(fechas)
                    } else {
                        setError(res)
                        setDatotwo(null)
                    }
                })
            setLoading(false)
            setCountryDate(countrys)
        } else {
            e.preventDefault()
        }
    }

    return {
        sendRequest,
        dato,
        datotwo,
        loading,
        error,
        textInicio,
        background,
    }
}



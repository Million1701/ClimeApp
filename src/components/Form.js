import React, { useState } from 'react'

const countrys = {
    country: ""
}

const Form = (props) => {
    const { sendRequest, background } = props
    const [countryDate, setCountryDate] = useState(countrys)
    if (background === "content-api-morning") {
        const form = document.querySelector('.form')
        form.style.border = "1px solid #000"
        form.querySelector(".form__search").style.color = "#000"

    } else if (background === "content-api-evening" || background === "content-api-afternoon") {
        const form = document.querySelector('.form')
        form.style.border = "1px solid #fff"
        form.querySelector(".form__search").style.color = "#fff"
    }


    const handleChange = (e) => {
        setCountryDate({
            [e.target.name]: e.target.value
        })
    }


    return (
        <form className='form' onSubmit={(e) => {
            sendRequest(e, countryDate, setCountryDate, countrys)
        }}>
            <input className='form__search' type="text" placeholder='Enter city' name="country" value={countryDate.country} onChange={handleChange} autoComplete="off" />
            <button className='form__submit' type="submit" value="" >{background === "content-api-morning" ?
                <lord-icon
                    src="https://cdn.lordicon.com/msoeawqm.json"
                    trigger="hover"
                    colors="primary:#000000,secondary:#C70039"
                    Style="width:30px;height:30px;cursor:Pointer">
                </lord-icon> :
                <lord-icon
                    src="https://cdn.lordicon.com/msoeawqm.json"
                    trigger="hover"
                    colors="primary:#ffffff,secondary:#C70039"
                    Style="width:30px;height:30px;cursor:Pointer">
                </lord-icon>}</button>
        </form>
    )
}

export default Form
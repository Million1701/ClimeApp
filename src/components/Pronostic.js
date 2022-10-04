import React from 'react'
import PronosticDates from './PronosticDates'
import luna from "../Images/fase-lunar.png"
import sun from "../Images/sun.png"
import sunset from "../Images/sunset.png"


const Pronostic = (props) => {
    const { currentClime, pronostic, loading, error, textInicio, background } = props

    return (
        <>
            {textInicio ?
                <div className='SearchCity'>
                    <h1>Search a City</h1>
                </div>
                :
                <>
                    {!loading ?
                        <div className={background} id='content__resApi'>
                            {currentClime && !error ?
                                <>
                                    <div>
                                        <h1 className='Text__city'>{currentClime.name}</h1>
                                        <div className='currentClime'>
                                            <h2 className='currentClime__temp'>{(currentClime.main.temp - 273.15).toFixed(0)}°C</h2>
                                            <h3 className='currentClime__temp__max'>{(currentClime.main.temp_max - 273.15).toFixed(0)}°/</h3>
                                            <h3 className='currentClime__temp__min'>{(currentClime.main.temp_min - 273.15).toFixed(0)}°</h3>
                                        </div>
                                    </div>

                                    <div className='pronostic'>
                                        <h2 className='pronostic__text'>Pronostic of {currentClime.name}</h2>
                                        <div style={{ display: 'flex', justifyContent: 'space-around' }}>{
                                            pronostic.map((el, idx) => (
                                                <div className="pronostic__week" key={idx}>
                                                    <h2 className='pronostic__week__day'>{el.day}</h2>
                                                    <>
                                                        <PronosticDates el={el} time={<img src={sun} alt="sun" className='icon-time' />} start="00:00" fin="09:00" />
                                                        <PronosticDates el={el} time={<img src={sunset} alt="sunset" className='icon-time' />} start="12:00" fin="18:00" />
                                                        <PronosticDates el={el} time={<img src={luna} alt="luna" className='icon-time' />} start="19:00" fin="21:00" />
                                                    </>
                                                </div>
                                            ))
                                        }</div>
                                    </div>
                                </>
                                : <h2 className='error'>Error in request</h2>
                            }
                        </div> : <div className='content__loader'><span className="loader"></span></div>}
                </>}
        </>
    )
}

export default Pronostic
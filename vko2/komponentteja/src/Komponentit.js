import React from 'react'

const Osa = (props) => <p>{props.osa} {props.tehtavia}</p>
const Otsikko = (props) => <h1>{props.kurssi.nimi}</h1>
const Sisalto = (props) => {
    const [osa1, osa2, osa3] = props.kurssi.osat

    return(
        <div>
            {props.kurssi.osat.map(a => <Osa key = {a.id} osa={a.nimi} tehtavia={a.tehtavia} />)}
        </div>
    )
}
const Yhteensa = (props) => {
    const tehtavat = []
    props.kurssi.osat.forEach(a => tehtavat[tehtavat.length] = a.tehtavia)

    return(
        <p>yhteensä {tehtavat.reduce((a, b) => a + b)} tehtävää</p>
    )
}

const Kurssi = (props) => {


    return (
        <div>
            <Otsikko kurssi={props.kurssi}/>
            <Sisalto kurssi = {props.kurssi} />
            <Yhteensa kurssi = {props.kurssi}  />
        </div>
    )
}

export default Kurssi
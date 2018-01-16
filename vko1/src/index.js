import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.nimi = 'Half Stack -sovelluskehitys'
        this.osat = [
                {
                    nimi: 'Reactin perusteet',
                    tehtavia: 10
                },
                {
                    nimi: 'Tiedonvälitys propseilla',
                    tehtavia: 7
                },
                {
                    nimi: 'Komponenttien tila',
                    tehtavia: 14
                }
            ]
        this.state = {
            hyvaa: 0,
            huonoa: 0,
            neutraalia: 0
        }
        this.plus = this.plus.bind(this)
        this.miinus = this.miinus.bind(this)
        this.nolla = this.nolla.bind(this)
        this.ka = 0
        this.pos = 0
        this.summa = 0
    }

    render() {
        return (
            <div>
                <Otsikko otsikko={'anna palautetta'}/>
                <Palaute funktio={this.liiallinenFunktio('pos')} nimi={'hyvä'}/>
                <Palaute funktio={this.liiallinenFunktio('kettu')} nimi={'neutraali'}/>
                <Palaute funktio={this.liiallinenFunktio('neg')} nimi={'huono'}/>
                <Otsikko otsikko={'statistiikka'}/>
                <Sisalto palaute={this}/>
            </div>
        )
    }

    liiallinenFunktio(state) {
        if (state === 'pos')
            return this.plus
        if (state === 'neg')
            return this.miinus
        return this.nolla
    }

    plus() {
        this.setState({hyvaa: this.state.hyvaa + 1})
    }

    miinus() {
        this.setState({huonoa: this.state.huonoa + 1})
    }

    nolla() {
        this.setState({neutraalia: this.state.neutraalia + 1})
    }

    avg = () => {
        return (this.state.hyvaa - this.state.huonoa) / (this.summa)
    }

    positive = () => { return (this.state.hyvaa / this.summa)*100 + "%"}
}

const Palaute = (props) => (
    <button onClick={props.funktio}> {props.nimi} </button>
)

const Otsikko = (props) => (
    <h1>{props.otsikko}</h1>
)

const Sisalto = (props) => {
    props.palaute.summa = props.palaute.state.hyvaa + props.palaute.state.huonoa + props.palaute.state.neutraalia
    if (props.palaute.summa === 0) {
        return (
        <div>
            <p>yhtään palautetta ei ole annettu</p>
        </div>
        )
    }
    props.palaute.ka = props.palaute.avg()
    props.palaute.pos = props.palaute.positive()
    return (
        <table>
            <tbody>
                <Stat osa={props.palaute.state.hyvaa} nimi={'hyvä'}/>
                <Stat osa={props.palaute.state.neutraalia} nimi={'neutraali'}/>
                <Stat osa={props.palaute.state.huonoa} nimi={'huono'}/>
                <Stat osa={props.palaute.ka} nimi={'keskiarvo'}/>
                <Stat osa={props.palaute.pos} nimi={'positiivisia'}/>
            </tbody>
        </table>
    )
}

const Stat = (props) => (
    <tr>
        <th>{props.nimi}</th>
        <th>{props.osa}</th>
    </tr>
)

ReactDOM.render(
    <App />,
    document.getElementById('root')
)
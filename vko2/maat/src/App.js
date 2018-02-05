import React, { Component } from 'react';
import axios from 'axios'


class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            filter: '',
            countries: [],
            superfilter: ''
        }
    }

    componentDidMount() {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                console.log(response.data)
                this.setState({countries: response.data})
            })
    }

    forcefilter(name) {
        this.setState({filter: name})
    }

    boundFilter = this.forcefilter.bind(this)

    filterme = (event) => {
        this.setState({filter: event.target.value})
    }
  render() {
    return (
      <div>
          find countries:
          <input value={this.state.filter} onChange={this.filterme} />
          <CountryList countries={this.state.countries} filter={this.state.filter} memes={this}/>
      </div>
    );
  }
}

const CountryList = (props) => {
    if (props.countries.length === 0)
        return (<div></div>)
    const filtered = props.countries.filter(country => country.name.toLowerCase()
        .includes(props.filter.toLowerCase()))
    if (filtered.length > 10)
        return (<div></div>)
    else if (filtered.length === 1) {
        console.log(filtered[0])
        return (<CountryInfo country={filtered[0]}/>)
    }
    else
        return (<CountryListed countries={filtered} memes={props.memes}/>)
}

const CountryListed = (props) => {
    return (
        <div>
            {props.countries.map(country => <p key={country.name} value={country.name}>{country.name}</p>)}
        </div>
    )
}

const CountryInfo = (props) => (
    <div>
        <h2>{props.country.name}</h2>
        <p>capital: {props.country.capital}</p>
        <p>population: {props.country.population}</p>
        <img src={props.country.flag} alt="lol"/>
    </div>


)

export default App;

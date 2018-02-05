import React from 'react'
import personService from './services'
import './App.css'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            persons: [],
            newName: '',
            newNumbah: '',
            filter: '',
            error: null
        }
    }

    addPerson = (event) => {
        event.preventDefault()
        if (this.state.persons.some(person => person.name === this.state.newName)) {
            if (window.confirm(this.state.newName + " on jo luettelossa, wat do")) {
                const personObject = {
                    name: this.state.newName,
                    number: this.state.newNumbah
                }
                personService.update(this.state.persons
                    .filter(person => person.name === this.state.newName)[0].id, personObject)
                    .then((response) => {
                        const persons = this.state.persons.concat(response.data)
                        personService.getAll().then((response) => this.setState({persons: response.data}))
                    })
                    .catch(error => {
                        personService.create(personObject)
                            .then(response => {
                                personService.getAll().then((response) => this.setState({persons: response.data}))
                                console.log(this.state.persons)
                                this.setState({newName: '', newNumbah: '', error: 'new people added'})
                            })
                    })
                this.setState({newName: '', newNumbah: '', error: 'people numbah change'})
            }
        } else {
            const personObject = {
                name: this.state.newName,
                number: this.state.newNumbah
            }
            personService.create(personObject)
                .then(response => {
                    personService.getAll().then((response) => this.setState({persons: response.data}))
                    console.log(this.state.persons)
                    this.setState({newName: '', newNumbah: '', error: 'new people added'})
                })

        }
        setTimeout(() => {
            this.setState({error: null})
        }, 5000)
    }

    handlePersonChange = (event) => {
        this.setState({newName: event.target.value})
    }

    handleNumbahChange = (event) => {
        console.log(event.target.value)
        this.setState({newNumbah: event.target.value})
    }

    filterme = (event) => {
        this.setState({filter: event.target.value})
    }

    componentDidMount() {
        personService.getAll()
            .then(response => {
                this.setState({persons: response.data})
            })
    }

    render() {
        return (
            <div>
                <h2>Puhelinluettelo</h2>
                <Notification message={this.state.error} />
                rajaa näytettäviä <input onChange={this.filterme} value={this.state.filter} />
                <h2>Lisää uusi</h2>
                <NewPerson newName={this.state.newName} newNumbah={this.state.newNumbah}
                           handlePersonChange={this.handlePersonChange}
                            handleNumbahChange={this.handleNumbahChange}
                           addPerson={this.addPerson}
                />
                <h2>Numerot</h2>
                <Persons persons={this.state.persons} filter={this.state.filter} />
            </div>
        )
    }
}

const Notification = (props) => {
    if (props.message === null) {
        return null
    }
    return (
        <div className="error">
            {props.message}
        </div>
    )
}

const NewPerson = (props) => (
    <form onSubmit={props.addPerson}>
        <div>
            nimi: <input value={props.newName} onChange={props.handlePersonChange} />
        </div>
        <div>
            numero: <input value={props.newNumbah} onChange={props.handleNumbahChange} />
        </div>
        <div>
            <button type="submit"> lisää </button>
        </div>
    </form>
)

const Persons = (props) => (
    <table>
      <tbody>
        {props.persons.filter(person => person.name.toLowerCase().includes(props.filter.toLowerCase()) || person.number.toLowerCase().includes(props.filter.toLowerCase())).map(person => <Person key={person.name} person={person} />)}
      </tbody>
    </table>
)

const Person = (props) => {
    const handleDelete = (event) => {
        console.log(props.person)
        if (window.confirm("poistetaanko " + props.person.name)) {
            personService.remove(props.person.id)
                .then((response) => {
                })
        }
    }
    return (
        <tr>
            <th>{props.person.name}</th>
            <th>{props.person.number}</th>
            <th><button value={props.person.id} onClick={handleDelete}> DELETE</button></th>
        </tr>
    )
}

export default App
import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            votes: [0,0,0,0,0,0],
            biggest: -1
        }
        this.nopanheitto = this.nopanheitto.bind(this)
        this.vote = this.vote.bind(this)
    }

    nopanheitto() {
        this.setState({selected: Math.floor((Math.random() * anecdotes.length))})
    }

    vote() {
        const temp = this.state.votes.slice()
        temp[this.state.selected]++
        if (temp[this.state.selected] > temp[this.state.biggest] || this.state.biggest === -1) {
            this.setState({biggest: this.state.selected})
        }
        this.setState({votes: temp})
    }

    render() {
        const tempanec = this.props.anecdotes.slice()
        const tempsel = this.state.selected
        const tempvot = this.state.votes.slice()
        const tempgirth= this.state.biggest
        return (
            <div>
                <Anecdote anecdotes={tempanec} number={tempsel} votes={tempvot} />
                <div>
                    <Button sos={this.vote} name={'vote'}/>
                    <Button sos={this.nopanheitto} name={'next anecdote'}/>
                </div>
                <h1>anecdote with most votes:</h1>
                <BiggestGirth anecdotes={tempanec} number={tempgirth} votes={tempvot} />
            </div>

        )
    }
}

const Anecdote = (props) => {
    return (
        <div>
        <p>
            {props.anecdotes[props.number]}
        </p>
            <p> has {props.votes[props.number]} votes</p>
        </div>
    )
}

const BiggestGirth = (props) => {
    if (props.number === -1) return ( <p>nothing has been voted on</p>)
    return (<Anecdote anecdotes={props.anecdotes} number={props.number} votes={props.votes}/>)
}


const Button = (props) => (
    <button onClick={props.sos}>{props.name}</button>
)

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]



ReactDOM.render(
    <App anecdotes={anecdotes} />,
    document.getElementById('root')
)
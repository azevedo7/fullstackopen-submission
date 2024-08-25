import anecdoteReducer from './anecdoteReducer'
import { voteAnecdote  } from './anecdoteReducer'
import deepFreeze from 'deep-freeze'

describe('anecdote reducer', () => {
    test('votes increase', () => {
        const initialState = [
            {
                content: 'this is an anecdote',
                id: 1,
                votes: 0
            }
        ]

        const action = voteAnecdote(1)
        deepFreeze(initialState)

        const newState = anecdoteReducer(initialState, action)

        expect(newState).toHaveLength(1)
        expect(newState).toContainEqual({
            content: 'this is an anecdote',
            id: 1,
            votes: 1
        })
    }) 
})
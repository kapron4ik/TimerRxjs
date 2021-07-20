import React from 'react'
import Button from './Button/Button'
import {StatusType} from '../App'

type PropsType = {
    status: StatusType
    time: number
    start: () => void
    stop: () => void
    reset: () => void
    wait: () => void
}

const Clock = (props: PropsType) => {

    const stringTime = new Date(props.time).toISOString().slice(11, 19)

    return (
        <div>
            <div>
                {stringTime}
            </div>

            <Button onClick={props.start}>{props.status === 'stop' ? 'start' : 'stop'}</Button>
            <Button onDoubleClick={props.wait}>wait</Button>
            <Button onClick={props.reset}>reset</Button>

        </div>
    )
}

export default Clock

import React, {useState} from 'react'
import Button from './Button/Button'

type PropsType = {
    time: number
    start: ()=>void
    stop: ()=>void
    reset: ()=>void
    wait: ()=>void
}

const Clock = (props: PropsType) => {

    const stringTime = new Date(props.time).toISOString().slice(11, 19)
       
    return (
        <div>
            <div>
                {stringTime}
            </div>

            <Button onClick={props.start}>start</Button>
            <Button onClick={props.stop}>stop</Button>
            <Button onClick={props.wait}>wait</Button>
            <Button onClick={props.reset}>reset</Button>

        </div>
    )
}

export default Clock

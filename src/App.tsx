import React, {useState, useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Clock from './component/Clock';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators'

type StateType = 'start' | 'stop' | 'wait'

const App = () => {
    const [state, setState] = useState<StateType>('stop')
    const [time, setTime] = useState<number>(0)

    useEffect (()=>{
        const unsubscribe$ = new Subject()
        interval(1000)
            .pipe(takeUntil(unsubscribe$))
            .subscribe(()=>{
                if (state === "start"){
                    setTime (val => val +1000)
                }
            })
        return () => {
            unsubscribe$.next('')
            unsubscribe$.complete()
        }
    }, [state])

    const start = () => {
        setState('start')
    }

    const stop = () => {
        setState('stop')
        setTime(0)
    }

    const reset = () => {
        setTime(0)
    }

    const wait = () => {
        setState('wait')
    }

    return (
        <>
            <Clock
            start={start}
            stop={stop}
            reset={reset}
            wait={wait}/>
        </>
    );
}

export default App;

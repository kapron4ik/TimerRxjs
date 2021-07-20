import * as React from 'react';
import {useEffect, useState} from "react";
import './App.css';
import Clock from './component/Clock';
import {interval, Subject, fromEvent} from "rxjs";
import {takeUntil, buffer, map, filter, debounceTime} from "rxjs/operators";


type StateType = 'start' | 'stop' | 'wait'

const App = () => {
    const [state, setState] = useState<StateType>('stop')
    const [time, setTime] = useState<number>(0)

    const stop$ = new Subject()
    // const click$ = fromEvent(document, 'click')
    const click$ = new Subject()
    const doubleClick$ = click$.pipe(
        buffer(()=>click$.debounce(300)),
        map(val => val.length),
        filter(val => val >= 2)
)


    useEffect(() => {
        // const unsubscribe$ = new Subject()

        let sub = interval(1000)
            .pipe(takeUntil(stop$))
            .pipe(takeUntil(doubleClick$))
            .subscribe(() => {
                if (state === "start") {
                    setTime(val => val + 1000)
                }
            })
        return () => {
            // unsubscribe$.next('')
            // unsubscribe$.complete()
            sub.complete()
        }
    }, [state])


    const start = () => {
        setState('start')
    }

    const stop = () => {
        stop$.next()
        setState('stop')
        setTime(0)
    }

    const reset = () => {
        setTime(0)
    }

    const wait = () => {
        setState('wait')
        click$.next()
    }

    return (
        <>
            <Clock
                time={time}
                start={start}
                stop={stop}
                reset={reset}
                wait={wait}/>
        </>
    );
}

export default App;

import * as React from 'react';
import {useEffect, useState, useMemo} from "react";
import './App.css';
import Clock from './component/Clock';
import {interval, Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";


export type StatusType = 'start' | 'stop'

const App = () => {
    const [status, setStatus] = useState<StatusType>('stop')
    const [time, setTime] = useState<number>(0)

    const stop$ = useMemo(() => new Subject(), []);

    useEffect(() => {
        let sub = interval(1000)
            .pipe(takeUntil(stop$))
            .subscribe(() => {
                if (status === "start") {
                    setTime(val => val + 1000)
                }
            })
        return () => {
            sub.complete()
        }
    }, [status, stop$])

    const start = () => {
        status === 'stop' ? setStatus('start') : stop()
    }

    const stop = () => {
        stop$.next()
        setStatus('stop')
        setTime(0)
    }

    const reset = () => {
        setTime(0)
    }

    const wait = () => {
        setStatus('stop')
        stop$.next()
    }

    return (
        <>
            <Clock
                status={status}
                time={time}
                start={start}
                stop={stop}
                reset={reset}
                wait={wait}/>
        </>
    );
}

export default App;

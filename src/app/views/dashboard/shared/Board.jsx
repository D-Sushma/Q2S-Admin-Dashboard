import React, { useState, useEffect } from 'react'
import { Box, Divider, Card, CardContent, Button } from '@mui/material';
import { H2, H4 } from 'app/components/Typography';
import moment from 'moment';
// import { Leaderboard } from './database';

export default function Board() {
    const weekend = [
        'M', 'T', 'W', 'TH', 'F', 'S', 'SU'
    ]
    // ----------DB FETCH------------------------------
    const [leaderBoard, setLeaderBoard] = useState([]);
    let [WeekendDate, setWeekendDate] = useState('')
    const [weekDisabled, setWeekDisabled] = useState(false)
    const currentDate = moment();
    const m = currentDate.weekday("WeekendDate")
    const mon = moment(m).format("YYYY-MM-DD")
    console.log('mon', mon)
    const date = moment(currentDate);
    const dow = date.day();
    console.log("dow", dow);
    const isWeekend = new Date().getDay() === 0 || new Date().getDay() === 6;
    console.log('isWeekend', isWeekend)

    const fetchLeaderBoardData = () => {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");


            var raw = JSON.stringify({
                // "today": "2023-05-29"
                // "today": currentDate,
                "today": WeekendDate,
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            console.log('Leader Board raw', raw)
            fetch('http://localhost:4000/leaderboard', requestOptions)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    // console.log('Leader Board', data);
                    setLeaderBoard(data.response);
                    // setWeekendDate('')

                });
        } catch (err) {
            console.log('err', err)
        }
    };
    useEffect(() => {
        // fetchLeaderBoardData();
        getDisabled();
    }, []);
    // ----------DB FETCH END-------------------------
    // const currentDate = moment();
    // const dates = [];
    // for (let i = 0; i < 7; i++) {
    //   dates.push(currentDate.format('YYYY-MM-DD'));
    //   currentDate.add(1, 'day');
    // }

    const getDayDetails = (day) => {
        // console.log('day', day)
        const currentDate = moment();
        const d = currentDate.weekday(day)
        const weekDay = moment(d).format("YYYY-MM-DD")
        setWeekendDate(weekDay)
        fetchLeaderBoardData();
    }
    const getDisabled = () => {
        const todayDate = moment().format("YYYY-MM-DD")
        const previous = moment().subtract(1, 'day');
        const yesterday = moment(previous).format("YYYY-MM-DD")
        const resultDate = yesterday <= todayDate
        setWeekDisabled(resultDate)
    }
    // const yesterday = moment().subtract(1, 'day');
    // const disablePastDt = current => {
    //     return current.isAfter(yesterday);
    // };

    // const onTuesday = () => {
    //     // const currentDate = moment();
    //     // const t = currentDate.weekday(2)
    //     // const tues = moment(t).format("YYYY-MM-DD")
    //     const tues = "2023-05-26"
    //     setWeekendDate(tues);
    //     // fetchLeaderBoardData();
    // }

    return (
        <>
            <div className="board">
                <Card>
                    <CardContent>
                        <H2 sx={{ mb: 1, textAlign: "center" }}>Leader Board</H2>
                        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }} >
                            <Button color="primary" variant='outlined' sx={{ mr: 1, p: 0 }}>GK</Button>
                            <Button color="primary" variant='outlined' sx={{ ml: 1, p: 0 }}>English</Button>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "center", mt: 2, width: "100%" }} >
                            <Button sx={{ color: "violet", fontWeight: "bold", m: 1, maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                                onClick={() => getDayDetails(1)}
                                // disabled={(dow === 1) || isWeekend}
                                // disabled={(dow === 1) && (dow <= 7)}
                                // disabled={disableFutureDt}
                                // disabled={(dow >= 1) || (dow <= 7)}
                                // disabled={(dow <= 1)}
                                disabled={(weekDisabled === false) ? true : false}
                            >
                                M
                            </Button>
                            <Button sx={{ color: "violet", fontWeight: "bold", m: 1, maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                                onClick={() => getDayDetails(2)}
                                // disabled={(dow === 2) || !isWeekend}
                                // disabled={(dow === 2) && (dow <= 7)}
                                // disabled={disableFutureDt}
                                // disabled={(dow >= 2) || (dow <= 7)}
                                // disabled={(dow <= 2)}
                                disabled={(weekDisabled === false) ? true : false}
                            >
                                T
                            </Button>
                            <Button sx={{ color: "violet", fontWeight: "bold", m: 1, maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                                onClick={() => getDayDetails(3)}
                                // disabled={dow === 3 || !isWeekend}
                                // disabled={(dow === 3) && (dow <= 7)}
                                // disabled={(dow <= 3)}
                                disabled={(weekDisabled === false) ? true : false}
                            >
                                W
                            </Button>
                            <Button sx={{ color: "violet", fontWeight: "bold", m: 1, maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                                onClick={() => getDayDetails(4)}
                                // disabled={dow < 4}
                                // disabled={(dow === 4) && (dow <= 7)}
                                // disabled={(dow <= 4)}
                                disabled={(weekDisabled === false) ? true : false}
                            >
                                T
                            </Button>
                            <Button sx={{ color: "violet", fontWeight: "bold", m: 1, maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                                onClick={() => getDayDetails(5)}
                                // disabled={dow < 5}
                                // disabled={(dow === 5) && (dow <= 7)}
                                // disabled={(dow <= 5)}
                                disabled={(weekDisabled === false) ? true : false}
                            >
                                F
                            </Button>
                            <Button sx={{ color: "violet", fontWeight: "bold", m: 1, maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                                onClick={() => getDayDetails(6)}
                                // disabled={dow < 6}
                                // disabled={(dow === 6) && (dow <= 7)}
                                // disabled={(dow <= 6)}
                                disabled={(weekDisabled === false) ? true : false}
                            >
                                S
                            </Button>
                            <Button sx={{ color: "violet", fontWeight: "bold", m: 1, maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                                onClick={() => getDayDetails(7)}
                                // disabled={dow < 7}
                                // disabled={(dow === 7) && (dow <= 7)}
                                // disabled={(dow <= 7)}
                                disabled={(weekDisabled === false) ? true : false}
                            >
                                S
                            </Button>
                        </Box>
                        <Box sx={{ mt: 3 }}>
                            {leaderBoard.map((value, i) => (
                                <>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1.5, ml: 2, mr: 2 }} >
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <img src="" alt="" />

                                            <div className="info">
                                                <H4 className='name text-dark'>{value.winner_id}</H4>
                                                <span>mumbai</span>
                                            </div>
                                        </Box>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <span>{value.score}</span>
                                        </Box>
                                    </Box>
                                    <Divider />
                                </>
                            ))}
                        </Box>
                    </CardContent>
                </Card>
            </div >
        </>
    )
}

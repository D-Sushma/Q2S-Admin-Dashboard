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
    const currentDate = moment();
    const m = currentDate.weekday("monday")
    const mon = moment(m).format("YYYY-MM-DD")
    console.log('mon', mon)
    const date = moment(currentDate);
    const dow = date.day();
    console.log("dow", dow);
    let [monday, setMonday] = useState('')
    const fetchLeaderBoardData = () => {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");


            var raw = JSON.stringify({
                // "today": "2023-05-29"
                // "today": currentDate,
                "today": monday,
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
                    // setMonday('')

                });
        } catch (err) {
            console.log('err', err)
        }
    };
    useEffect(() => {
        // const currentDate = moment();
        // const m = currentDate.weekday(1)
        // const mon = moment(m).format("YYYY-MM-DD")
        // setMonday(mon)
        // onMonday();
        // fetchLeaderBoardData();
    }, []);
    // ----------DB FETCH END-------------------------
    // const currentDate = moment();
    // const dates = [];
    // for (let i = 0; i < 7; i++) {
    //   dates.push(currentDate.format('YYYY-MM-DD'));
    //   currentDate.add(1, 'day');
    // }

    const getDayDetails = (day) => {
        console.log('day', day)
        const currentDate = moment();
        const m = currentDate.weekday(day)
        const mon = moment(m).format("YYYY-MM-DD")
        setMonday(mon)
        fetchLeaderBoardData();
    }
    const onTuesday = () => {
        // const currentDate = moment();
        // const t = currentDate.weekday(2)
        // const tues = moment(t).format("YYYY-MM-DD")
        const tues = "2023-05-26"
        setMonday(tues);
        // fetchLeaderBoardData();
    }
    // const onWednusday = () => {
    //     // const currentDate = moment();
    //     // const w = currentDate.weekday(3)
    //     // const wed = moment(t).format("YYYY-MM-DD")
    //     const wed = "2023-05-26"
    //     setMonday(wed);
    //     fetchLeaderBoardData();
    // }
    // const onThrusday = () => {
    //     // const currentDate = moment();
    //     // const t = currentDate.weekday(3)
    //     // const thurs = moment(t).format("YYYY-MM-DD")
    //     const thurs = "2023-05-26"
    //     setMonday(thurs);
    //     fetchLeaderBoardData();
    // }
    // const onFriday = () => {
    //     // const currentDate = moment();
    //     // const f = currentDate.weekday(3)
    //     // const fri = moment(t).format("YYYY-MM-DD")
    //     const fri = "2023-05-26"
    //     setMonday(fri);
    //     fetchLeaderBoardData();
    // }
    // const onSaturday = () => {
    //     // const currentDate = moment();
    //     // const s = currentDate.weekday(3)
    //     // const sat = moment(t).format("YYYY-MM-DD")
    //     const sat = "2023-05-26"
    //     setMonday(sat);
    //     fetchLeaderBoardData();
    // }
    // const onSunday = () => {
    //     // const currentDate = moment();
    //     // const s = currentDate.weekday(3)
    //     // const sun = moment(t).format("YYYY-MM-DD")
    //     const sun = "2023-05-26"
    //     setMonday(sun);
    //     fetchLeaderBoardData();
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
                            {/* {weekend.map((ele, i) => ( */}
                            <Button sx={{ color: "violet", fontWeight: "bold", m: 1, maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                                // key={i}
                                // value={monday}
                                onClick={() => getDayDetails(1)}
                                disabled={!1 < 1}
                            >
                                {/* {ele} */}
                                M
                            </Button>
                            {/* ))} */}
                            <Button sx={{ color: "violet", fontWeight: "bold", m: 1, maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                                onClick={() => getDayDetails(2)}
                                disabled={!2 < 2}
                            >
                                T
                            </Button>
                            <Button sx={{ color: "violet", fontWeight: "bold", m: 1, maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                                onClick={() => getDayDetails(3)}
                                disabled={dow < 3}
                            >
                                W
                            </Button>
                            <Button sx={{ color: "violet", fontWeight: "bold", m: 1, maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                                onClick={() => getDayDetails(4)}
                                disabled={dow < 4}
                            >
                                T
                            </Button>
                            <Button sx={{ color: "violet", fontWeight: "bold", m: 1, maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                                onClick={() => getDayDetails(5)}
                                disabled={dow < 5}
                            >
                                F
                            </Button>
                            <Button sx={{ color: "violet", fontWeight: "bold", m: 1, maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                                onClick={() => getDayDetails(6)}
                                disabled={dow < 6}
                            >
                                S
                            </Button>
                            <Button sx={{ color: "violet", fontWeight: "bold", m: 1, maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                                onClick={() => getDayDetails(7)}
                                disabled={dow < 7}
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

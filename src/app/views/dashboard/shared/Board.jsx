import React, { useState, useEffect } from 'react'
import { Box, Divider, Card, CardContent, Button } from '@mui/material';
import { H2, H4 } from 'app/components/Typography';
import moment from 'moment';
// import { Leaderboard } from './database';

export default function Board() {
    // ----------DB FETCH------------------------------
    const [leaderBoard, setLeaderBoard] = useState([]);
    let [WeekendDate, setWeekendDate] = useState('');
    const [subjectId, setSubjectId] = useState('');
    const [subject, setSubject] = useState('');
    const [active, setActive] = useState();
    const [dow, setDow] = useState('');

    // const currentDate = moment();
    // const date = moment(currentDate)
    // const dow = date.day()
    // console.log('dow1', dow)
    const fetchLeaderBoardData = () => {
        try {
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");


            var raw = JSON.stringify({
                // "today": "2023-05-29"
                "today": WeekendDate,
                "subId": subjectId,
            });

            var requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
            };
            // console.log('Leader Board raw', raw)
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

    // useEffect(() => {
    //     console.log('pev dow', dow)
    //     getDayDetails(dow - 1);
    // }, [dow]);

    useEffect(() => {
        const currentDate = moment();
        const date = moment(currentDate);
        setDow(date.day())
        getDayDetails(date.day() - 1);
        getSubjectIdDetails(13);
    }, []);
    // ----------DB FETCH END------------------------

    const getDayDetails = (day) => {
        const currentDate = moment();
        const date = currentDate.weekday(day)
        const weekDay = moment(date).format("YYYY-MM-DD")
        setWeekendDate(weekDay)
        setSubjectId(subject)
        setActive(day);
        fetchLeaderBoardData();
    }
    // console.log('subject', subject)
    const getSubjectIdDetails = (sub) => {
        console.log('sub', sub)
        setSubject(sub)
    }
    return (
        <>
            <div className="board">
                <Card>
                    <CardContent>
                        {console.log('subject', subject)}
                        <H2 sx={{ mb: 1, textAlign: "center" }}>Leader Board</H2>
                        <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }} >
                            <Button color="primary" variant={subject == 13 ? "contained" : 'outlined'} sx={{ mr: 1, p: 0 }}
                                onClick={() => getSubjectIdDetails(13)}
                            >GK</Button>
                            <Button color="primary" variant={(subject === 6) ? "contained" : 'outlined'} sx={{ ml: 1, p: 0 }}
                                onClick={() => getSubjectIdDetails(6)}
                            >English</Button>
                        </Box>
                        <Box sx={{ display: "flex", justifyContent: "center", mt: 2, width: "100%" }} >
                            <Button sx={{ color: active === 1 ? "violet" : "violet", border: active === 1 ? "1px solid violet" : "", fontWeight: "bold", m: 1, maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                                onClick={() => getDayDetails(1)}
                                disabled={(dow <= 1)}
                            >
                                M
                            </Button>
                            <Button sx={{ color: active === 2 ? "violet" : "violet", border: active === 2 ? "1px solid violet" : "", fontWeight: "bold", m: 1, maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                                onClick={() => getDayDetails(2)}
                                disabled={(dow <= 2)}
                            >
                                T
                            </Button>
                            <Button sx={{ color: active === 3 ? "violet" : "violet", border: active === 3 ? "1px solid violet" : "", fontWeight: "bold", m: 1, maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                                onClick={() => getDayDetails(3)}
                                disabled={(dow <= 3)}
                            >
                                W
                            </Button>
                            <Button sx={{ color: active === 4 ? "violet" : "violet", border: active === 4 ? "1px solid violet" : "", fontWeight: "bold", m: 1, maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                                onClick={() => getDayDetails(4)}
                                disabled={(dow <= 4)}
                            >
                                T
                            </Button>
                            <Button sx={{ color: active === 5 ? "violet" : "violet", border: active === 5 ? "1px solid violet" : "", fontWeight: "bold", m: 1, maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                                onClick={() => getDayDetails(5)}
                                disabled={(dow <= 5)}
                            >
                                F
                                {/* {alert("kjj")} */}
                            </Button>
                            <Button sx={{ color: active === 6 ? "violet" : "violet", border: active === 6 ? "1px solid violet" : "", fontWeight: "bold", m: 1, maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                                onClick={() => getDayDetails(6)}
                                disabled={(dow <= 6)}
                            >
                                S
                            </Button>
                            {/* <Button sx={{ color: active === 7 ? "white" : "violet", backgroundColor: active === 7 ? "violet" : "", fontWeight: "bold", m: 1, maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }} */}
                            <Button sx={{ color: active === 7 ? "white" : "violet", border: active === 7 ? "1px solid black" : "", backgroundColor: (active === 7) ? "violet" : "white", ":hover": { color: active === 7 ? "violet" : "" }, fontWeight: "bold", m: 1, maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                                onClick={() => getDayDetails(7)}
                                disabled={(dow <= 7)}
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

import React from 'react'
import { Box, Divider, Card, CardContent, Button } from '@mui/material';
import { H2, H4 } from 'app/components/Typography';
import { Leaderboard } from './database';

export default function Board() {
    const weekend = [
        'M', 'T', 'W', 'TH', 'F', 'S', 'SU'
    ]
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
                            {weekend.map((ele, i) => (
                                <Button sx={{ color: "violet", fontWeight: "bold", m: 1, maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }}
                                    key={i}>
                                    {ele}
                                </Button>
                            ))}
                        </Box>
                        <Box sx={{ mt: 3 }}>
                            {Leaderboard.map((value, i) => (
                                <>
                                    <Box sx={{ display: "flex", justifyContent: "space-between", mt: 1.5, ml: 2, mr: 2 }} key={i}>
                                        <Box sx={{ display: "flex", alignItems: "center" }}>
                                            <img src="" alt="" />

                                            <div className="info">
                                                <H4 className='name text-dark'>{value.name}</H4>
                                                <span>{value.location}</span>
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
            </div>
        </>
    )
}

import React from 'react'
import { Box, Button, Card, CardContent } from '@mui/material';
import { H3 } from 'app/components/Typography';
import { Leaderboard } from './database';

export default function Board() {
    const weekend = [
        'M', 'T', 'W', 'TH', 'F', 'ST', 'S'
    ]
    return (
        <>
            <div className="board">
                <Card>
                    <CardContent>
                        <H3 sx={{ mb: 1, textAlign: "center" }}>Leaderboard</H3>
                        <Box sx={{ display: "flex", justifyContent: "center" }} >
                            {weekend.map((ele, i) => (
                                <Button color='primary'>{ele}</Button>
                            ))}
                        </Box>
                        {Leaderboard.map((value, i) => (
                            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3, ml: 2, mr: 2 }} key={i}>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <img src="" alt="" />

                                    <div className="info">
                                        <h3 className='name text-dark'>{value.name}</h3>
                                        <span>{value.location}</span>
                                    </div>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center" }}>
                                    <span>{value.score}</span>
                                </Box>
                            </Box>
                        ))}
                    </CardContent>
                </Card>
            </div>
        </>
    )
}

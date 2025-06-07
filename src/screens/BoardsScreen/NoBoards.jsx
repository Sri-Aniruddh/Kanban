import { Stack, Typography } from '@mui/material';
import React from 'react'

const NoBoards = () => {


    return (
        <Stack textAlign={"center"} mt={15} spacing={1}>
            <Typography variant="h5" fontWeight={700}>No Boards created</Typography>
            <Typography>Create your first board today!</Typography>
        </Stack>
    )
}
export default NoBoards;
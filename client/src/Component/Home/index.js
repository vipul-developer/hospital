import React, { useMemo } from 'react';
import { Container,Grid } from '@mui/material';
import SearchDoctor from '../SearchDoctor';
const Home = () => {
    const searchDoctorMemo = useMemo(() => {
        return <SearchDoctor></SearchDoctor>;
    },[])
    return (
        <Container maxWidth="xl">
            <Grid container>
                <Grid item xs={12} sm={7}>
                    {searchDoctorMemo}
                </Grid>
            </Grid>
            Home Component
        </Container>
    );
};

export default Home;
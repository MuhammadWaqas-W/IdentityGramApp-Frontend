import React, { useEffect, useState } from 'react';
import { Box, Grid, Typography } from '@mui/material';
import { DashboardCard } from '../dashboard-card';
import NorthRoundedIcon from '@mui/icons-material/NorthRounded';
import { MyOdometer } from '../odometer';
import { SimpleLineChart } from '../simple-line-chart';
import router from 'next/router';
import { ApiPerformanceSummaryData } from '@constants';
import { useAppSelector } from '@hooks';

export const ApiPerformanceSummary = () => {
    const [apiPerformanceSummaryState, setApiPerformanceSummaryState] = useState(ApiPerformanceSummaryData);
    const { apisData, } = useAppSelector((store) => store.apis);
    useEffect(() => {
        const tempcountAndGraphData = apisData?.totalCounts;
        const countAndGraphData = apisData?.totalCounts ? [tempcountAndGraphData[2],tempcountAndGraphData[0],tempcountAndGraphData[1]] : [];
        setApiPerformanceSummaryState(apiPerformanceSummaryState.map((item,index) => ({...item,currentCount:countAndGraphData[index]?.[index === 0 ? 'total' : index === 1 ? 'success' : 'failed'],data:countAndGraphData[index]?.data})))
    }, [apisData])
    return (
        <>
            <Grid container sx={{justifyContent:'center'}} spacing={2}>
                {
                    apiPerformanceSummaryState.map(singlePerformanceSummary => <Grid key={singlePerformanceSummary.id} item xl={4} sm={6} xs={12}>
                        <DashboardCard>
                            <Grid container sx={{cursor:'pointer'}} onClick={()=>{router?.push({pathname:`apis/total-apis`,query: { hitType: singlePerformanceSummary.type },})}}>
                                <Grid item xs={6}>
                                    <Box sx={{ display: 'flex',gap:'12px' }}>
                                        <Box sx={{
                                            width: '44px', height: '44px', bgcolor: singlePerformanceSummary.bgColor, borderRadius: '8px', display: 'flex',
                                            justifyContent: 'center', alignItems: 'center',p:'10px 22px'
                                        }}>
                                            <NorthRoundedIcon sx={{ fontSize: '17px', color: singlePerformanceSummary.color,rotate: singlePerformanceSummary.id != 3 ? '0deg': '180deg' }} />
                                        </Box>
                                        <Box>
                                            <Typography variant='h4' color='primary.dark' sx={{whiteSpace:'nowrap'}}>{singlePerformanceSummary.name}</Typography>
                                            <Typography variant='subtitle1' color='primary.light' sx={{whiteSpace:'nowrap'}}>Overall Count</Typography>
                                        </Box>
                                    </Box>
                                    <Box sx={{ mt: '26px' }}>
                                        <MyOdometer value={singlePerformanceSummary.currentCount}  />
                                    </Box>
                                </Grid>
                                <Grid item xs={6}>
                                    <SimpleLineChart name={singlePerformanceSummary.name} max={apiPerformanceSummaryState[0].currentCount} color={singlePerformanceSummary.color} data={singlePerformanceSummary.data} />
                                </Grid>
                            </Grid>
                        </DashboardCard>
                    </Grid>)
                }
                
            </Grid>

        </>
    )
}

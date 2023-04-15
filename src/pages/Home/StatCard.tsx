import { IStatCardProps } from './types'
import { Grid, Paper } from '@mui/material';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import { Motion, spring } from 'react-motion';

export default function StatCard({ item }: IStatCardProps): JSX.Element {

    return (
        <Paper elevation={6} sx={{ width: '220px', height: '200px', margin: '10px 5px' }}>
            <Grid container direction="row" justifyContent="space-between" alignItems="center" className='stat-card-top' sx={{padding: '0 15px 0 5px'}}>
                <SentimentSatisfiedAltIcon fontSize='large' color='success' />
                <Motion defaultStyle={{ x: 0 }} style={{ x: spring(item.maxNumber, { stiffness: 50, damping: 20 }) }}>
                    {(value: { x: number; }) => <span className="page-header">{value.x.toFixed(0)}</span>}
                </Motion>
            </Grid>
            <p className="stat-card-content">{item.content}</p>
            <div style={{ marginTop: '20px' }}>
                <a href={item.redirectLink} className='stat-card-link'>Find out more »</a>
            </div>
        </Paper>
    )
}

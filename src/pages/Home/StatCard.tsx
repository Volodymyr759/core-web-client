import { IStatCardProps } from './types'
import { Grid, Paper } from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import PeopleIcon from '@mui/icons-material/People';
import { Motion, spring } from 'react-motion';

export default function StatCard({ item }: IStatCardProps): JSX.Element {

    const icons = [
        <SentimentSatisfiedAltIcon fontSize='large' style={{ color: 'rgb(27, 188, 163)' }} />,
        <EventNoteIcon fontSize='large' style={{ color: 'rgb(27, 188, 163)' }} />,
        <HeadphonesIcon fontSize='large' style={{ color: 'rgb(27, 188, 163)' }} />,
        <PeopleIcon fontSize='large' style={{ color: 'rgb(27, 188, 163)' }} />
    ]

    return (
        <Paper elevation={6} sx={{ width: '220px', height: '200px', margin: '10px 5px' }}>
            <Grid container direction="row" justifyContent="space-between" alignItems="center" className='stat-card-top' sx={{ padding: '0 15px 0 5px' }}>
                {icons[item.icon]}
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

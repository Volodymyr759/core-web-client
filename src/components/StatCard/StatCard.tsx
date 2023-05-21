import { IStatCardProps } from './types';
import { Motion, spring } from 'react-motion';
import { Box, Grid, Paper } from '@mui/material';
import EventNoteIcon from '@mui/icons-material/EventNote';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import PeopleIcon from '@mui/icons-material/People';
import { Link } from 'react-router-dom';
import "./styles.css";

export default function StatCard({ item }: IStatCardProps): JSX.Element {

    const icons = [
        <SentimentSatisfiedAltIcon fontSize='large' style={{ color: 'rgb(27, 188, 163)' }} />,
        <EventNoteIcon fontSize='large' style={{ color: 'rgb(27, 188, 163)' }} />,
        <HeadphonesIcon fontSize='large' style={{ color: 'rgb(27, 188, 163)' }} />,
        <PeopleIcon fontSize='large' style={{ color: 'rgb(27, 188, 163)' }} />
    ]

    return (
        <Paper elevation={6} className='stat-card' sx={{ overflow: 'hidden' }}>
            <Grid container direction="row" justifyContent="space-between" alignItems="center" className='stat-card-top' >
                {icons[item.icon]}
                <Motion defaultStyle={{ x: 0 }} style={{ x: spring(item.maxNumber, { stiffness: 50, damping: 20 }) }}>
                    {(value: { x: number; }) => <span className="page-header">{value.x.toFixed(0)}</span>}
                </Motion>
            </Grid>
            <p className="stat-card-content">{item.content}</p>
            <Box style={{ marginTop: '20px' }}>
                <Link to={item.redirectLink} className='stat-card-link'>Find out more »</Link>
            </Box>
        </Paper>
    )
}

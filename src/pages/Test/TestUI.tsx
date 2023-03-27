import { Grid, Typography } from '@mui/material';
import ErrorMessage from '../../components/Messages/ErrorMessage';
import { MessageAppearance } from '../../components/Messages/types';
import '../../index.css';

export default function TestUI(): JSX.Element {
//
    return (
        <>
            <div className='test-ui-page-header'>Tests of UI Components</div>
            <p>
                Design system: https://mui.com/
            </p>
            <br />
            <hr />
            <br />
            <ErrorMessage appearance={MessageAppearance.REGULAR}>Error of loading this Vacancy</ErrorMessage>
            <br />
            <hr />
            <br />
            <div className='test-page-header'>Grid:</div>
            <br />
            use <a href="https://mui.com/material-ui/react-grid/#interactive" target="_blank" rel="noreferrer">Interactive mui Grid</a>
            <br />
            <Grid container direction="column" justifyContent="center" alignItems="stretch">
                <p style={{ border: '1px solid black' }}>123</p>
                <p style={{ border: '1px solid black' }}>123</p>
                <Grid container direction="row" justifyContent="space-between" alignItems="center" >
                    <span style={{ border: '1px solid black' }}>123</span>
                    <span style={{ border: '1px solid black' }}>123</span>
                </Grid>
                <p style={{ border: '1px solid black' }}>123</p>
            </Grid>
            <div className='test-page-header'>Typography - Headers:</div>
            <br />
            <Typography variant="h4" component={'h4'} className="test-page-header">
                Page Header
            </Typography>
            <Typography variant="h5" component={'h5'} className="test-card-header">
                Card Header UPPERCASE
            </Typography>
            <hr />
            <div className='test-page-header'>Typography - Paragraphs:</div>
            <br />
            <Typography component={'p'} className="test-page-subheader" sx={{ textAlign: 'center' }}>
                Paragraph as subheader
            </Typography>
            <hr />
            <div className='test-page-header'>Typography - Spans:</div>
        </>
    )
}
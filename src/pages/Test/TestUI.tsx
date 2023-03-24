import { Typography } from '@mui/material';
import '../../index.css';

export default function TestUI(): JSX.Element {

    return (
        <>
            <div className='test-ui-page-header'>Tests of UI Components</div>
            <p>
                Design system: https://mui.com/
            </p>
            <br />
            <hr />
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
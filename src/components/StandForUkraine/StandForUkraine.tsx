import { Grid } from '@mui/material'
import './styles.css';

export default function StandForUkraine(): JSX.Element {
    return (
        // <div>
        //     <a href="https://war.ukraine.ua/support-ukraine/" target="_blank" rel='noreferrer'>
        //         <Grid
        //             container
        //             direction="row"
        //             justifyContent="center"
        //             alignItems="center"
        //         >
        //             <div className='flag'>
        //                 <div className="flag-line-blue"></div>
        //                 <div className="flag-line-yellow"></div>
        //             </div>
        //             <div className="stand-for-ua-text-wrapper">
        //                 <span className="stand-for-ua-main-text">
        //                     Stand in solidarity with the Ukrainian people against the Russian invasion.
        //                 </span>
        //                 <span className="stand-for-ua-help-text">Find out how you can help.</span>
        //             </div>
        //         </Grid>
        //     </a>
        // </div>
        <a href="https://war.ukraine.ua/support-ukraine/" target="_blank" rel='noreferrer' style={{ textDecoration: 'none' }}>
            <Grid container direction="row" justifyContent="center" alignItems="center">
                <div className='flag'>
                    <div className="flag-line-blue">
                        <p style={{ margin: '0', fontSize: '8px', color: 'white', lineHeight: '0.75rem', textAlign: "center" }}>
                            Stand in solidarity with the Ukrainian people against the Russian invasion.
                        </p>
                    </div>
                    <div className="flag-line-yellow">
                        <p style={{ margin: '0', fontSize: '8px', color: 'black', lineHeight: '0.75rem', textAlign: "center" }}>
                            Find out how you can help.
                        </p>
                    </div>
                </div>
            </Grid>
        </a>
    )
}

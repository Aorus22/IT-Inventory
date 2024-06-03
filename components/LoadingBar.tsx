import React from 'react';
import { LinearProgress } from '@mui/material';

const LoadingBar: React.FC = () => {
    return (
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: 100 }}>
            <LinearProgress color="primary" />
        </div>
    );
};

export default LoadingBar;
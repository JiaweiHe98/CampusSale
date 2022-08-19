import React from 'react';
import { Box } from '@mui/system';
import PropTypes from 'prop-types';

import './CalcContainer.css';

const CalcContainer = ({ children }) => {
  return <Box className="calc-container">{children}</Box>;
};

CalcContainer.protType = {
  children: PropTypes.node,
};

export default CalcContainer;

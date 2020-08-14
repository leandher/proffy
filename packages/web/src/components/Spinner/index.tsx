import React from 'react';
import { css } from '@emotion/core';
import ClipLoader from 'react-spinners/ClipLoader';

const override = css`
  display: block;
  margin: calc(100vh - 50%) auto;
  border-color: red;
`;

interface Props {
  isLoading: boolean;
}

const Spinner: React.FC<Props> = ({ isLoading }) => {
  return (
    <ClipLoader css={override} size={50} color="#8257E5" loading={isLoading} />
  );
};

export default Spinner;
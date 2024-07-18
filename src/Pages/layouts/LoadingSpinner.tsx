import { BeatLoader } from 'react-spinners';
import styled from 'styled-components';

const SpinnerWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const LoadingSpinner = () => {
    return (
        <SpinnerWrapper>
            <BeatLoader color='#633AE2' margin={5} size={15} />
        </SpinnerWrapper>
    );
};
export default LoadingSpinner;

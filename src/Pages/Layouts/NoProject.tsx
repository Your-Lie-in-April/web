import styled from 'styled-components';

const NoProjectContainer = styled.div`
  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
  height: 100%;
  flex-direction: column;
  gap: 4px;
  color: #888;
  margin: auto;
`;

const NoProject: React.FC = () => {
  return (
    <NoProjectContainer>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='160'
        height='160'
        viewBox='0 0 160 160'
        fill='none'
      >
        <path
          d='M67.5 120C67.5 120 72.5 115 80 115C87.5 115 92.5 120 92.5 120M145 80C145 115.9 115.9 145 80 145C44.1 145 15 115.9 15 80C15 44.1 44.1 15 80 15C115.9 15 145 44.1 145 80ZM115 90C115 91.3261 114.473 92.5979 113.536 93.5355C112.598 94.4732 111.326 95 110 95C108.674 95 107.402 94.4732 106.464 93.5355C105.527 92.5979 105 91.3261 105 90C105 88.6739 105.527 87.4021 106.464 86.4645C107.402 85.5268 108.674 85 110 85C111.326 85 112.598 85.5268 113.536 86.4645C114.473 87.4021 115 88.6739 115 90ZM55 90C55 91.3261 54.4732 92.5979 53.5355 93.5355C52.5979 94.4732 51.3261 95 50 95C48.6739 95 47.4021 94.4732 46.4645 93.5355C45.5268 92.5979 45 91.3261 45 90C45 88.6739 45.5268 87.4021 46.4645 86.4645C47.4021 85.5268 48.6739 85 50 85C51.3261 85 52.5979 85.5268 53.5355 86.4645C54.4732 87.4021 55 88.6739 55 90Z'
          stroke='#D9D9D9'
          strokeWidth='10'
          strokeLinecap='round'
          strokeLinejoin='round'
        />
      </svg>
      <div
        style={{
          color: '#D9D9D9',
          fontSize: '28px',
          fontWeight: '400',
          fontStyle: 'normal',
          fontFamily: 'Pretendard',
        }}
      >
        No Project
      </div>
    </NoProjectContainer>
  );
};

export default NoProject;

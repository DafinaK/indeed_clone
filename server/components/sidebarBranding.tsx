import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const SidebarBranding: React.FC<{}> = () => {
  const StyledLink = styled(Link)`
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    text-decoration: none;
    padding: 48px 32px 12px 32px;

    &:hover h1 {
      color: #3040d6;
    }
  `;

  const StyledH1 = styled.h1`
    font-weight: bolder;
    font-size: 24px;
    color: #000;
    max-width: 170px;
  `;

  return (
    <>
      <StyledLink to={'/admin'} data-css='sidebar-logo' style={{ display: 'flex', justifyContent: 'space-evenly' }}>
        <img width='50px' style={{ borderRadius: '50%' }} src={'http://localhost:5000/mainLogo.png'} alt='Logo' />
        <StyledH1>{'Indeed Clone'}</StyledH1>
      </StyledLink>
      <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '0px 44px 48px 44px' }}>
        <a style={{ color: 'blue', float: 'right', fontSize: '16px' }} href='http://localhost:3000/'>
          Go to main page
        </a>
      </div>
    </>
  );
};

export default SidebarBranding;

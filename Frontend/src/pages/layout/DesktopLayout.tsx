import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import NotSupportDevice from 'components/DesktopLayout/NotSupportDevice';

const DesktopLayout = ({ children }: { children: React.ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [logoSize, setLogoSize] = useState<number>(100);

  useEffect(() => {
    if (!ref.current) return;
    if (ref.current.clientWidth >= 700) return setLogoSize(120);
    if (ref.current.clientWidth >= 1000) return setLogoSize(180);
  }, [ref.current?.clientWidth]);

  return (
    <Wrapper ref={ref}>
      <LeftContent></LeftContent>
      <ViewContent>{children}</ViewContent>
      <NotSupportDevice />
      <RightContent></RightContent>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  @media screen and (min-width: 768px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: #e4f7ea;
  }
`;

const LeftContent = styled.div`
  display: none;
  @media screen and (min-width: 768px) {
    background-color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 45%;
    height: calc(100% - 48px);
    max-height: 852px;
  }
`;

const ViewContent = styled.div`
  width: 100vw;
  height: 100%;
  max-height: 852px;
  background-color: lightblue;
  overflow: scroll;
  @media screen and (min-width: 768px) {
    max-width: 414px;
  }
  @media screen and (max-width: 320px) {
    display: none;
  }
  @media screen and (max-height: 550px) {
    display: none;
  }
`;

const RightContent = styled.div`
  display: none;
  @media screen and (min-width: 768px) {
    background-color: white;
    display: flex;
    flex-direction: row;
    width: calc(45% - 414px);
    height: calc(100% - 48px);
    max-height: 852px;
  }
`;

export default DesktopLayout;

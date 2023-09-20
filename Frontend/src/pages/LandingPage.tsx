import styled from 'styled-components';
import { customize } from '@style/colors';
import { LogoMain, LogoSad, LogoSub } from '@style/icons';
import { useEffect, useRef, useState } from 'react';

const Container = styled.div`
  width: 100%;
  height: 100%;
  color: ${customize.slate['900']};
`;

const Page = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
`;

const BackGround = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  .balloon {
    background-image: url('/images/balloon.png');
    background-repeat: no-repeat;
    background-size: 20%;
  }
  .green {
    background-image: url('/images/green.png');
    background-repeat: no-repeat;
    background-size: 30%;
    background-position: 100% 0;
  }
  .blue {
    background-image: url('/images/blue.png');
    background-repeat: no-repeat;
    background-size: 30%;
    background-position: 0 100%;
  }
  .yellow {
    background-image: url('/images/yellow.png');
    background-repeat: no-repeat;
    background-size: 30%;
    background-position: 100% 100%;
  }
  .first {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

const BackGroundFix = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
`;

const CharacterWrapper = styled.div`
  width: 10rem;
  height: 10rem;
  box-shadow: ${({ theme }) => theme.shadow.lg};
  border-radius: 2rem;
  svg {
    width: 10rem;
    height: 10rem;
  }
`;

const DetailContainer = styled.div`
  width: 100%;
  height: 15%;
  padding: 5%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  position: relative;
`;

export default function LandingPage() {
  const [position, setPosition] = useState<number>(0);
  const targetRef = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    if (targetRef.current) {
      console.log(targetRef.current.scrollTop);
      setPosition(targetRef.current.scrollTop);
    }
  };

  useEffect(() => {
    targetRef.current?.addEventListener('scroll', onScroll);

    return () => {
      targetRef.current?.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <Container>
      <Page>
        <BackGround>
          <BackGroundFix className="first">
            <DetailContainer
              style={{
                opacity: `${1 - position / 200}`,
                left: `-${position / 3}px`,
              }}
            >
              <CharacterWrapper>
                <LogoSub />
              </CharacterWrapper>
              책벌래는 어떤 독서기록장이야?
            </DetailContainer>
            <DetailContainer
              style={{
                opacity: `${1 - (position - 85) / 200}`,
                left: `${position >= 85 ? `${position / 3}px` : 0}`,
              }}
            >
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>간단하게 기록할 수 있는 기록장이야!</span>
                <span>중요하든 중요치 않든 뭐든지 기록만 하면돼</span>
              </div>

              <CharacterWrapper>
                <LogoMain />
              </CharacterWrapper>
            </DetailContainer>
            <DetailContainer>
              <CharacterWrapper>
                <LogoSub />
              </CharacterWrapper>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>다른 기록장이랑 뭐가 다른데 ?</span>
              </div>
            </DetailContainer>
            <DetailContainer>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <span>다른 사람들이 남긴 기록들을 서로 볼 수 있어</span>
              </div>
              <CharacterWrapper>
                <LogoSad />
              </CharacterWrapper>
            </DetailContainer>
            <DetailContainer>
              <CharacterWrapper>
                <LogoSub />
              </CharacterWrapper>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '100%',
                }}
              >
                <span>그게 다야 ?</span>
              </div>
            </DetailContainer>
          </BackGroundFix>
          <BackGroundFix className="bg_fix balloon" />
          <BackGroundFix className="bg_fix green" />
        </BackGround>
        <BackGround>
          <BackGroundFix className="bg_fix blue" />
          <BackGroundFix className="bg_fix yellow" />
        </BackGround>
      </Page>
    </Container>
  );
}

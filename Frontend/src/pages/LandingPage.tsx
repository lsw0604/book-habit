import styled from 'styled-components';
import { useRef, useState, useEffect } from 'react';
import { customize } from '@style/colors';
import { IconOpenEye, LogoMain, LogoSub } from '@style/icons';
import Button from 'components/common/Button';

const Container = styled.div<{ position: number }>`
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  color: ${customize.slate['900']};

  .page {
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .img_diamond {
      width: 20%;
      height: 10%;
      background-image: url('../../public/images/Layer_1.png');
      background-repeat: no-repeat;
      background-position: 100% 0;
      background-size: contain;
    }
    .img_smuggle {
      width: 20%;
      height: 10%;
      background-image: url('../../public/images/Layer_2.png');
      background-repeat: no-repeat;
      background-position: 0;
      background-size: contain;
    }
    .img_rainbow {
      width: 20%;
      height: 20%;
      background-image: url('../../public/images/Layer_1-1.png');
      background-repeat: no-repeat;
      background-position: 0 100%;
      background-size: contain;
      opacity: ${({ position }) => Number(780 - position) / 780};
    }
    .img_container {
      width: 100%;
      height: 20%;
      display: flex;
      .top.right {
        width: 100%;
        background-image: url('../../public/images/Group 2.png');
        background-repeat: no-repeat;
        background-position: 100% 0;
        background-size: contain;
      }
      .top.left {
        width: 100%;
        background-image: url('../../public/images/Vector.png');
        background-repeat: no-repeat;
        background-position: 0;
        background-size: contain;
      }
      .middle {
        width: 40%;
        background-image: url('../../public//images/smiley.png');
        background-repeat: no-repeat;
        background-position: 0;
        background-size: contain;
      }
      .bottom.left {
        width: 100%;
        background-image: url('../../public/images/blue.png');
        background-repeat: no-repeat;
        background-position: 0;
        background-size: contain;
      }
      .bottom.right {
        width: 100%;
        background-image: url('../../public/images/yellow.png');
        background-repeat: no-repeat;
        background-position: 100%;
        background-size: contain;
      }
    }

    .content {
      display: flex;
      flex-direction: column;
      width: 100%;
      padding: 0 5%;
      gap: 1rem;
    }

    .content.title {
      height: 10%;
      font-size: 40px;
    }

    .logo_wrapper {
      box-shadow: ${({ theme }) => theme.shadow.lg};
      border-radius: 3rem;
      width: 40%;
      svg {
        width: 100%;
      }
    }

    .description {
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 20px;
    }
  }
`;

export default function LandingPage() {
  const [position, setPosition] = useState<number>(0);

  const contRef = useRef<HTMLDivElement>(null);

  const onScroll = () => {
    if (contRef.current) {
      console.log(contRef.current.scrollTop);
      setPosition(contRef.current.scrollTop);
    }
  };

  useEffect(() => {
    contRef.current?.addEventListener('scroll', onScroll);
    return () => {
      contRef.current?.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <Container position={position} ref={contRef}>
      <div className="page">
        <div className="img_container">
          <div className="top left" />
          <div className="top right" />
        </div>
        <div className="content title">
          <span>간단하게 사용하는 </span>
          <span>독서기록장</span>
          <span>책벌래?</span>
        </div>
        <div className="img_rainbow" />
      </div>
      <div className="page">
        <div className="img_container">
          <div className="bottom left" />
          <div className="bottom right" />
        </div>
        <div className="img_container"></div>
        <div className="img_smuggle" />
        <div className="img_diamond" />
        <div className="img_smuggle" />
      </div>
    </Container>
  );
}

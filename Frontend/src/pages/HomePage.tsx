import { customize } from '@style/colors';
import Button from 'components/common/Button';
import { useEffect, useRef, useState, createRef, RefObject } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  color: ${customize.slate['900']};

  .first {
    background-image: url('../../public/images/img_landing_first_bg.webp');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    display: flex;

    .title_box {
      font-size: 40px;
      line-height: 42px;
      margin-bottom: 8px;
    }

    .title_p {
      font-size: 36px;
      line-height: 40px;
      margin-bottom: 8px;
      display: inline-flex;
    }

    .first_box {
      @media screen and (min-width: 1280px) {
        padding-left: 10rem;
      }
    }

    .description_p {
      color: rgba(0, 0, 0, 0.5);
      font-weight: 400;
      margin-bottom: 8px;
    }

    .btn-wrapper {
      width: 100px;
    }
  }

  .second {
  }

  .third {
  }

  .last {
    background-image: url('../../public//images//img_landing_last_bg.webp');
    background-repeat: no-repeat;
    background-size: cover;
  }
`;

const Page = styled.div`
  height: 100%;
  width: 100%;
  scroll-snap-align: start;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const HomePage = () => {
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
    <Container ref={contRef}>
      <Page className="first">
        <div className="first_box">
          <h1 className="title_box">가볍게 사용하는 독서기록장</h1>
          <p className="title_p">
            <p>책벌래</p>입니다.
          </p>
          <p className="description_p">
            책벌레와 의지를 나타내는 어미 -래의 합성어 책벌래는
          </p>
          <p className="description_p">
            이름처럼 책벌레가 되고픈 사람들을 겨냥한 독서기록장입니다.
          </p>
          <p className="description_p">
            하지만 책벌레가 되기 위해 비장한 각오는 필요하지 않습니다.
          </p>
          <p className="description_p">
            이름처럼 책벌레가 되고픈 사람들을 겨냥한 독서기록장입니다.
          </p>

          <div className="btn-wrapper">
            <Button>시작하기</Button>
          </div>
        </div>
      </Page>
      <Page>
        <h3>책벌레 처럼 아니더라도 꾸준히 읽고 기록하다 보면</h3>
        <h3>습관처럼 굳게 될거니까요</h3>
      </Page>
      <Page>
        <h3>책볼레는 완독이 아니더라도</h3>
        <h3>읽지도 않았더라도</h3>
        <h3>한글자 읽었더라도</h3>
        <h3>의지를 나타내는 어미 -래 처럼</h3>
        <h3>하고자 하는 마음을 중요하게 생각합니다.</h3>
      </Page>
      <Page className="last">
        <h3>간단한 회원가입으로 로그인해서 책볼래를 이용해 주세요.</h3>
      </Page>
    </Container>
  );
};

export default HomePage;

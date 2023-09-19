import { customize } from '@style/colors';
import Button from 'components/common/Button';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  width: 100%;
  height: 100%;
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  color: ${customize.slate['900']};
`;

const Page = styled.div`
  height: 100%;
  width: 100%;
  scroll-snap-align: start;
  padding: 10%;
  .first_page {
    width: 100%;
    height: 100%;
    /* background-image: url('../../public/images/img_landing_first_bg.webp'); */
    background-size: 100% 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);

    .first_page_box {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      /* align-items: center; */
      flex-direction: column;
    }

    .first_page_box.left {
      width: 100%;
      height: 100%;
    }
    .first_page_box.left {
    }
  }

  .second_page {
  }

  .third_page {
  }

  .last_page {
  }
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
      <Page>
        <div className="first_page">
          <div className="first_page_box left"></div>
          <div className="first_page_box right"></div>
        </div>
      </Page>
      <Page className="second_page"></Page>
      <Page className="third_page"></Page>
      <Page className="last"></Page>
    </Container>
  );
};

export default HomePage;

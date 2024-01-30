import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';

import Loader from 'components/common/Loader';
import ImageWrapper from 'components/common/image-wrapper';
import Divider from 'components/common/Divider';
import Icon from 'components/common/Button/Icon';
import HelmetProvider from 'components/common/HelmetProvider';

import { IconBookMark, IconPencil, IconPlus, IconTrashCan } from '@style/icons';
import useMyBookPageQueries from '@queries/myBook/useMyBookPageQueries';
import { customize } from '@style/colors';
import { modalAtom } from 'recoil/modal';
import { myBookAtom } from 'recoil/myBook';
import Button from 'components/common/Button';

interface IProps {
  users_books_id: number;
}

const Container = styled.div`
  height: auto;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const SubContainer = styled.div`
  display: flex;
  width: 100%;
`;

const DetailContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 57%;
  color: ${({ theme }) => theme.mode.typo_main};
`;

const ImageContainer = styled.div`
  width: 40%;
  height: 100%;
  display: flex;
  justify-content: center;
  position: relative;
`;

const LoaderWrapper = styled.div`
  width: 100%;
  min-height: 190px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  border-radius: 1rem;
  box-shadow: ${({ theme }) => theme.shadow.md};
  background-color: ${({ theme }) => theme.mode.sub};
`;

const Publisher = styled.h2`
  font-size: 10px;
  color: rgba(0, 0, 0, 0.4);
`;

const Authors = styled.h3`
  font-size: 11px;
  color: rgba(0, 0, 0, 0.4);
`;

const Title = styled.h1`
  width: 100%;
  font-size: 20px;
  font-weight: 700;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`;

const Description = styled.p`
  font-size: 12px;
  width: 100%;
  font-weight: 700;
  line-height: 20px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  line-height: 25px;
  overflow: hidden;
  -webkit-line-clamp: 4;
  height: 100px;
  white-space: pre-line;
`;

const A = styled.a`
  font-size: 10px;
  width: auto;
  color: inherit;
  &:visited {
    color: ${({ theme }) => theme.mode.typo_main};
  }
`;

const DetailHeader = styled.div`
  display: flex;
`;

const DetailHeaderInfo = styled.div`
  width: 80%;
`;

const DetailHeaderIconWrapper = styled.div`
  width: 20%;
  display: flex;
  justify-content: end;
`;

const BookMarkWrapper = styled.div`
  width: 120px;
  height: 174px;
  position: absolute;
  svg {
    position: absolute;
    right: 10px;
    height: 1.5rem;
    fill: ${customize.yellow['300']};
  }
`;

const ButtonContainer = styled.div`
  padding: 1rem 1rem 0 1rem;
  display: flex;
  gap: 1rem;
`;

export default function MyBookDetailInfoBox({ users_books_id }: IProps) {
  const { myBookInfoData, myBookInfoIsLoading } =
    useMyBookPageQueries(users_books_id);
  const setModalState = useSetRecoilState(modalAtom);
  const setMyBookState = useSetRecoilState(myBookAtom);

  const modalHandler = () => {
    setMyBookState((prev) => ({
      ...prev,
      users_books_id,
    }));
    setModalState({ isOpen: true, type: 'deleteMyBook' });
  };

  if (!myBookInfoData || myBookInfoIsLoading) {
    return (
      <LoaderWrapper>
        <Loader />
      </LoaderWrapper>
    );
  }

  const { title, thumbnail, publisher, authors, contents, url } =
    myBookInfoData.result;

  return (
    <HelmetProvider
      title={title}
      description="해당 책의 정보를 보여주는 페이지입니다."
    >
      <Container>
        <SubContainer>
          <ImageContainer>
            <ImageWrapper
              src={thumbnail}
              alt={title}
              height={174}
              width={120}
            />
            <BookMarkWrapper>
              <IconBookMark />
            </BookMarkWrapper>
          </ImageContainer>
          <DetailContainer>
            <DetailHeader>
              <DetailHeaderInfo>
                <Publisher>{publisher}</Publisher>
                <Title>{title}</Title>
                <Authors>{authors}</Authors>
              </DetailHeaderInfo>
            </DetailHeader>
            <Divider divider={2} />
            {contents == '' ? (
              <Description>등록된 정보가 없습니다.</Description>
            ) : (
              <Description>{contents} ...</Description>
            )}
            <A href={url} target="_blank" rel="noreferrer">
              더보기
            </A>
          </DetailContainer>
        </SubContainer>
        <ButtonContainer>
          <Button icon={<IconPlus />} text>
            태그
          </Button>
          <Button icon={<IconPencil />} text>
            한줄평
          </Button>
          <Icon onClick={modalHandler} icon={<IconTrashCan />}>
            Delete
          </Icon>
        </ButtonContainer>
      </Container>
    </HelmetProvider>
  );
}

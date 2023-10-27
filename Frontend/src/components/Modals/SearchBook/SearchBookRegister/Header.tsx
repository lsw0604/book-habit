import { customize } from '@style/colors';
import ImageWrapper from 'components/common/ImageWrapper';
import { useRecoilValue } from 'recoil';
import { searchBookAtom } from 'recoil/searchBook';
import styled from 'styled-components';
import { v4 } from 'uuid';

const Container = styled.div`
  height: 190px;
  width: 100%;
  display: flex;
  flex-direction: row;
  gap: 1rem;
`;

const HeaderImageWrapper = styled.div`
  width: 120px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeaderDetailContainer = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const HeaderDetailTitle = styled.h1`
  font-size: 20px;
  line-height: 22px;
  color: ${({ theme }) => theme.colors.sub};
  height: auto;
`;

const HeaderDetailAnchor = styled.a`
  height: auto;
  color: ${customize.gray['400']};
  font-size: 12px;
  line-height: 16px;
  margin-bottom: 8px;
  &:hover {
    color: ${({ theme }) => theme.colors.spinner};
  }
`;

const HeaderDetailDescription = styled.span`
  height: 100px;
  font-size: 16px;
  line-height: 20px;
  color: ${({ theme }) => theme.mode.typo_main};
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 5;
  white-space: pre-line;
`;

export default function SearchRegisterHeader() {
  const { url, title, thumbnail, contents } = useRecoilValue(searchBookAtom);

  return (
    <Container>
      <HeaderImageWrapper>
        <ImageWrapper src={thumbnail} alt={v4()} height={174} width={120} />
      </HeaderImageWrapper>
      <HeaderDetailContainer>
        <HeaderDetailTitle>{title}</HeaderDetailTitle>
        <HeaderDetailDescription>{contents}</HeaderDetailDescription>
        <HeaderDetailAnchor target="_blank" href={url}>
          더보기
        </HeaderDetailAnchor>
      </HeaderDetailContainer>
    </Container>
  );
}

import useCommentsLikeListQuery from '@queries/comments/useCommentsLikeListQuery';
import { customize } from '@style/colors';
import { IconCalendar, IconHeart, IconStar } from '@style/icons';
import Divider from 'components/common/Divider';
import dayjs from 'dayjs';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  gap: 8px;
  padding: 1rem;
  width: 100%;
  height: 100%;
  min-height: 170px;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.mode.sub};
  border-radius: 5px;
  cursor: pointer;
  box-shadow: ${({ theme }) => theme.shadow.lg};
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const HeaderInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const HeaderIconContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const Status = styled.h3`
  color: ${({ theme }) => theme.mode.typo_main};
  font-size: 18px;
  svg {
    margin-left: 8px;
    height: 0.8rem;
  }
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
  color: ${({ theme }) => theme.mode.typo_main};
`;

const Comment = styled.span`
  font-size: 20px;
`;

const HeartContainer = styled.div`
  border: 2px solid red;
  height: 10%;
  width: 100%;
  svg {
    width: 1rem;
  }
`;

const DateWrapper = styled.span`
  color: ${({ theme }) => theme.mode.typo_sub};
  font-size: 10px;
  svg {
    fill: ${({ theme }) => theme.mode.typo_sub};
  }
`;

const RatingBox = styled.div`
  display: flex;
  align-items: center;
`;

const IconBox = styled.div`
  display: flex;
  gap: 1rem;
  height: 60%;
  border-radius: 50px;
  padding: 5px 10px;
  background-color: ${({ theme }) => theme.mode.sub};
  color: ${({ theme }) => theme.mode.typo_main};
  box-shadow: ${({ theme }) => theme.shadow.md};
  svg {
    height: 100%;
    fill: ${customize.yellow['400']};
  }
`;

export default function PublicCommentsItem({
  comment,
  comment_id,
  created_at,
  name,
  rating,
  title,
}: CommentsItemType) {
  const { data, isLoading, isFetching } = useCommentsLikeListQuery(comment_id);
  const createdTime = dayjs(created_at).format('YYYY/MM/DD HH:mm:ss');
  return (
    <Container>
      <Header>
        <HeaderInfoContainer>
          <Status>{title}</Status>
          <DateWrapper>
            <IconCalendar />
            &nbsp;{createdTime}
            &nbsp;{name}
          </DateWrapper>
        </HeaderInfoContainer>
        <HeaderIconContainer>
          <IconBox>
            <IconStar />
            <RatingBox>{rating}</RatingBox>
          </IconBox>
        </HeaderIconContainer>
      </Header>
      <Divider divider={2} />
      <Content>{comment}</Content>
      <Divider divider={2} />
      <HeartContainer></HeartContainer>
    </Container>
  );
}

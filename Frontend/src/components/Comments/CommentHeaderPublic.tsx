import { customize } from '@style/colors';
import { IconCalendar, IconStar } from '@style/icons';
import Avatar from 'components/common/Avatar';
import dayjs from 'dayjs';
import styled from 'styled-components';

interface IProps {
  item: Omit<
    CommentsItemType,
    'comment' | 'comment_id' | 'age_category' | 'gender'
  >;
}

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const HeaderInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 70%;
`;

const HeaderInfoContainerTitleWrapper = styled.h3`
  color: ${({ theme }) => theme.mode.typo_main};
  font-size: 18px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 100%;
`;

const HeaderInfoContainerDateWrapper = styled.span`
  color: ${({ theme }) => theme.mode.typo_sub};
  font-size: 10px;
  svg {
    fill: ${({ theme }) => theme.mode.typo_sub};
  }
`;

const HeaderIconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
  width: 100px;
`;

const HeaderIconContainerRating = styled.div`
  display: flex;
  height: 100%;
  gap: 8px;
  align-items: center;
  color: ${({ theme }) => theme.mode.typo_main};
  svg {
    height: 1.5rem;
    fill: ${customize.yellow['300']};
  }
`;

export default function CommentHeaderPublic({ item }: IProps) {
  const { created_at, title, status, name, rating, profile } = item;

  const createdTime = dayjs(created_at).format('YYYY/MM/DD');

  return (
    <Container>
      <HeaderInfoContainer>
        <HeaderInfoContainerTitleWrapper>
          {title}
        </HeaderInfoContainerTitleWrapper>
        <HeaderInfoContainerDateWrapper>
          <IconCalendar />
          &nbsp;{createdTime}
          &nbsp;{status}
          &nbsp;{name}
        </HeaderInfoContainerDateWrapper>
      </HeaderInfoContainer>
      <HeaderIconContainer>
        <HeaderIconContainer>
          <HeaderIconContainerRating>
            <IconStar />
            {rating}
          </HeaderIconContainerRating>
          <Avatar src={profile} size="2.5rem" />
        </HeaderIconContainer>
      </HeaderIconContainer>
    </Container>
  );
}

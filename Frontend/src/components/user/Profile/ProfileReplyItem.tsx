import { customize } from '@style/colors';
import Avatar from 'components/common/Avatar';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { STATUS_OBJECT } from 'lib/staticData';

const Container = styled.article`
  display: flex;
  justify-content: center;
  box-shadow: ${({ theme }) => theme.shadow.md};
  border-radius: 1rem;
  padding: 1rem;
  margin-bottom: 8px;
  min-height: 80px;
  gap: 8px;
  color: ${({ theme }) => theme.mode.typo_main};
`;

const AvatarWrapper = styled.div`
  width: 25px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Content = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`;

const SubHighLightWord = styled.p`
  color: ${customize.gray['400']};
  min-width: auto;
  max-width: 50%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.spinner};
  }
  @media screen and (min-width: 1280px) {
    max-width: auto;
  }
`;

export default function ProfileReplyItem({
  name,
  comment_id,
  profile,
  status,
  title,
}: ProfileReplyQueryItemType) {
  const navigate = useNavigate();

  return (
    <Container>
      <AvatarWrapper>
        <Avatar src={profile} size="25px" />
      </AvatarWrapper>
      <Content>
        <SubHighLightWord>{name}</SubHighLightWord>님이&nbsp;
        <SubHighLightWord onClick={() => navigate(`/comments/${comment_id}`)}>
          {title}
        </SubHighLightWord>
        <p>(을)를&nbsp;</p>
        <p>{STATUS_OBJECT[status]}&nbsp;</p>한줄평에&nbsp;
        <SubHighLightWord>댓글</SubHighLightWord>
        <p>을 남겼어요.</p>
      </Content>
    </Container>
  );
}

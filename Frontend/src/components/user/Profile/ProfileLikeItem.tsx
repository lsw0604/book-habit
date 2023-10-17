import styled from 'styled-components';
import Avatar from 'components/common/Avatar';

const Container = styled.div`
  height: 20%;
`;

export default function ProfileLikeItem({
  comment_id,
  like_id,
  name,
  profile,
  status,
  title,
}: ProfileLikeInfinityQueryItemType) {
  return (
    <Container>
      <Avatar size="100%" src={profile} />
      {name}
      {status}
      {title}
    </Container>
  );
}

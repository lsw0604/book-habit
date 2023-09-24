import styled from 'styled-components';

interface IProps {
  rating: number;
}

const Container = styled.div``;

export default function RatingBox({ rating }: IProps) {
  return <Container>RatingBox</Container>;
}

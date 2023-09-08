interface IProps {
  id: number;
  comment: string;
}

export default function Item({ id, comment }: IProps) {
  return (
    <div>
      {id}
      {comment}
    </div>
  );
}

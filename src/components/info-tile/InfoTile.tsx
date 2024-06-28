interface Props {
  title: string;
  text: string;
}

const InfoTile = ({ title, text }: Props) => {
  return (
    <article className="rounded-xl bg-gray-100 px-5 py-5">
      <h3 className="font-bold">{title}</h3>
      <p>{text}</p>
    </article>
  );
};

export default InfoTile;

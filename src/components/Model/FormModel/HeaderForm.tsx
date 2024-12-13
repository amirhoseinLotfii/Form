interface Props {
  content: string;
  title: string;
}

const HeaderForm = ({ content, title }: Props) => {
  return (
    <div className="text-white space-y-1">
      <h2 className="font-semibold text-3xl">{title}</h2>
      <p className="text-xs">{content}</p>
    </div>
  );
};

export default HeaderForm;

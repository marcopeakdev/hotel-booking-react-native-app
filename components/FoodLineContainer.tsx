import { FoodLineTemplateProps } from "./FoodLineTemplate";

export default function FoodLineContainer({
  className,
  name,
  image,
  onPress,
}: {
  className?: string;
  name: string;
  image: string;
  onPress: () => void;
}) {
  return (
    <button onClick={onPress}>
      <div>
        <img src={image} alt={name} />
      </div>
      <div>
        <h2>{name}</h2>
      </div>
    </button>
  );
}

FoodLineContainer.defaultProps = {
  className: "",
};

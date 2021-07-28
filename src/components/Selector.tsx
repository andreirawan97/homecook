import "./Selector.css";

export type Option = {
  id: string;
  label: string;
};

type Props = {
  options: Array<Option>;
  currentIndex: number;
  onClickOption?: (option: Option, index: number) => void;
};

export default function Selector(props: Props) {
  let { options, currentIndex, onClickOption } = props;

  return (
    <div className="flex flex-1 flex-col md:flex-row overflow-scroll mb-3">
      {options.map((option, i) => (
        <div
          className={
            currentIndex === i
              ? "selector-selected bg-primary border-primary"
              : "selector"
          }
          onClick={() => onClickOption && onClickOption(option, i)}
        >
          <span className="font-bold">{option.label}</span>
        </div>
      ))}
    </div>
  );
}

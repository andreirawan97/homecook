import { useState } from "react";
import { CheckIcon } from "@heroicons/react/solid";

type Props = {
  caption?: string;
  onCheck?: (state: boolean) => void;
};

export default function Checkbox(props: Props) {
  const { caption, onCheck } = props;

  const [checked, setChecked] = useState(false);

  const checkedStyle = "border border-primary rounded w-6 h-6 mr-3 bg-primary";
  const uncheckedStyle = "border border-primary rounded w-6 h-6 mr-3";

  const onClickCheck = () => {
    onCheck && onCheck(!checked);
    setChecked(!checked);
  };

  return (
    <div
      className="flex flex-row items-center cursor-pointer"
      onClick={onClickCheck}
    >
      <div
        className={checked ? checkedStyle : uncheckedStyle}
        style={{
          minWidth: 24,
        }}
      >
        {checked ? <CheckIcon className="text-white" /> : <></>}
      </div>
      <span>{caption}</span>
    </div>
  );
}

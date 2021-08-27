import { ReactNode, useState } from "react";
import { Transition } from "@headlessui/react";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/outline";

type Props = {
  title: string;
  content: ReactNode;
};

export default function Collapsible(props: Props) {
  const { title, content } = props;

  const [collapsed, setCollapsed] = useState(true);

  const onClickHeader = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className="mb-3">
      <div
        onClick={onClickHeader}
        className="flex px-3 py-3 rounded-lg justify-between items-center cursor-pointer bg-yellow-100"
      >
        <h3 className="font-bold text-yellow-500">{title}</h3>
        {collapsed ? (
          <ChevronUpIcon className="w-5 h-5 text-yellow-500" />
        ) : (
          <ChevronDownIcon className="w-5 h-5 text-yellow-500" />
        )}
      </div>

      <Transition
        show={collapsed}
        enter="transition duration-200 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-200 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        {content}
      </Transition>
    </div>
  );
}

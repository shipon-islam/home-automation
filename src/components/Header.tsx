import { Icon } from "@iconify/react";
export default function Header() {
  return (
    <div className=" bg-teal-400  py-2 rounded-md px-2 mt-2">
      <nav className="flex justify-between items-center text-teal-900">
        <div className="flex items-center gap-0.5 uppercase font-bold ">
          <Icon icon="mdi:home-automation" width="40" height="40" />
          <h5 className="text-lg">smart</h5>
        </div>
        <div className="rounded-full border border-teal-500 p-1 bg-teal-500">
          <Icon icon="tdesign:user-1-filled" width="25" height="25" />
        </div>
      </nav>
    </div>
  );
}

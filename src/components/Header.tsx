import { Icon } from "@iconify/react";
import { useState } from "react";
import { UseAuth } from "../firebase/auth";
export default function Header() {
  const [isDropDown, setIsDropDown] = useState<boolean>(false);
  const { currentUser, logout } = UseAuth();
  return (
    <div className=" bg-teal-400  py-2 rounded-md px-2 mt-2">
      <nav className="flex justify-between items-center text-teal-900">
        <div className="flex items-center gap-0.5 uppercase font-bold ">
          <Icon icon="mdi:home-automation" width="40" height="40" />
          <h5 className="text-lg">smart</h5>
        </div>
        {currentUser && currentUser?.role === "admin" ? (
          <div className="relative">
            <img
              onClick={() => setIsDropDown((prev) => !prev)}
              src={currentUser?.avatar}
              className="w-10 h-auto rounded-full border border-teal-600 cursor-pointer"
              alt="avatar"
            />
            {isDropDown && (
              <div
                onClick={() => logout()}
                className="absolute bg-white w-32 right-0 px-2 py-2 rounded-md cursor-pointer flex items-center font-medium shadow"
              >
                <Icon icon="material-symbols:logout" width="20" height="20" />
                <button>Logout</button>
              </div>
            )}
          </div>
        ) : (
          <div className="rounded-full border border-teal-500 p-1 bg-teal-500">
            <Icon icon="tdesign:user-1-filled" width="25" height="25" />
          </div>
        )}
      </nav>
    </div>
  );
}

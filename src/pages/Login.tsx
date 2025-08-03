import { Icon } from "@iconify/react";
import { UseAuth } from "../firebase/auth";
export default function Login() {
  const { loginWithGoogle } = UseAuth();
  const handleLogin = async () => {
    await loginWithGoogle();
  };

  return (
    <div className="grid place-items-center h-[75vh] w-full">
      <div className="h-72  w-full bg-white mx-auto p-8 flex flex-col items-center justify-center rounded-lg shadow gap-y-4 ">
        <div className="flex items-center gap-0.5 uppercase font-bold ">
          <Icon icon="mdi:home-automation" width="40" height="40" />
          <h5 className="text-lg">smart</h5>
        </div>
        <button
          onClick={handleLogin}
          className="mt-3 flex gap-2 py-2 px-4 border border-gray-500 items-center rounded-lg bg-white cursor-pointer hover:bg-gray-800 group"
        >
          <Icon icon="flat-color-icons:google" width="30" height="30" />
          <span className="group-hover:text-white hoverEffect">
            Sign up with Google
          </span>
        </button>
      </div>
    </div>
  );
}

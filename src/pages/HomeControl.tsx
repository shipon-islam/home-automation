import { Icon } from "@iconify/react";
import { ref, set } from "firebase/database";
import { db } from "../firebase/config";
import useGetRelays from "../hooks/useGetRelays";
export default function HomeControl() {
  const { relays } = useGetRelays();
  const handleClick = (relayName: string, relayState: boolean) => {
    set(ref(db, "/" + relayName), !relayState);
  };

  return (
    <div className=" mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      <button
        onClick={() => handleClick("relay1", relays.relay1)}
        className={`btn-teal ${relays.relay1 ? "text-teal-100" : ""}`}
      >
        <Icon
          className={relays.relay1 ? "text-yellow-200" : ""}
          icon="fa6-solid:computer"
          width="40"
          height="40"
        />
        {relays.relay1 ? "Computer On" : "Computer off"}
      </button>
      <button
        onClick={() => handleClick("relay2", relays.relay2)}
        className={`btn-teal ${relays.relay2 ? "text-teal-100" : ""}`}
      >
        <Icon
          className={relays.relay2 ? "text-yellow-200" : ""}
          icon="wpf:fan"
          width="40"
          height="40"
        />
        {relays.relay2 ? "DC FAN ON" : "DC FAN OFF"}
      </button>
      <button
        onClick={() => handleClick("relay3", relays.relay3)}
        className={`btn-teal ${relays.relay3 ? "text-teal-100" : ""}`}
      >
        <Icon
          className={relays.relay3 ? "text-yellow-200" : ""}
          icon="tabler:bulb-filled"
          width="40"
          height="40"
        />
        {relays.relay3 ? "light on" : "light off"}
      </button>
      <button
        onClick={() => handleClick("relay4", relays.relay4)}
        className={`btn-teal ${relays.relay4 ? "text-teal-100" : ""}`}
      >
        <Icon
          className={relays.relay4 ? "text-yellow-200" : ""}
          icon="mdi:ceiling-fan"
          width="45"
          height="45"
        />
        {relays.relay4 ? "celling fan on" : "celling fan off"}
      </button>
    </div>
  );
}

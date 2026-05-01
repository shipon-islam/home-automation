import { Icon } from "@iconify/react";
import { ref, set, update } from "firebase/database";
import { useCallback, useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import Banner from "../components/Banner";
import HomeSvg from "../components/HomeSvg";
import { db } from "../firebase/config";
import useGetRelays from "../hooks/useGetRelays";
export default function HomeControl() {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const { relays } = useGetRelays();
  const [allRelay, setAllRelay] = useState(
    Object.values(relays).some((state) => state === true),
  );
  const handleClick = (relayName: string, relayState: boolean) => {
    set(ref(db, "/" + relayName), !relayState);
  };
  const handleALLClick = () => {
    update(ref(db), {
      "/relay1": !allRelay,
      "/relay2": !allRelay,
      "/relay3": !allRelay,
      "/relay4": !allRelay,
    });
  };
  const speakToAction = useCallback(() => {
    if (!browserSupportsSpeechRecognition) {
      alert("Your browser does not support speech recognition.");
      return;
    }

    const text = transcript.toLowerCase();

    if (text.includes("computer on") || text.includes("turn on computer")) {
      set(ref(db, "/relay1"), false);
    } else if (
      text.includes("computer off") ||
      text.includes("turn off computer")
    ) {
      set(ref(db, "/relay1"), true);
    }
    if (text.includes("dc fan on") || text.includes("turn on dc fan")) {
      set(ref(db, "/relay2"), false);
    }
    if (text.includes("dc fan off") || text.includes("turn off dc fan")) {
      set(ref(db, "/relay2"), true);
    }
    if (text.includes("light on") || text.includes("turn on light")) {
      set(ref(db, "/relay3"), false);
    }
    if (text.includes("light off") || text.includes("turn off light")) {
      set(ref(db, "/relay3"), true);
    }
    if (
      text.includes("celling fan on") ||
      text.includes("turn on celling fan")
    ) {
      set(ref(db, "/relay4"), false);
    }
    if (
      text.includes("celling fan off") ||
      text.includes("turn off celling fan")
    ) {
      set(ref(db, "/relay4"), true);
    }
    resetTranscript();
  }, [browserSupportsSpeechRecognition, resetTranscript, transcript]);

  useEffect(() => {
    if (!listening && transcript) {
      speakToAction();
    }
  }, [listening, speakToAction, transcript]);

  useEffect(() => {
    setAllRelay(Object.values(relays).some((state) => state === true));
  }, [relays]);
  return (
    <div>
      <div className="flex justify-between items-center mt-4">
        <Banner />
        <button onClick={handleALLClick}>
          <Icon
            className={!allRelay ? "text-teal-500" : "text-teal-500"}
            icon={`${!allRelay ? "ion:switch" : "fontisto:toggle-off"}`}
            width="45"
            height="45"
          />
        </button>
      </div>

      <div className=" mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        <button
          onClick={() => handleClick("relay1", relays.relay1)}
          className={`btn-teal ${!relays.relay1 ? "text-teal-100" : ""}`}
        >
          <Icon
            className={!relays.relay1 ? "text-yellow-200" : ""}
            icon="fa6-solid:computer"
            width="40"
            height="40"
          />
          {!relays.relay1 ? "Computer On" : "Computer off"}
        </button>
        <button
          onClick={() => handleClick("relay2", relays.relay2)}
          className={`btn-teal ${!relays.relay2 ? "text-teal-100" : ""}`}
        >
          <Icon
            className={!relays.relay2 ? "text-yellow-200" : ""}
            icon="wpf:fan"
            width="40"
            height="40"
          />
          {!relays.relay2 ? "DC FAN ON" : "DC FAN OFF"}
        </button>
        <button
          onClick={() => handleClick("relay3", relays.relay3)}
          className={`btn-teal ${!relays.relay3 ? "text-teal-100" : ""}`}
        >
          <Icon
            className={!relays.relay3 ? "text-yellow-200" : ""}
            icon="tabler:bulb-filled"
            width="40"
            height="40"
          />
          {!relays.relay3 ? "light on" : "light off"}
        </button>
        <button
          onClick={() => handleClick("relay4", relays.relay4)}
          className={`btn-teal ${!relays.relay4 ? "text-teal-100" : ""}`}
        >
          <Icon
            className={!relays.relay4 ? "text-yellow-200" : ""}
            icon="mdi:ceiling-fan"
            width="45"
            height="45"
          />
          {!relays.relay4 ? "celling fan on" : "celling fan off"}
        </button>
      </div>
      <div className="w-fit mx-auto mt-6 sm:flex flex-col items-center gap-2 hidden">
        <button
          onClick={() => {
            if (listening) {
              SpeechRecognition.stopListening();
              return;
            } else {
              SpeechRecognition.startListening();
            }
          }}
          className="bg-teal-500 p-4 rounded-full"
        >
          <Icon
            className={listening ? "text-white animate-pulse" : ""}
            icon="mingcute:mic-fill"
            width="45"
            height="45"
          />
        </button>
        <p className="text-lg font-medium">
          {listening ? "Listening..." : "Speak to control devices"}
        </p>
      </div>
      <div className="relative">
        <HomeSvg />
        <div className="sm:hidden w-fit mx-auto mt-6 flex flex-col items-center gap-2 absolute top-[53%] left-1/2 -translate-1/2">
          <button
            onClick={() => {
              if (listening) {
                SpeechRecognition.stopListening();
                return;
              } else {
                SpeechRecognition.startListening();
              }
            }}
            className="bg-white p-3 rounded-full"
          >
            <Icon
              className={
                listening ? "text-yellow-500 animate-pulse" : "text-teal-500"
              }
              icon="mingcute:mic-fill"
              width="34"
              height="34"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

import { onValue, ref } from "firebase/database";
import { useEffect, useState } from "react";
import { db } from "../firebase/config";

export default function useGetRelays() {
  const [relays, setRelays] = useState({
    relay1: false,
    relay2: false,
    relay3: false,
    relay4: false,
  });
  useEffect(() => {
    const usersRef = ref(db, "/");
    onValue(usersRef, (snapshot) => {
      const data = snapshot.val();
      setRelays(data);
    });
  }, []);
  return { relays };
}

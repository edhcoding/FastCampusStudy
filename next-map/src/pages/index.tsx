import Map from "@/components/Map";
import Markers from "@/components/Markers";
import StoreBox from "@/components/StoreBox";
import stores from "@/data/store_data.json";
import { useState } from "react";

export default function Home() {
  const [map, setMap] = useState(null);
  const [currentStore, setCurrrentStore] = useState(null);

  const storeDatas = stores["DATA"];

  return (
    <>
      <Map setMap={setMap} />
      <Markers
        storeDatas={storeDatas}
        map={map}
        setCurrrentStore={setCurrrentStore}
      />
      <StoreBox
        currentStore={currentStore}
        setCurrentStore={setCurrrentStore}
      />
    </>
  );
}

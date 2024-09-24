import Map from "@/components/Map";
import Markers from "@/components/Markers";
import StoreBox from "@/components/StoreBox";
import { StoreDataType } from "@/interface";
import axios from "axios";
import { useState } from "react";

export default function Home({ stores }: { stores: StoreDataType[] }) {
  const [map, setMap] = useState(null);
  const [currentStore, setCurrrentStore] = useState(null);

  return (
    <>
      <Map setMap={setMap} />
      <Markers stores={stores} map={map} setCurrrentStore={setCurrrentStore} />
      <StoreBox
        currentStore={currentStore}
        setCurrentStore={setCurrrentStore}
      />
    </>
  );
}

export async function getStaticProps({}) {
  const stores = await axios(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`);

  return {
    props: { stores: stores.data },
    revalidate: 60 * 60,
  };
}

import CurrentLocationButton from "@/components/CurrentLocationButton";
import Map from "@/components/Map";
import Markers from "@/components/Markers";
import StoreBox from "@/components/StoreBox";
import { StoreDataType } from "@/interface";

export default async function Home() {
  const stores: StoreDataType[] = await getData();

  return (
    <>
      <Map />
      <Markers stores={stores} />
      <StoreBox />
      <CurrentLocationButton />
    </>
  );
}

async function getData() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/stores`, {
      cache: "force-cache",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  } catch (e) {
    console.log(e);
  }
}

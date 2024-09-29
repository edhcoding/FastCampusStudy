import { LocationType, searchType, StoreDataType } from "@/interface";
import { atom } from "recoil";

const DEFAULT_LAT = "37.497625203"; // 위도
const DEFAULT_LNG = "127.03088379"; // 경도
const DEFAULT_ZOOM = 3;

export const mapState = atom({
  key: "map",
  default: null,
  // Recoil은 기본적으로 상태의 불변성을 유지하기 때문에 때문에 상태가 변경 되었을때 Recoil이 해당 변경 사항을 감지하고 관련 컴포넌트를 다시 렌더링 하도록 하는데요
  // 저희 같은 경우에는 Marker, Markers 컴포넌트에서 marker.setMap(map); 이런식으로 Recoil 상태를 직접적으로 수정하는 kakao map의 함수를 사용하고 있기 때문에 읽기 전의 상태를 수정할 수 있도록 옵션을 수정해줘야야 합니다. (dangerouslyAllowMutability: true)
  dangerouslyAllowMutability: true,
});

export const currentStoreState = atom<StoreDataType | null>({
  key: "store",
  default: null,
});

export const locationState = atom<LocationType>({
  key: "location",
  default: {
    lat: DEFAULT_LAT,
    lng: DEFAULT_LNG,
    zoom: DEFAULT_ZOOM,
  },
});

export const searchState = atom<searchType | null>({
  key: "search",
  default: null,
});

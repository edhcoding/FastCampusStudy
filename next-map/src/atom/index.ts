/* eslint-disable @typescript-eslint/no-explicit-any */

import { LocationType, searchType, StoreDataType } from "@/interface";
import { atom } from "recoil";

const DEFAULT_LAT = "37.497625203"; // 위도
const DEFAULT_LNG = "127.03088379"; // 경도
const DEFAULT_ZOOM = 3;

export const mapState = atom<any>({
  key: "map",
  default: null,
  dangerouslyAllowMutability: true,
  // Recoil은 기본적으로 상태의 불변성을 유지하기 때문에 때문에 상태가 변경 되었을때 Recoil이 해당 변경 사항을 감지하고 관련 컴포넌트를 다시 렌더링 하도록 하는데요
  // 저희 같은 경우에는 Marker, Markers 컴포넌트에서 marker.setMap(map); 이런식으로 Recoil 상태를 직접적으로 수정하는 kakao map의 함수를 사용하고 있기 때문에 읽기 전의 상태를 수정할 수 있도록 옵션을 수정해줘야야 합니다. (dangerouslyAllowMutability: true)

  // 리코일은 저장하려는 객체를 재귀적으로 freeze 하고 있기 때문에, freeze가 불가능한 오브젝트(firebase User 객체 등)을 저장하면 TypeError: Cannot freeze 에러가 뜨는 것을 확인 할 수 있습니다. 이를 방지하기 위해서 dangerouslyAllowMutability: true 옵션을 추가해주어야함.
  // 기본적으로 atom의 상태가 변경되면 이를 구독하고 있는 모든 컴포넌트가 랜더링 되는 것을 막음 (아톰의 상태는 변경되지만 컴포넌트에 변경 사항을 알리지는 않는 옵션)
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

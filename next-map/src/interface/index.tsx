export interface StoreDataType {
  id: number;
  phone?: string | null; // tel_no 전화번호
  address?: string | null; // rdn_code_nm 주소(로드넘버)
  lat?: string | null; // y_dnts y좌표값
  lng?: string | null; // x_cnts x좌표값
  name?: string | null; // upso_nm 업소이름
  category?: string | null; // bizcnd_code_nm
  storeType?: string | null; // cob_code_nm
  foodCertifyName?: string | null; // crtfc_gbn_nm
  likes?: LikeInterface[];
}

export interface LikeInterface {
  id: number;
  storeId: number;
  userId: number;
  store?: StoreDataType;
}

export interface LikeApiResponse {
  data: LikeInterface[];
  page?: number;
  totalPage?: number;
}

export interface CommentInterface {
  id: number;
  storeId: number;
  userId: number;
  store?: StoreDataType;
  body: string;
}

export interface CommentApiResponse {
  data: CommentInterface[];
  page?: number;
  totalPage?: number;
}

export interface StoreApiResponse {
  data: StoreDataType[];
  page?: number;
  totalPage?: number;
  totalCount?: number;
}

export interface LocationType {
  lat?: string | null;
  lng?: string | null;
  zoom?: number;
}

export interface searchType {
  q?: string;
  district?: string;
}

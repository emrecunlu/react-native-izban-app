export type Station = {
  Boylam: string;
  IstasyonId: number;
  Enlem: string;
  IstasyonSirasi: number;
  IstasyonAdi: string;
};

export type Departure = {
  VarisIstasyonAdi: string;
  HareketSaati: string;
  VarisSaati: string;
  HareketIstasyonAdi: string;
  HareketIstasyonId: number;
  VarisIstasyonId: number;
};

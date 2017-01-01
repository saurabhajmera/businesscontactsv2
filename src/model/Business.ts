export interface Business{
  $key?:string;
  business_id: string;
  full_address: string;
  hours: any;
  open: boolean;
  categories: Array<string>;
  city: string;
  review_count: number;
  name: string;
  neighborhoods: Array<any>;
  longitude: number;
  state: string;
  stars: number;
  latitude: number;
  attributes: any;
  type: string;

}

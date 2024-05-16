export interface Response<ListResult> {
  code: number;
  message: string;
  data: ListResult;
  count: number;
  success: boolean;
}
//  interface ListResult {
//   list: Array<ListModel>;
// }
// interface ListModel {
//   adminName: string;
//   amount: string;
//   contractType: number;
//   index: number;
//   name: string;
//   no: string;
//   paymentType: number;
//   status: number;
//   updateTime: Date;
// }

export interface CardListResult {
  list: Array<CardList>;
}
export interface CardList {
  banner: string;
  description: string;
  index: number;
  isSetup: boolean;
  name: string;
  type: number;
}

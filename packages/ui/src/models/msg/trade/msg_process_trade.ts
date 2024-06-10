import { Categories } from '../types';

class MsgProcessTrade {
  public category: Categories;
  public type: string;
  public json: any;
  public creator: string;

  constructor(payload: any) {
    this.category = 'trade';
    this.type = payload.type;
    this.creator = payload.creator;
    this.json = payload.json;
  }

  static fromJson(json: any) {
    return new MsgProcessTrade({
      type: json['@type'],
      creator: json.creator,
      json,
    });
  }
}

export default MsgProcessTrade;

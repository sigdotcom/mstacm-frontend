export interface DynamoDbItem {
  [key: string]: {
    [key: string]: any;
  };
}

export function transformDynamoDbItem(item: DynamoDbItem) {
  let transformedItem: { [key: string]: any } = {};
  for (let key in item) {
    for (let type in item[key]) {
      transformedItem[key] = item[key][type];
    }
  }
  return transformedItem;
}

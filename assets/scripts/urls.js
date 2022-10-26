//// APP
const s3 = 'https://s3.us-west-2.amazonaws.com/rockyjreed.com/';

const urls = {

  s3: s3,
  artwork: `${s3}artwork/`,
  index: `${s3}artwork/index.json`,
  index_sorted: `${s3}artwork/index_sorted.json`,
  store: 'https://store.rockyjreed.com'
};

//// EXPORTS
export { urls };

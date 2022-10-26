//// APP
const s3 = 'https://s3.us-west-2.amazonaws.com/rockyjreed.com/';

const urls = {

  s3: s3,
  artwork: `${s3}artwork/`,
  covers: `${s3}images/covers/`,
  datasets: `${s3}datasets/`,
  table_index: `${s3}datasets/table_index.json`
};

//// EXPORTS
export { urls };

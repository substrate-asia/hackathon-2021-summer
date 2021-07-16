import request from './request';

const listfiles = async () => {
  const data = await request.get('http://localhost:4000/listfiles');
  return data;
};
export default {
  listfiles,
};

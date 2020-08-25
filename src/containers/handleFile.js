import api from '../services/api';

export function GetFile(id) {
  api.get('/files/:id', id, (req, res) => {

    return res.data.name;
  })
}

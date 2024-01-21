import axios from "axios";

const baseUrl = `/api/persons`

const create = (personObject) => {
  const req = axios.post(baseUrl, personObject)
  return req.then(response => response.data)
}

const getAll = () => {
  const req = axios.get(baseUrl)
  return req.then(response => {
    console.log(response.data)
    return response.data
  })
}

const destroy = (id) => {
  const req = axios.delete(`${baseUrl}/${id}`)
  return req.then(response => {
    console.log(`deleted contact with with ${id}`)
    return response.data
  })
}

const update = (modifiedPerson) => {
  const req = axios.put(`${baseUrl}/${modifiedPerson.id}`, modifiedPerson)
  return req.then(response => {
    console.log(`updated contact with ${response.data}`)
    return response.data
  })
}

export default {
  getAll: getAll,
  create: create,
  destroy: destroy,
  update: update,
}
import {httpService} from './http.service.js'

export const stayService = {
  query,
  getById,
  getLabels,
  remove,
  save,
  getEmptyStay,
}

function query(filterBy = {}) {
  return httpService.get('stay', filterBy)
}

function getLabels() {
  return httpService.get('stay', { getLabelsOnly: true })
}

function getById(toyId) {
  return httpService.get(`stay/${stayId}`)
}

function remove(toyId) {
  httpService.delete(`stay/${stayId}`)
}

function save(toy) {
  if (toy._id) {
    return httpService.put(`stay/${stay._id}`, stay)
  }
  return httpService.post('stay', stay)
}

function getEmptyStay() {
  return {
    name: '',
    price: 0,
    labels: [],
    createdAt: Date.now(),
    inStock: false,
  }
}
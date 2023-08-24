//todo: switch console.log to logger

import {dbService} from '../../services/db.service.js'
import mongoDB from 'mongodb'

const {ObjectId} = mongoDB

export const stayService = {
  query,
  getById,
  remove,
  save,
}

async function query(filterBy = {}, getLabelsOnly = false, page = 1, limit = 20) {
  console.log('Page:', page, 'Limit:', limit); // Log the page and limit values

  const criteria = _buildCriteria(filterBy)
  let projection = getLabelsOnly ? {labels: 1, _id: 0} : {}

  const skip = (page - 1) * limit

  try {
    const collection = await dbService.getCollection('listingsAndReviews')
    let stays = await collection.find(criteria, {projection: projection}).skip(skip).limit(limit).toArray()
    if (getLabelsOnly) {
      let labels = stays.flatMap(stay => stay.labels)
      stays = [...new Set(labels)]
    }

    if (!getLabelsOnly && filterBy.sortBy) {
      if (filterBy.sortBy === 'price') {
        stays.sort((a, b) => a.price - b.price)
      } else if (filterBy.sortBy === 'name') {
        stays.sort((a, b) => {
          if (a.name && b.name) {
            return a.name.localeCompare(b.name)
          } else {
            if (!a.name && !b.name) return 0
            else if (!a.name) return 1
            else return -1
          }
        })
      }
    }

    return stays
  } catch (err) {
    console.log('ERROR: cannot find stays');
    throw err
  }
}

async function getById(stayId) {
  try {
    const collection = await dbService.getCollection('listingsAndReviews')
    await collection.findOne({"_id": new ObjectId(stayId)})
  } catch (err) {
    console.log(`ERROR: cannot find stay ${stayId}`)
    throw err
  }
}

async function remove(stayId) {
  try {
    const collection = await dbService.getCollection('listingsAndReviews')
    await collection.deleteOne({"_id": new ObjectId(stayId)})
  } catch (err) {
    console.log(`ERROR: cannot remove stay ${stayId}`)
    throw err
  }
}

async function save(stay) {
  const collection = await dbService.getCollection('listingsAndReviews')
  try {
    if (stay._id) {
      const stayId = new ObjectId(stay._id)
      let stayCopy = { ...stay }
      delete stayCopy._id
      await collection.updateOne({ "_id": stayId }, { $set: stayCopy })
    } else if (stay.id) {
      const stayId = new ObjectId(stay.id)
      await collection.updateOne({ "_id": stayId }, { $set: stay.changes })
    } else {
      await collection.insertOne(stay)
    }
    return stay
  } catch (err) {
    console.log(`ERROR: cannot save stay ${stay._id || stay.id}`)
    throw err
  }
}

function _buildCriteria(filterBy) {
  const criteria = {}
  if (filterBy.name) {
    criteria.name = {$regex: filterBy.name, $options: 'i'}
  }
  if (filterBy.hasOwnProperty('inStock') && filterBy.inStock !== 'all') {
    criteria.inStock = (filterBy.inStock === 'true')
  }
  if (filterBy.labels && filterBy.labels.length > 0) {
    let labelsToSearch = Array.isArray(filterBy.labels) ? filterBy.labels : [filterBy.labels]
    criteria.labels = {$in: labelsToSearch}
  }
  return criteria
}

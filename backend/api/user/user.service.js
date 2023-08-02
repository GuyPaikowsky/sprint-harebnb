// Importing necessary modules
import { dbService } from '../../services/db.service.js'
import { logger } from '../../services/logger.service.js'

import mongodb from 'mongodb'
// ObjectID is a class to generate unique hexadecimal ids.
const { ObjectId } = mongodb

// Define service with available methods
export const userService = {
  query,
  getById,
  getByUsername,
  remove,
  update,
  add
}

// Function to get users. Filters can be applied.
async function query(filterBy = {}) {
  // Build criteria for filtering
  const criteria = _buildCriteria(filterBy)
  try {
    // Fetch user collection from database
    const collection = await dbService.getCollection('user')
    // Fetch users based on the criteria, sort them in descending order based on nickname and convert to array
    var users = await collection.find(criteria).sort({nickname: -1}).toArray()
    // Prepare users for output (remove password, add default attributes)
    users = users.map(user => {
      delete user.password // Remove password for security
      user.isHappy = true // Add isHappy attribute and set it to true
      // Set createdAt attribute to the timestamp from the user's id
      user.createdAt = new ObjectId(user._id).getTimestamp()
      return user
    })
    // Return array of users
    return users
  } catch (err) {
    // Log error and throw it further
    logger.error('cannot find users', err)
    throw err
  }
}

// Function to get a user by id
async function getById(userId) {
  try {
    // Fetch user collection from database
    const collection = await dbService.getCollection('user')
    // Find user with the specified id
    const user = await collection.findOne({ _id: new ObjectId(userId) })
    delete user.password // Remove password for security
    return user
  } catch (err) {
    // Log error and throw it further
    logger.error(`while finding user ${userId}`, err)
    throw err
  }
}

// Function to get a user by username
async function getByUsername(username) {
  try {
    // Fetch user collection from database
    const collection = await dbService.getCollection('user')
    // Find user with the specified username
    const user = await collection.findOne({ username })
    return user
  } catch (err) {
    // Log error and throw it further
    logger.error(`while finding user ${username}`, err)
    throw err
  }
}

// Function to remove a user by id
async function remove(userId) {
  try {
    // Fetch user collection from database
    const collection = await dbService.getCollection('user')
    // Delete user with the specified id
    await collection.deleteOne({ _id: new ObjectId(userId) })
  } catch (err) {
    // Log error and throw it further
    logger.error(`cannot remove user ${userId}`, err)
    throw err
  }
}

// Function to update a user
async function update(user) {
  if (!ObjectId.isValid(user._id)) {
    throw new Error(`Invalid id: ${user._id}`);
  }
  try {
    // Create object with fields to update
    const userToSave = {
      _id: new ObjectId(user._id),
      username: user.username,
      fullname: user.fullname,
      score: user.score
    }
    // Fetch user collection from database
    const collection = await dbService.getCollection('user')
    // Update user with the specified id with the provided fields
    await collection.updateOne({ _id: userToSave._id }, { $set: userToSave })
    return userToSave
  } catch (err) {
    // Log error and throw it further
    logger.error(`cannot update user ${user._id}`, err)
    throw err
  }
}

// Function to add a new user
async function add(user) {
  try {
    // Check if a user with the same username already exists
    const existUser = await getByUsername(user.username)
    if (existUser) throw new Error('Username taken')

    // Create object with fields for new user
    const userToAdd = {
      username: user.username,
      password: user.password,
      fullname: user.fullname,
      score: user.score || 0
    }
    // Fetch user collection from database
    const collection = await dbService.getCollection('user')
    // Insert new user to the database
    await collection.insertOne(userToAdd)
    return userToAdd
  } catch (err) {
    // Log error and throw it further
    logger.error('cannot insert user', err)
    throw err
  }
}

// Helper function to build the criteria object based on the provided filters
function _buildCriteria(filterBy) {
  const criteria = {}
  // If a text filter is provided, add regex to criteria for username and fullname fields
  if (filterBy.txt) {
    const txtCriteria = { $regex: filterBy.txt, $options: 'i' }
    criteria.$or = [
      {
        username: txtCriteria
      },
      {
        fullname: txtCriteria
      }
    ]
  }
  // If a minBalance filter is provided, add it to criteria for balance field
  if (filterBy.minBalance) {
    criteria.balance = { $gte: filterBy.minBalance }
  }
  return criteria
}
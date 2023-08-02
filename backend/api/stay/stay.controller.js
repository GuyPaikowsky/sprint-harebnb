import {logger} from '../../services/logger.service.js'
import {stayService} from './stay.service.js'

export async function getStayById(req, res) {
  try {
    const {id} = req.params
    const stay = await stayService.getById(id)
    res.send(stay)
  } catch (err) {
    logger.error('Cannot get stay', err)
    res.status(500).send('Cannot get stay')
  }
}

export async function getStays(req, res) {
  const getLabelsOnly = req.query.getLabelsOnly === 'true'
  try {
    const staysOrLabels = await stayService.query(req.query, getLabelsOnly)
    res.send(staysOrLabels)
  } catch (err) {
    logger.error('Cannot get stays', err)
    res.status(500).send('Cannot get stays')
  }
}

export async function addStay(req, res) {
  try {
    const stay = req.body
    const savedStay = await stayService.save(stay)
    logger.info('Stay saved:', stay)
    res.send(savedStay)
  } catch (err) {
    logger.error('cannot save stay: ', err)
    res.status(500).send('Cannot save stay')
  }
}

export async function updateStay(req, res) {
  try {
    const stay = req.body
    // Ensure that stay._id exists for an update operation.
    if (!stay._id) {
      return res.status(400).send('Missing stay ID for update')
    }

    // Get stay's ID and remove _id from the object to avoid attempting to update it
    const stayId = stay._id
    delete stay._id

    // Update the stay
    const updatedStay = await stayService.save({ id: stayId, changes: stay })

    logger.info('Stay Updated!', updatedStay)
    res.send(updatedStay)
  } catch (err) {
    logger.error('Cannot update stay', err)
    res.status(500).send('Cannot update stay')
  }
}

export async function removeStay(req, res) {
  try {
    const {id} = req.params
    await stayService.remove(id)
    logger.info(`Stay ${id} removed`)
  } catch (err) {
    logger.error('Cannot remove stay', err)
    res.status(500).send('Cannot remove stay')
  }
}

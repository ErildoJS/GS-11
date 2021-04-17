import { parseISO } from 'date-fns'
import { Router } from 'express'
import { getCustomRepository } from 'typeorm'
import AppointmentRepository from '../repositories/appointmentRepository'
import CreateAppointmentService from '../services/CreateAppointmentService'

const appointmentsRouter = Router()

appointmentsRouter.get('/',async (request, response) => {
  const appointmentsRepository = getCustomRepository(AppointmentRepository)

  const appointments = await appointmentsRepository.find()//find - busca todos
  return response.json(appointments)
})


appointmentsRouter.get('/',async (request, response) => {
 try {
  const {provider, date} = request.body

  /**
   *
   */
  const parsedDate = parseISO(date)

  const createAppointment = new CreateAppointmentService()
  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider
  })

  return response.json(appointment)
 } catch (err) {
   return response.status(400).json({error: err.message})
 }
})

export default appointmentsRouter

import { startOfHour } from "date-fns";
import { getCustomRepository } from "typeorm";
import Appointment from "../models/Appointment";
import AppointmentRepository from "../repositories/appointmentRepository";

interface Request {
  provider: string;
  date: Date;
}
class CreateAppointmentService {
  public async execute({date, provider}: Request): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentRepository)

    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(date)

    if(findAppointmentInSameDate) {
      throw Error('this appointment is already booked')
    }

    /**
     * o metodo create nao precisa de await pk ele nao cria algo uma
     * instancia no db nao salva
     */
    const appointment = appointmentsRepository.create({
      provider,
      date: appointmentDate
    })

    await appointmentsRepository.save(appointment)

    return appointment
  }
}

export default CreateAppointmentService

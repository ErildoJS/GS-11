import { EntityRepository, Repository } from "typeorm";
import Appointment from "../models/Appointment";

@EntityRepository(Appointment)
class AppointmentRepository extends Repository<Appointment>{
  //o retorno de uma funcao async sempre é uma promise
  public async findByDate(date: Date): Promise<Appointment | null> {
    const findAppointment = await this.findOne({//findOne - busca por um
      where: {date}
    })

    return findAppointment || null;
  }
}

export default AppointmentRepository

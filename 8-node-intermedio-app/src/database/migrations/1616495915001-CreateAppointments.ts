import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateAppointments1616495915001 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: 'appointments',
          columns: [
            {
              name: 'id',
              type: 'varchar',//pk o id vai ser uuid
              isPrimary: true,
              generationStrategy: 'uuid',
              //default: 'uuid_generate_v4()'
            },
            {
              name: 'provider',
              type: 'varchar',
              isNullable: false,//nao é possivel ter o campo como nulo

            },
            {
              name: 'date',
              type: 'timestamp',
              isNullable: false,
            },

          ],
        })
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('appointments')
    }

}

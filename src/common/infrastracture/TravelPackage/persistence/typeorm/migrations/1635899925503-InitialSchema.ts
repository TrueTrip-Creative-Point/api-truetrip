import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1635899925503 implements MigrationInterface {
  name = 'InitialSchema1635899925503'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`travel_plan\` ADD \`amount_people\` bigint(4) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`travel_plan\` ADD \`description\` varchar(8) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`travel_plan\` ADD \`promotion\` varchar(8) NOT NULL`);
    await queryRunner.query(`ALTER TABLE \`travel_plan\` ADD \`url_image\` varchar(8) NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE \`travel_plan\` DROP COLUMN \`amount_people\``);
    await queryRunner.query(`ALTER TABLE \`travel_plan\` DROP COLUMN \`description\``);
    await queryRunner.query(`ALTER TABLE \`travel_plan\` DROP COLUMN \`promotion\``);
    await queryRunner.query(`ALTER TABLE \`travel_plan\` DROP COLUMN \`url_image\``);
  }

}

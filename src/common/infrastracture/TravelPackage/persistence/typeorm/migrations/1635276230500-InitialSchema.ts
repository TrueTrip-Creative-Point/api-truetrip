import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1635276230500 implements MigrationInterface {
  name = 'InitialSchema1635276230500'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE \`true-trip\`.\`travel_plan\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`amount_people\` bigint(4) NOT NULL, \`description\` varchar(75) NOT NULL, \`promotion\` varchar(8) NOT NULL,\`url_image\` varchar(8) NOT NULL ,PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE \`true-trip\`.\`travel_plan\``);
  }

}

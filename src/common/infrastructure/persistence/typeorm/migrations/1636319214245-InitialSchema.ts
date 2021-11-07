import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1636319214245 implements MigrationInterface {
    name = 'InitialSchema1636319214245'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`travel_plan\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`description\` varchar(100) NOT NULL, \`amount_people\` bigint NULL, \`promotion\` varchar(100) NULL, \`url_image\` varchar(100) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`travel_plan\``);
    }

}

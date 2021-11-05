import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1635899925503 implements MigrationInterface {
    name = 'InitialSchema1635899925503'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`partners\` ADD \`companyName\` varchar(8) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`partners\` ADD \`phoneNumber\` varchar(8) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`partners\` ADD \`email\` varchar(8) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`partners\` DROP COLUMN \`email\``);
        await queryRunner.query(`ALTER TABLE \`partners\` DROP COLUMN \`phoneNumber\``);
        await queryRunner.query(`ALTER TABLE \`partners\` DROP COLUMN \`companyName\``);
    }

}

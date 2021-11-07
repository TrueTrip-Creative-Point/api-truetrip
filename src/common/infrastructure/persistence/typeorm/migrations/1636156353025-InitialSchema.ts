import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1636156353025 implements MigrationInterface {
    name = 'InitialSchema1636156353025'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`partners\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`first_name\` varchar(75) NOT NULL, \`last_name\` varchar(75) NOT NULL, \`dni\` varchar(8) NOT NULL, \`companyName\` varchar(8) NOT NULL, \`phoneNumber\` varchar(8) NOT NULL, \`email\` varchar(8) NOT NULL, UNIQUE INDEX \`UQ_partners_dni\` (\`dni\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`travelers\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`first_name\` varchar(75) NOT NULL, \`last_name\` varchar(75) NOT NULL, \`dni\` varchar(8) NOT NULL, \`phoneNumber\` varchar(8) NOT NULL, \`email\` varchar(8) NOT NULL, UNIQUE INDEX \`UQ_partners_dni\` (\`dni\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`UQ_partners_dni\` ON \`travelers\``);
        await queryRunner.query(`DROP TABLE \`travelers\``);
        await queryRunner.query(`DROP INDEX \`UQ_partners_dni\` ON \`partners\``);
        await queryRunner.query(`DROP TABLE \`partners\``);
    }

}

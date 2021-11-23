import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1637622900569 implements MigrationInterface {
    name = 'InitialSchema1637622900569'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`partners\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`first_name\` varchar(75) NOT NULL, \`last_name\` varchar(75) NOT NULL, \`dni\` varchar(8) NOT NULL, \`companyName\` varchar(8) NOT NULL, \`phone_number\` varchar(9) NOT NULL, \`email\` varchar(150) NOT NULL, UNIQUE INDEX \`UQ_partners_dni\` (\`dni\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`promotions\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`title\` varchar(100) NOT NULL, \`content\` varchar(100) NOT NULL, \`promotionStart_Date\` varchar(75) NOT NULL, \`promotionEnd_Date\` varchar(75) NOT NULL, \`partnerId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`travelers\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`first_name\` varchar(75) NOT NULL, \`last_name\` varchar(75) NOT NULL, \`dni\` varchar(8) NOT NULL, \`phone_number\` varchar(9) NOT NULL, \`email\` varchar(150) NOT NULL, UNIQUE INDEX \`UQ_partners_dni\` (\`dni\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`travel_plan\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`description\` varchar(100) NOT NULL, \`amount_people\` bigint NULL, \`promotion\` varchar(100) NULL, \`url_image\` varchar(100) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`travel_plan\``);
        await queryRunner.query(`DROP INDEX \`UQ_partners_dni\` ON \`travelers\``);
        await queryRunner.query(`DROP TABLE \`travelers\``);
        await queryRunner.query(`DROP TABLE \`promotions\``);
        await queryRunner.query(`DROP INDEX \`UQ_partners_dni\` ON \`partners\``);
        await queryRunner.query(`DROP TABLE \`partners\``);
    }

}

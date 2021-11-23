import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1637653276737 implements MigrationInterface {
    name = 'InitialSchema1637653276737'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`partners\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`first_name\` varchar(75) NOT NULL, \`last_name\` varchar(75) NOT NULL, \`dni\` varchar(8) NOT NULL, \`company_name\` varchar(70) NOT NULL, \`phone_number\` varchar(9) NOT NULL, \`email\` varchar(70) NOT NULL, UNIQUE INDEX \`UQ_partners_dni\` (\`dni\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`promotions\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`title\` varchar(100) NOT NULL, \`content\` varchar(100) NOT NULL, \`promotionStart_Date\` varchar(75) NOT NULL, \`promotionEnd_Date\` varchar(75) NOT NULL, \`partnerId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`travelers\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`first_name\` varchar(75) NOT NULL, \`last_name\` varchar(75) NOT NULL, \`dni\` varchar(8) NOT NULL, \`phone_number\` varchar(9) NOT NULL, \`email\` varchar(70) NOT NULL, UNIQUE INDEX \`UQ_partners_dni\` (\`dni\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`travel_plan\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`description\` varchar(100) NOT NULL, \`amount_people\` bigint NULL, \`promotion\` varchar(100) NULL, \`url_image\` varchar(100) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`destinations\` (\`travel_package_id\` bigint UNSIGNED NULL, \`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` varchar(20) NOT NULL, \`description\` varchar(200) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`destinations\` ADD CONSTRAINT \`FK_be6f6803eb1572ad11f248fab9d\` FOREIGN KEY (\`travel_package_id\`) REFERENCES \`travel_plan\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`destinations\` DROP FOREIGN KEY \`FK_be6f6803eb1572ad11f248fab9d\``);
        await queryRunner.query(`DROP TABLE \`destinations\``);
        await queryRunner.query(`DROP TABLE \`travel_plan\``);
        await queryRunner.query(`DROP INDEX \`UQ_partners_dni\` ON \`travelers\``);
        await queryRunner.query(`DROP TABLE \`travelers\``);
        await queryRunner.query(`DROP TABLE \`promotions\``);
        await queryRunner.query(`DROP INDEX \`UQ_partners_dni\` ON \`partners\``);
        await queryRunner.query(`DROP TABLE \`partners\``);
    }

}

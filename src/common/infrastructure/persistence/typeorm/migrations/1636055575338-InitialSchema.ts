import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1636055575338 implements MigrationInterface {
    name = 'InitialSchema1636055575338'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`promotions\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`title\` varchar(100) NOT NULL, \`content\` varchar(100) NOT NULL, \`promotionStart_Date\` varchar(75) NOT NULL, \`promotionEnd_Date\` varchar(75) NOT NULL, \`partnerId\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`promotions\``);
    }

}

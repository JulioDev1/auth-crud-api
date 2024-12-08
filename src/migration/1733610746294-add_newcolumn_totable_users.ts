import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddNewcolumnTotableUsers1733610746294
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.addColumn(
      'user',
      new TableColumn({
        name: 'typeUser',
        type: 'integer',
        isNullable: false,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.dropColumn('user', 'typeUser');
  }
}

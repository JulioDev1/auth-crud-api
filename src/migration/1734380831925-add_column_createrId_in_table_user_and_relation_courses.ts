import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class AddColumnCreaterIdInTableUserAndRelationCourses1734380831925
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'teacher',
        columns: [
          {
            name: 'id',
            type: 'bigint',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'course',
            type: 'text',
          },
          {
            name: 'userId',
            type: 'bigint',
            isUnique: true, // Garantir que cada usuário só pode ser associado a um professor
          },
        ],
      }),
      true,
    );

    // Criar chave estrangeira para User
    await queryRunner.createForeignKey(
      'teacher',
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE',
      }),
    );

    // Adicionar coluna teacherId na tabela Course
    await queryRunner.addColumn(
      'courses',
      new TableColumn({
        name: 'teacherId',
        type: 'bigint',
        isNullable: true,
      }),
    );

    // Criar chave estrangeira para Teacher na tabela Course
    await queryRunner.createForeignKey(
      'courses',
      new TableForeignKey({
        columnNames: ['teacherId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'teacher',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover chave estrangeira de Courses
    const coursesTable = await queryRunner.getTable('courses');
    const teacherForeignKey = coursesTable.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('teacherId') !== -1,
    );
    await queryRunner.dropForeignKey('courses', teacherForeignKey);

    // Remover coluna teacherId da tabela Courses
    await queryRunner.dropColumn('courses', 'teacherId');

    // Remover chave estrangeira de Teacher
    const teacherTable = await queryRunner.getTable('teacher');
    const userForeignKey = teacherTable.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('userId') !== -1,
    );
    await queryRunner.dropForeignKey('teacher', userForeignKey);

    // Remover tabela Teacher
    await queryRunner.dropTable('teacher');
  }
}

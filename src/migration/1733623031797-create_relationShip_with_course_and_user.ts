import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateRelationShipWithCourseAndUser1733623031797
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS public.courses(
        id integer NOT NULL,
        name character varying COLLATE pg_catalog."default" NOT NULL,
        CONSTRAINT courses_pkey PRIMARY KEY (id)
      )
    `);

    await queryRunner.query(`
      CREATE TABLE IF NOT EXISTS public."user_courses"
      (
          "userId" integer NOT NULL, 
          "courseId" integer NOT NULL,
          PRIMARY KEY ("userId", "courseId")
      )
    `);

    await queryRunner.query(`
      ALTER TABLE "user_courses"
      ADD CONSTRAINT "fk_user"
      FOREIGN KEY ("userId") REFERENCES "user"("id")
      ON DELETE CASCADE
    `);

    await queryRunner.query(`
      ALTER TABLE "user_courses"
      ADD CONSTRAINT "fk_courses" 
      FOREIGN KEY ("courseId") REFERENCES "courses"("id")
      ON DELETE CASCADE
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('user_courses');
    await queryRunner.dropTable('courses');
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateTableUser1733579549688 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`
        CREATE TABLE IF NOT EXISTS public."user"
        (
            id integer NOT NULL,
            name character varying COLLATE pg_catalog."default" NOT NULL,
            email character varying COLLATE pg_catalog."default" NOT NULL,
            password character varying COLLATE pg_catalog."default",
            CONSTRAINT user_pkey PRIMARY KEY (id)
        )

        TABLESPACE pg_default;

        ALTER TABLE IF EXISTS public."user"
        OWNER to postgres;
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    queryRunner.query(`drop table public.user`);
  }
}

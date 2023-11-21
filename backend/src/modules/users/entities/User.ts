import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('users')
export default class User {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('varchar', { length: '255' })
  name: string;

  @Column('varchar', { length: '255' })
  password: string;

  @Column('varchar', { length: '255' })
  email: string;

  @Column('varchar', { length: '255' })
  phone: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
import { Length } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: false })
  @Length(5, 100, {
    message: 'Description must be between 5 and 100 characters long',
  })
  description: string;

  @Column({ nullable: false })
  category: string;

  @Column({ nullable: false })
  @Length(3, 3, {
    message: 'Currency must be 3 characters long',
  })
  currency: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false })
  stock: number;

  @Column({ default: true })
  isActive: boolean;
}

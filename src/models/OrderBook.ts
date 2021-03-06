import { 
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne
 } from "typeorm";
 import { Exclude } from "class-transformer";
 import Book from "./Book";
 import Order from "./Order";

 @Entity("order_books")
 class OrderBook {
    @PrimaryGeneratedColumn("uuid")
    id: string;

    @ManyToOne(() => Book, { eager: true, onDelete: "SET NULL" })
    book: Book;

    @ManyToOne(() => Order, { onDelete: "CASCADE" })
    order: Order;

    @Exclude()
    @Column()
    bookId: string;

    @Exclude()
    @Column()
    orderId: string;

    @CreateDateColumn()
    created_at: Date;
 }

 export default OrderBook;
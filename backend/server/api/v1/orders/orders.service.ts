import { getPool } from "../../../common/database";
import * as bcrypt from 'bcrypt';

export class OrderService {

    constructor() { }

    async get(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                getPool().then((connection) => {
                    let query = 'SELECT * FROM orders';

                    connection.query(query, (err, result) => {
                        if (err) {
                            return reject(err);
                        } else {
                            const order = result.rows;
                            return resolve(order);
                        }
                    });
                }).catch((err) => {
                    return reject(err);
                })
            } catch (err) {
                return reject(err);
            }
        })
    }
    async create(payload): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                getPool().then(async (connection) => {
                    const requestPayload = [payload.user_id, payload.user_name, payload.totalPrice, payload.address, payload.street, payload.floor, payload.notes, JSON.stringify(payload.items)]
                    let query = 'INSERT INTO orders (user_id, user_name, totalPrice, address, street, floor, notes, items) VALUES ($1, $2, $3, $4, $5, $6, $7, $8::JSONB)';
                    connection.query(query, requestPayload, (err, result) => {
                        if (err) {
                            return reject(err);
                        } else {
                            return resolve(payload);
                        }
                    });
                }).catch((err) => {
                    return reject(err);
                })
            } catch (err) {
                return reject(err);
            }
        })
    }
    async getById(id): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                getPool().then((connection) => {
                    let query = `SELECT * FROM orders WHERE id = $1`;

                    connection.query(query, [id], (err, result) => {
                        if (err) {
                            return reject(err);
                        } else {
                            const order = result.rows[0];
                            return resolve(order);
                        }
                    });
                }).catch((err) => {
                    return reject(err);
                })
            } catch (err) {
                return reject(err);
            }
        })
    }
    async update(id, payload): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                getPool().then((connection) => {
                    let requestPayload = [payload.name, payload.description, payload.price, payload.image, id]
                    let query = 'UPDATE orders SET name = $1, description = $2, price = $3, image = $4 WHERE id = $5';

                    connection.query(query, requestPayload, (err, result) => {
                        if (err) {
                            return reject(err);
                        } else {
                            const order = result.rows;
                            return resolve(order);
                        }
                    });
                }).catch((err) => {
                    return reject(err);
                })
            } catch (err) {
                return reject(err);
            }
        })
    }
    async delete(id): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                getPool().then((connection) => {
                    let query = 'DELETE FROM orders WHERE id = $1';

                    connection.query(query, [id], (err, result) => {
                        if (err) {
                            return reject(err);
                        } else {
                            const order = result.rows;
                            return resolve(order);
                        }
                    });
                }).catch((err) => {
                    return reject(err);
                })
            } catch (err) {
                return reject(err);
            }
        })
    }
}

export default new OrderService();
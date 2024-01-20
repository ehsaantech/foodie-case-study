import { getPool } from "../../../common/database";
import * as bcrypt from 'bcrypt';

export class DishesService {

    constructor() { }

    async get(): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                getPool().then((connection) => {
                    let query = 'SELECT dd.id, dd.name, dd.description, dd.price, dd.image, dd.chef_id, dd.createddate, uu.username as chef_name FROM dishes as dd INNER JOIN users as uu ON dd.chef_id = uu.id';

                    connection.query(query, (err, result) => {
                        if (err) {
                            return reject(err);
                        } else {
                            const dishes = result.rows;
                            return resolve(dishes);
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
                    const requestPayload = [payload.name, payload.description, payload.price, payload.image, payload.chef_id]
                    let query = 'INSERT INTO dishes (name, description, price, image, chef_id) VALUES ($1, $2, $3, $4, $5)';
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
                    let query = `SELECT * FROM dishes WHERE id = $1`;

                    connection.query(query, [id], (err, result) => {
                        if (err) {
                            return reject(err);
                        } else {
                            const dishes = result.rows[0];
                            return resolve(dishes);
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
    async getByChefID(id): Promise<any> {
        return new Promise(async (resolve, reject) => {
            try {
                getPool().then((connection) => {
                    let query = `SELECT * FROM dishes WHERE chef_id = $1`;

                    connection.query(query, [id], (err, result) => {
                        if (err) {
                            return reject(err);
                        } else {
                            const dishes = result.rows;
                            return resolve(dishes);
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
                    let query = 'UPDATE dishes SET name = $1, description = $2, price = $3, image = $4 WHERE id = $5';

                    connection.query(query, requestPayload, (err, result) => {
                        if (err) {
                            return reject(err);
                        } else {
                            const dishes = result.rows;
                            return resolve(dishes);
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
                    let query = 'DELETE FROM dishes WHERE id = $1';

                    connection.query(query, [id], (err, result) => {
                        if (err) {
                            return reject(err);
                        } else {
                            const dishes = result.rows;
                            return resolve(dishes);
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

export default new DishesService();
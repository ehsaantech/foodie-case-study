import { getPool } from "../../../common/database";
import jwt from "jsonwebtoken";

export class AuthService {

    constructor() { }

    async login(credentials): Promise<any> {
        return new Promise(async (resolve, reject) => {
            const { email, password } = credentials;
            try {
                getPool().then((connection) => {
                    let query = 'SELECT * FROM users where email = $1';

                    connection.query(query, [email], (err, result) => {
                        if (err) {
                            return reject({ message: 'Email or Password invalid!', code: 400 });
                        } else {
                            const user = result[1].rows;


                            const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
                                expiresIn: 604800, // 1 week hours
                                algorithm: 'HS256'
                            });

                            return resolve({
                                user,
                                token
                            })
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

export default new AuthService();
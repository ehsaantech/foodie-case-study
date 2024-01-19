import l from '../common/logger';

class Seeds {

    private connection = null;

    constructor(connection) {
        this.connection = connection;
    }

    public async userSeeding() {
        return new Promise((resolve, reject) => {
            try {
                if (this.connection) {
                    let query = 'CREATE TABLE IF NOT EXISTS users (id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, username VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, role VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL, createdDate DATE DEFAULT CURRENT_DATE)';

                    this.connection.query(query, (err, result) => {
                        resolve({})
                    });
                } else {
                    l.error('No Connection Found');
                    return reject({ message: 'No Connection Found' });
                }
            } catch (err) {
                return reject(err);
            }
        })
    }

    public async dishesSeeding() {
        return new Promise((resolve, reject) => {
            try {
                if (this.connection) {
                    let query = 'CREATE TABLE IF NOT EXISTS dishes (id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), name VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, price INT NOT NULL, image VARCHAR(255) NOT NULL, chef_id uuid NOT NULL, createdDate DATE DEFAULT CURRENT_DATE)';

                    this.connection.query(query, (err, result) => {
                        resolve({})
                    });
                } else {
                    l.error('No Connection Found');
                    return reject({ message: 'No Connection Found' });
                }
            } catch (err) {
                return reject(err);
            }
        })
    }



}


export default Seeds;
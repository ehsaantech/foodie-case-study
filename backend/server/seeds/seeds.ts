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
                    let query = 'CREATE TABLE IF NOT EXISTS users (id uuid PRIMARY KEY DEFAULT uuid_generate_v4(), firstname VARCHAR(255) NOT NULL, lastname VARCHAR(255) NOT NULL, username VARCHAR(255) NOT NULL, email VARCHAR(255) NOT NULL, role VARCHAR(255) NOT NULL, password VARCHAR(255) NOT NULL)';

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

export class HelperService {

    tranformMeData(user) {
        return {
            id: user['_id'],
            firstName: user['firstName'],
            lastName: user['lastName'],
            email: user['email'],
            username: user?.username
        };
    }

}

export default new HelperService();
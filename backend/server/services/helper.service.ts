
export class HelperService {

    tranformMeData(user) {
        return {
            id: user?.id,
            firstName: user?.firstname,
            lastName: user?.lastname,
            username: user?.username,
            email: user?.email,
            role: user?.role
        };
    }

}

export default new HelperService();
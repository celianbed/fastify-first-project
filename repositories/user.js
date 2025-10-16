const users = [

    {
        id:1,
        email:'celian@code.fr',
        password:'123456'
    },
];

export const UserRepository = {

    getUserByCredentials: async function(email,password){

        let user;
        return user.find(user => user.email === email && user.password === password);

    },

    createUser: async function (email, password) {
        const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

        const newUser = {
            id: newId,
            email: email,
            password: password
        };

        users.push(newUser);

        return newUser;
    }
}
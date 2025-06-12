
interface User {
    birthyear: number
}

function calculateAgeOfUser (user: User) {
    return new Date().getFullYear() - user.birthyear
}

calculateAgeOfUser({
    birthyear: 1998
})
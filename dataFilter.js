function sortLeaderboardData(data) {
    const max_rank = 7;

    users_array = data.slice(1).map((row, index) => {
        return {
            firstName: row[0],
            lastName: row[1],
            points: parseInt(row[2]),
        };
    });

    console.log(users_array);

    // SORT USERS BASED ON THIER POINTS
    sorted_array = users_array.sort((userA, userB) => {
        if (userA.points > userB.points) {
            return -1;
        } else if (userB.points > userA.points) {
            return 1;
        } else {
            if (userA.firstName < userB.firstName) {
                return -1;
            } else {
                return 1;
            }
        }
    });

    // ADD RANKING TO USER OBJECTS
    current_rank = 1;
    sorted_array.map((user, index) => {
        user.rank = current_rank;
        next_user =
            index + 1 == sorted_array.length ? null : sorted_array[index + 1];

        if (next_user) {
            if (next_user.points !== user.points) {
                current_rank += 1;
            }
        }
    });

    // ONLY GET THE TOP USERS
    top_users = sorted_array.filter((user) => {
        return user.rank <= max_rank;
    });

    return top_users;
}

function sortHonourRollData(data) {}

module.exports = {
    sortLeaderboardData,
    sortHonourRollData,
};

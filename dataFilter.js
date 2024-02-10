function sortLeaderboardData(data) {
    const max_rank = 7;

    users_array = data
        .slice(1)
        .map((row, index) => {
            return {
                firstName: row[0],
                lastName: row[1],
                points: parseInt(row[2]),
            };
        })
        .filter((user) => user.firstName != "");

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

function sortHonourRollData(data) {
    // Sample Data
    // [
    //     ["Year", "Name", "Class", "Title"],
    //     ["2023", "Mikayla Rochadi", "10L", "Term 4 Leaderboard Winner"],
    //     ["2023", "Kevin Francis", "10L", "Tech Club Logo Designer"],
    // ];

    const yearsObject = data.slice(1).reduce((years, object) => {
        const personObject = {
            name: object[1],
            class: object[2],
            title: object[3],
        };

        if (object[0] in years) {
            years[object[0]].push(personObject);
        } else {
            years[object[0]] = [personObject];
        }

        return years;
    }, {});

    const yearsList = Object.keys(yearsObject)
        .reduce((total, year) => {
            total.push({ year: parseInt(year), people: yearsObject[year] });
            return total;
        }, [])
        .sort((a, b) => (a > b ? 1 : -1));

    return yearsList;
}

module.exports = {
    sortLeaderboardData,
    sortHonourRollData,
};

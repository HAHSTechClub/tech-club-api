# An API that provides endpoints for retriving data for the Tech Club Leaderboard and Honour Roll.

The api is written with node.js and is hosted on render.com at https://tech-club-api.onrender.com/.
Uses Express.js and Google's API.


## Leaderboard data 
- Endpoint 👉 https://tech-club-api.onrender.com/leaderboard-users.
- Sample Response:
  ```json
  [
    {
      "firstName": "Mikayla",
      "lastName": "Rochadi",
      "points": 44,
      "rank": 1
    },
    {
      "firstName": "Ryan",
      "lastName": "Usui",
      "points": 35,
      "rank": 2
    },
    {
      "firstName": "Aydin",
      "lastName": "Hossen",
      "points": 30,
      "rank": 3
    },
  ]
  ```
  
- The API retrives attendence data from the Tech Club Google Drive. The spreadsheet in the 'Attendence Lists' folder with the phrase '[current]' in it's filename will be selected.

  ![image](https://github.com/HAHSTechClub/tech-club-api/assets/157587094/ee64b98a-82f1-40ae-bc63-db214485c320)
- Use case:
  
  ![image](https://github.com/HAHSTechClub/tech-club-api/assets/99528866/96ef5399-7230-415f-b8b3-e65d4b809916)

  Tech Club Leaderboard (https://github.com/UtsavK-0112/Hurlstone-Tech-Club-Leaderboard)

## Honour Roll Data 
- Endpoint 👉 https://tech-club-api.onrender.com/honour-roll-data.
- Sample response:
  ```json
  {
    "2023": [
      {
        "name": "Mikayla Rochadi",
        "class": "10L",
        "title": "Term 4 Leaderboard Winner"
      },
      {
        "name": "Kevin Francis",
        "class": "10L",
        "title": "Tech Club Logo Designer"
      }
    ]
  }
  ```
- Retrives data from spreadsheet in data with filename containing the phrase '[honour roll]'

  ![image](https://github.com/HAHSTechClub/tech-club-api/assets/99528866/91b4bf0e-7897-42e0-aff8-a99514374351)

- Honour roll front end coming soon.




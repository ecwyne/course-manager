Develop simple Node.js application which manages Course records
- [X] The application should manage the following information about a Course: id, subject, courseNumber, description. All fields other than id are strings
- [] courseNumber must be formatted as a three-digit, zero-padded integer like "033". Adding records which are not three-digit numbers results in an validation message to the user
- [] The application should allow user to search for a course by description, with partial matches like "Bio" would find "Introduction to Biology"
- [X] The application should support deleting a Course
- [X] The application should support inserting a new Course
- [X] The application should prevent inserting duplicate courses, where subject and number must be unique
- [X] The application must be started by just running `npm start` or otherwise described in a README.md
- [] The application must be uploaded to Github and accessible to Github user `bradledford`
- [] The application will only be tested in Google Chrome



Example Course records:
1, "BIO", 101, "Introduction to Biology"
2, "MAT", 045, "Business Statistics"


Suggestions:
- [X] Use an API to manage data and connect to the API from a front-end, Javascript application
- [] Show that tests have been used to validate behavior
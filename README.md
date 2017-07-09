# Course Manager

## Install and Run
```bash
git clone https://github.com/ecwyne/course-manager.git
cd course-manager
npm install
npm start
```

## Test
```bash
npm run lint && npm test
```

# Considerations
### View Layer
I chose to use [next.js](https://github.com/zeit/next.js) because it provides "automatic code splitting, routing, hot code reloading, and universal (server-side and client-side) rendering." These all make for faster iterations during development and dramatically faster time-to-interactive in production.

### API Layer
I chose [Apollo Graphql](http://dev.apollodata.com/) [client](http://dev.apollodata.com/react/) and [server](http://dev.apollodata.com/tools/) because it integrates beautifully with React applications, allowing components to define their data requirements exactly to avoid underfetching and overfetching. Apollo provides an intelligent client that facilitates query batching, optimistic ui, subscriptions, and caching.

ApolloClient uses Redux under the hood to manage application state and I used [recompose](https://github.com/acdlite/recompose) to manage component state. Recompose makes it easy to write nearly all application code using [functional stateless components](https://facebook.github.io/react/docs/components-and-props.html#functional-and-class-components) which are faster, __more testable__, and easier to reason about.

### Database Layer
For this assignment I wanted a database that would not require `@bradledford` to install any dependencies outside of what npm could offer. I also needed a querying language to search course descriptions (so a key-value store like Redis wasn't a viable option.)

I considered [nedb](https://github.com/louischatriot/nedb) (a mongo-like solution) and [sqlite3](https://github.com/mapbox/node-sqlite3) (a SQL-like solution.) Both of them would have met my requirements technically. I ultimately chose to use sqlite3 because it sounds like most of Civitas' applications are running on SQL solutions today.

If this application were to go to production at a large scale I would likely choose to store the course details in [Redis](https://redis.io/) and do all full-text searching in [Elasticsearch](https://www.elastic.co/products/elasticsearch). Redis is designed for fast retrieval of values by key and Elasticsearch is designed for searching through text.

### Testing
I chose [Jest](https://facebook.github.io/jest/) as the testing framework for this application. Other frameworks may have worked just as well in this particular case but I chose Jest for its ease of testing React components. I also used [Enzyme](http://airbnb.io/enzyme/) from Airbnb for manipulating components during testing.

# Assignment Parameters
Develop simple Node.js application which manages Course records
- [x] The application should manage the following information about a Course: id, subject, courseNumber, description. [All fields other than id are strings](https://github.com/ecwyne/course-manager/blob/master/api/graphql/schema.js#L5-L10)
- [x] courseNumber must be formatted as a three-digit, zero-padded integer like "033". Adding records which are not three-digit numbers results in an [validation message](https://github.com/ecwyne/course-manager/blob/master/components/CoursesManager/components/CoursesManagerCreator.js#L31) to the user [(test)](https://github.com/ecwyne/course-manager/blob/master/api/__tests__/schema.test.js#L70-L72) [(test)](https://github.com/ecwyne/course-manager/blob/master/components/CoursesManager/components/CoursesManagerCreator.test.js#L15-L31)
- [x] The application should allow user to [search for a course by description](https://github.com/ecwyne/course-manager/blob/master/api/data/coursesDb.js#L43-L46), with partial matches like "Bio" would find "Introduction to Biology" [(test)](https://github.com/ecwyne/course-manager/blob/master/api/__tests__/schema.test.js#L62-L64)
- [x] The application should support [deleting a Course](https://github.com/ecwyne/course-manager/blob/master/api/data/coursesDb.js#L33-L36) [(test)](https://github.com/ecwyne/course-manager/blob/master/api/__tests__/schema.test.js#L74-L80) [(test)](https://github.com/ecwyne/course-manager/blob/master/components/CoursesManager/components/CoursesManagerResults.test.js#L22-L24)
- [x] The application should support [inserting](https://github.com/ecwyne/course-manager/blob/master/api/data/coursesDb.js#L27-L31) a new Course [(test)](https://github.com/ecwyne/course-manager/blob/master/api/__tests__/schema.test.js#L54-L56)
- [x] The application should [prevent inserting duplicate courses](https://github.com/ecwyne/course-manager/blob/master/api/graphql/resolvers.js#L13), where subject and number must be unique [(test)](https://github.com/ecwyne/course-manager/blob/master/api/__tests__/schema.test.js#L66-L68)
- [x] The application must be started by just running [`npm start`](https://github.com/ecwyne/course-manager/blob/master/package.json#L8) or otherwise described in a README.md
- [x] The application must be uploaded to Github and accessible to Github user `bradledford`
- [x] The application will only be tested in Google Chrome



Example Course records:
1, "BIO", 101, "Introduction to Biology"
2, "MAT", 045, "Business Statistics"


Suggestions:
- [x] Use an API to manage data and connect to the API from a front-end, Javascript application
- [x] Show that tests have been used to validate behavior

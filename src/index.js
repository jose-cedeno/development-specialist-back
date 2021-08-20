const app = require('./app');
require('./db/db');
const PORT = 3001;



app.listen(PORT, () => {
    console.log(`Listening on ${PORT}`);
});

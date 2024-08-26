const app = require('./app');
const port = process.env.PORT || 3000;  // Use PORT from environment variables or default to 3000

app.listen(port, () => {
    console.log(`The application is listening on port ${port}`);
});

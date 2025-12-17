import app from "./app";
import { config } from "./config/config";

const port = config.api.port;

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log(`Checking database connection...`);
});

import { app } from './app.js';

const PORT = Number(process.env.PORT) || 3000; // convert string to number
const HOST = process.env.HOST || 'localhost';

app.listen(PORT, HOST, () => {
  console.log(`Server started on http://${HOST}:${PORT}`);
});

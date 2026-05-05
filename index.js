const env = require('./src/config/env');
const app = require('./src/app');

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});